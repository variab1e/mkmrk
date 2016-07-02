import fetch 		= require('isomorphic-fetch');
import fs 			= require('fs');
import sql 			= require('sql.js');
import path 		= require('path');
import { Day , DayArray , DayRecord } from './day';
import { Year } from './year';

export class Security {

	private db;
	private dbpath: string;
	private history: DayArray = new DayArray();
	private dayRange: Day[] = new Array();
	private expectedDays: DayArray = new DayArray();
	
	constructor(
		private symbol: string,
		/**
		 * path for the database
		 * `./` and `process.cwd()` both reference the directory that node was called from
		 * `__dirname` references the directory that the file resides in
		 * http://www.hacksparrow.com/understanding-directory-references-in-node-js.html
		 */
		private dbname: string = "data/f.db" 
	) {
		console.log("Security constructor for " + symbol);
		this.dbpath = path.join(__dirname, ".." , this.dbname);
		this.db = new sql.Database(fs.readFileSync(this.dbpath));
		// date stored as ISO 8601
		this.writeSql("CREATE TABLE IF NOT EXISTS " + this.symbol + " ("+
			" `date`	TEXT NOT NULL UNIQUE, " +
			" `open`	REAL NOT NULL, " + 
			" `high`	REAL NOT NULL, " + 
			" `low`	REAL NOT NULL, " + 
			" `close`	REAL NOT NULL, " + 
			" `volume`	NUMERIC, " + 
			" `adj_close`	REAL, " +
			" PRIMARY KEY(date) " +
			"); ");
		console.log("table created");
	}
	
	writeSql(sqlstr: string) {
		console.log("writeSql:"+sqlstr)
		this.db.run(sqlstr);
		fs.writeFileSync(this.dbpath, new Buffer(this.db.export()));
	}
	
	getSymbol(): string {
		return this.symbol;
	}
	
	historyFromSql(dayStart: Day,dayEnd: Day):DayArray {
		try {
			let dayRecords: DayArray = new DayArray();
			this.db.each('SELECT * FROM '+this.symbol+' WHERE '+
					'date>="'+dayStart.getString() +'" AND date<="'+dayEnd.getString()+'" ORDER BY date',
										function(r){
											console.log(r);
											dayRecords.push(new DayRecord(
												r.date,
												r.open,
												r.high,
												r.low,
												r.close,
												r.volume,
												r.adj_close
											))
										}
								);
			return dayRecords;
		} catch (e) {
			console.log("ERROR:" + e);
		}
		console.log("historyFromSql ERROR - null being returned.")
		return null;
	}
	
	historySaveSql(){
		try {
			for (var i = 0; i < this.history.length; i++) {
				let d = <DayRecord>this.history[i];
				this.writeSql("REPLACE INTO " + this.symbol + " (" +
					" date , " +
					" open , " +
					" high , " +
					" low , " +
					" close , " +
					" volume , " +
					" adj_close " +
					") VALUES (" +
					"   '" + d.date + "'" +
					" , '" + d.open + "'" +
					" , '" + d.high + "'" +
					" , '" + d.low + "'" +
					" , '" + d.close + "'" +
					" , '" + d.volume + "'" +
  					" , '" + d.adj_close + "'" +
					"); ");
			}
		} catch (e) {
			console.log("ERROR:" + e);
		}
	}
	
	createHistoryDayRange(dayStart: Day, dayEnd: Day){
		let holidays: DayArray = new DayArray();
		for(
			let d = dayStart.day, m=dayStart.month, y=dayStart.year, day=new Day(y,m,d) , holidays = new Year(y).getHoliDays(); 
			
			day.getTime() < dayEnd.getTime(); 
			
			(d<new Year(y).getDaysInMonth(m)? d+=1 : 
				( m==12 ? ( d=1 , m=1 , y++ , holidays=new Year(y).getHoliDays() ) : ( d=1 , m++ ) ) 
			)
		){
			console.log(`currently testing day ${y}-${m}-${d}`);
			// day is the day currently being tested
			day = new Day(y,m,d);
			if (day.isWeekend()) {
				/** it is a weekend */
				console.log(`${y}-${m}-${d} is a weekend - not being added to expectedDays`);
				// dayRange is the an array of all days tested, add it here
				this.dayRange.push(day);
				continue;
			} else if (holidays.includes(day)){
				/** it is a holiday */
				console.log(`${y}-${m}-${d} is a holiday - not being added to expectedDays`);
				this.dayRange.push(day);
				continue;
			} else {
				/** these are the weekday, non-holidays, they should have trading activity */
				this.dayRange.push(day);
				// add it to the array of days we expect to find data for, as it is neither a weekend nor a holiday.
				this.expectedDays.push(day);
			}
			console.log(`end of loop for day ${y}-${m}-${d}`);
		}
	}
	
	checkHistoryRange(dayRecord: DayArray): boolean {
		/** check if the number of dayRecords is the same length as the number of expectedDays else return false */
		if(dayRecord.length == this.expectedDays.length){
			
			for ( let i = 0 ; i < dayRecord.length ; i++ ){
				/** return false if expectedDays ever does NOT include the dayRecocord */
				if ( ! this.expectedDays.includes(dayRecord[i]) ) { return false } else {
					console.log(dayRecord[i].getString() + " is expected");
				};
			}
			console.log("HistoryRange has been checked and matches for SQL")
			return true;
		} else {
			console.log(`dayRecord.length of ${dayRecord.length} != this.expectedDays.length of ${this.expectedDays.length}`);
		}
		return false
	}
	
	async getHistory(dayStartString: string, dayEndString: string, filename ? : string) {

		let dayStart = new Day(dayStartString);
		let dayEnd = new Day(dayEndString);

		this.createHistoryDayRange(dayStart,dayEnd);
		console.log("getHistory(" + this.symbol + ")");
		let json;
		if ( filename ) {
			console.log("Filename "+filename+" set, loading from file " + filename)
			/** NOTE TO SELF: DIRECTORY SHOULD BE:: `../data/` */
			//let json = JSON.parse(fs.readFileSync(path.join(__dirname, this.symbol+".json")).toString());
			let json = JSON.parse(fs.readFileSync(filename).toString());
			let dayRecords = this.historyParseJson(json) ;
			if ( this.checkHistoryRange(dayRecords) ){
				this.history = dayRecords;
				this.historySaveSql();
				console.log("History loaded from file" + filename);
				return;
			}
		} else {
			/** try to load from SQL database */
			try {
				console.log("try to load data from SQL")
				let dayRecords = this.historyFromSql(dayStart,dayEnd);
				if ( this.checkHistoryRange(dayRecords) ){
					this.history = dayRecords;
					console.log("history loaded from SQL");
					/** successfully loaded from SQL - stop processing further sources */
					return;
				}
			} catch (e) {
				console.log("ERROR:" + e);
			}
			/** all internal sources have failed, do a fresh external lookup */
			let json = await this.query(
				'Select * from yahoo.finance.historicaldata where ' +
				'startDate="' + dayStart.getString() + '" ' +
				'AND endDate="' + dayEnd.getString() + '"' +
				'AND symbol="' + this.getSymbol() + '"');
			let dayRecords = this.historyParseJson(json) ;
			if ( this.checkHistoryRange(dayRecords) ){
				this.history = dayRecords;
				this.historySaveSql();
				console.log("History loaded from file" + filename);
				return;
			}
		}
	}
	historyParseJson(json: any): DayArray {
		
		console.log("query results=" + json.query.results.quote.length);
		let dayRecords: DayArray;
		for (var i = 0; i < json.query.results.quote.length; i++) {
			let d = json.query.results.quote[i];
			dayRecords.push(new DayRecord(
				d.date,
				d.open,
				d.high,
				d.low,
				d.close,
				d.volume,
				d.adj_close
			))			
		}
		return dayRecords;
		
	}
	
	async query(query) {
		try {
			let response = await fetch(
				"http://query.yahooapis.com/v1/public/yql" +
				"?" +
				encodeURI(
					"format=json" + "&" +
					"env=http://datatables.org/alltables.env" + "&" + 'q=' +
					query
				)
			)
			let json = await response.json();
			console.log("query(" + query + ") " + response.status + " " + response.statusText + " --to--> " + response.url);
			return json;
		} catch (err) {
			console.log(err.message);
		}
	}





}