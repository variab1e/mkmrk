import fetch 	= require('isomorphic-fetch');
import fs 		= require('fs');
import sql 		= require('sql.js');
import path 	= require('path')

export class Security {

	private db;
	
	constructor(
		private symbol: string,
		private dbname: string = "f.db" 
	) {
		console.log("Security constructor for " + symbol);
		this.db = new sql.Database(fs.readFileSync(path.join(__dirname, this.dbname)));
		// date stored as ISO 8601
		this.writeSql("CREATE TABLE IF NOT EXISTS " + this.symbol + " ("+
			" date TEXT , " +
			" open REAL , " + 
			" high REAL , " + 
			" low REAL , " + 
			" close REAL , " + 
			" volume NUMERIC , " + 
			" adj_close REAL " +
			"); ");
		console.log("table created");
	}

	writeSql(sqlstr: string) {
		alert("writeSql:"+sqlstr)
		this.db.run(sqlstr);
		fs.writeFileSync(this.dbname, new Buffer(this.db.export()));
	}

	getSymbol(): string {
		return this.symbol;
	}


	async getHistory(date_start: String, date_end: String) {
		console.log("getHistory(" + this.symbol + ")");

/// CATCH ERROR HERE TRY {} CATCH {}

		let json = await this.query(
			'Select * from yahoo.finance.historicaldata where ' +
			'startDate="' + date_start + '" ' +
			'AND endDate="' + date_end + '"' +
			'AND symbol="' + this.getSymbol() + '"');
		try {
			alert("query results=" + json.query.results.quote.length)
			for (var i = 0; i < json.query.results.quote.length; i++) {
				alert("in for loop");
				let d = json.query.results.quote[i];
				alert(JSON.stringify(d));
				this.writeSql("INSERT INTO " + this.symbol + " (" +
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
			alert("ERROR:" + e);
		}
		/**
		return this.query(
			'Select * from yahoo.finance.historicaldata where ' +
					'startDate="' + date_start + '" ' +
					'AND endDate="' + date_end + '"' +
					'AND symbol="' + this.getSymbol() + '"'
		).then(function (json) {
			try {
				alert("query results=" + json.query.results.quote.length)
				for (var i = 0; i < json.query.results.quote.length; i++) {
					alert("in for loop");
					let d = json.query.results.quote[i];
					alert(JSON.stringify(d));
					this.writeSql("INSERT INTO " + this.symbol + " (" +
						" date , " +
						" open , " +
						" high , " +
						" low , " +
						" close , " +
						" volume , " +
						" adj_close " +
						") VALUES (" +
						"'" + d.Date + '"' +
						"'" + d.Open + '"' +
						"'" + d.High + '"' +
						"'" + d.Low + '"' +
						"'" + d.Close + '"' +
						"'" + d.Volume + '"' +
						"'" + d.Adj_Close + '"' +
						"); ");
				}
			} catch (e) {
				alert("ERROR:" + e);
			}
**/
			// return the json -- but I should return the date range requested
			// tsdoc?
			// tab is messed up -- indenting I mean
			// take date range as input, then check to see if date is already saved
		//return json.query.results.quote;
		//})
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