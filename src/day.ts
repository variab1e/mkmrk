//import { DayRecord } from './dayRecord.ts';
import { elog } from './elog'

enum Holiday {
	"New Years" = 0,
	"Martin Luther King" = 1,
	"Washington's Birthday" = 2,
	"Good Friday" = 3,
	"Memorial Day" = 4,
	"Independance Day" = 5,
	"Labor Day" = 6,
	"Thanksgiving" = 7,
	"Christmas" = 8
}

export class DayArray extends Array<Day | DayRecord> {

	/** 
	 * This should override the native includes so that boolean true is returned if 
	 * the Day input for compare item is in this array
	 * @param {Day | DayRecord} compareItem is the Day object to check if is present within the array
	 * @return {boolean} true if within the array, false if not
	 */
	includes(compareItem: Day | DayRecord): boolean {
		for (let i = 0; i < this.length; i++) {
			/** bit of logging here */
			elog("comparing["+compareItem.year+"-"+compareItem.month+"-"+compareItem.day+
				"|to|"+
				this[i].year+"|to|"+this[i].month+"-"+this[i].day+"]");
			if (compareItem.day == this[i].day &&
				compareItem.month == this[i].month &&
				compareItem.year == this[i].year
			) {
				return true;
			}
		}
		return false;
	}

	getSeries(){
		let series: {
			x: Date,
			y: number,
			x2: Date,
			y2: number
		}[] = new Array();

/**
		this.forEach(element => {
			if(element instanceof DayRecord){
				series.push({
					x: element.toDate(),
					y: element.open
				})
			}
		});
		**/
		this.forEach(element => {
			if(element instanceof DayRecord){
				series.push({
					x: element.toDate(),
					y: element.open,
					x2: element.toDate(),
					y2: element.close
				})
			}
		});

		return series;
	}


}

/**
 * Purpose of this is to standardise on ISO-8601 format
 * {@link http://xkcd.com/1179/ xkcd knows it}
 */
export class Day {
	year: number;
	month: number;
	day: number;

	holiday: Holiday;

	constructor(year: number, month?: number, day?: number);
	constructor(date: Date);
	constructor(date: string);
	constructor(a: number | string | Date, b?: number, c?: number) {
		if (typeof a === "string") {
			let date = a;
			var [year, month, day] = date.split("-");
			this.year = parseInt(year);
			this.month = parseInt(month);
			this.day = parseInt(day);
			elog(`day constructed from dateString => ${this.year}-${this.month}-${this.day}`);
		} else if (typeof a == "object" && a instanceof Date) {
			this.year = a.getFullYear();
			this.month = a.getMonth()+1;
			this.day = a.getDate();
			elog(`day constructed from date => ${this.year}-${this.month}-${this.day}`);
		} else if (typeof a === 'number') {
			// number[]
			this.year = a;
			this.month = b;
			this.day = c;
			elog(`day constructed from year , month , day => ${this.year}-${this.month}-${this.day}`);
		} else {
			elog("no value found to construct day->",a,b,c);
		}
	}

	/**
	 * @return {string} returns the numberic month as a string left-0 padded to two characters
	 */
	padMonth(): string {
		return ("00" + this.month).substr(-2, 2);
	}
	/**
	 * @return {string} returns the numeric day of the month as a string left-0 padded to two characters
	 */
	padDay(): string {
		return ("00" + this.day).substr(-2, 2);
	}
	/**
	 * @return {boolean} return true if this is a weekend day, else false
	 */
	isWeekend(): boolean {
		if ([0, 6].indexOf(this.toDate().getDay()) >= 0) {
			return true;
		}
		return false;
	}
	/** 
	 * @return {string} returns this in string format `YYYY-MM-DD`
	 * */
	toString(): string {
		return this.year + "-" + this.padMonth() + "-" + this.padDay();
	}
	get dateString(): string { return this.toString() };
	
	/** 
	 * @return {Date} returns a native javascript Date object set to this
	 * */
	toDate(): Date {
    	/** NOTE: javascript native Date type month parameter is zero based */
		return new Date(this.year, this.month-1, this.day);
	}
	/** 
	 * @return {number} returns the unixtimestamp (in seconds)
	 * */
	getTime(): number {
		return this.toDate().getTime() / 1000;
	}
}

export class DayRecord extends Day {
	/**
	date: string;
	public open: number;
	high: number;
	low: number;
	close: number;
	volume: number;
	adj_close: number;
	**/
	
	constructor(
		date: string,
		public open: number,
		public high: number,
		public low: number,
		public close: number,
		public volume: number,
		public adj_close: number
	){
		super(date);
	}

	get date(): Date {
		return this.toDate();
	}

}