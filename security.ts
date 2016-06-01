import fetch 	= require('isomorphic-fetch');
import fs 		= require('fs');
import sql 		= require('sql.js');
import path 	= require('path')

interface dayRecord {
	date: string;
	open: number;
	high: number;
	low: number;
	close: number;
	volume: number;
	adj_close: number;
}

export class Security {

	private db;
	private history: dayRecord[];
	
	constructor(
		private symbol: string,
		private dbname: string = "f.db" 
	) {
		console.log("Security constructor for " + symbol);
		this.db = new sql.Database(fs.readFileSync(path.join(__dirname, this.dbname)));
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
		fs.writeFileSync(this.dbname, new Buffer(this.db.export()));
	}

	getSymbol(): string {
		return this.symbol;
	}
	
	saveHistory(){
		
	}
	
	async loadHistory(date_start: string, date_end: string, filename ? : string) {
		console.log("getHistory(" + this.symbol + ")");
		let json;
		if ( filename ) {
			console.log("Filename "+filename+" set, loading from file " + filename)
			//let json = JSON.parse(fs.readFileSync(path.join(__dirname, this.symbol+".json")).toString());
			let json = JSON.parse(fs.readFileSync(filename).toString());
			console.log(fs.readFileSync(path.join(__dirname, this.symbol+".json")).toString())


			console.log(json);
		} else if(sql_query()){
			// Prepare an sql statement
			var stmt = this.db.prepare("SELECT * FROM "+this.symbol+" WHERE a=:aval AND b=:bval");
			
			// Bind values to the parameters and fetch the results of the query
			var result = stmt.getAsObject({':aval' : 1, ':bval' : 'world'});
		} else {
			let json = await this.query(
				'Select * from yahoo.finance.historicaldata where ' +
				'startDate="' + date_start + '" ' +
				'AND endDate="' + date_end + '"' +
				'AND symbol="' + this.getSymbol() + '"');
		}
		try {
			console.log("query results=" + json.query.results.quote.length)
			for (var i = 0; i < json.query.results.quote.length; i++) {
				console.log("in for loop");
				let d = json.query.results.quote[i];
				console.log(JSON.stringify(d));
				this.writeSql("REPLACE INTO " + this.symbol + " (" +
					" date , " +
					" open , " +
					" high , " +
					" low , " +
					" close , " +
					" volume , " +
					" adj_close " +
					") VALUES (" +
					"   '" + d.Date + "'" +
					" , '" + d.Open + "'" +
					" , '" + d.High + "'" +
					" , '" + d.Low + "'" +
					" , '" + d.Close + "'" +
					" , '" + d.Volume + "'" +
					" , '" + d.Adj_Close + "'" +
					"); ");
			}
		} catch (e) {
			console.log("ERROR:" + e);
		}
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