

class Security {

	constructor(
		private symbol: string
	) {
		
	}

	getSymbol(): string {
		return this.symbol;
	}


	getHistory() {
		
		console.log("Start Security.getHistory");
		return fetch(
			"http://query.yahooapis.com/v1/public/yql" +
			encodeURI(
				"format=json" + "&" +
				"env=http://datatables.org/alltables.env" + "&" +
				'q=Select * from yahoo.finance.historicaldata where startDate="2016-01-14" AND endDate="2016-01-15" AND symbol="YHOO"' 
			)
			)
			.then(function(json){
				var arr: number[] = [];
				for(var i in json){
					arr.push(json[i].id);
				}
				return arr;
			})
			.catch(function(err){
				console.log("uhh oh, fetch err in SrvCom.callServer() fetch()-->");
				console.log(err);
			});
	}


	
}