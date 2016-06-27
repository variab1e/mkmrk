//import { DayRecord } from './dayRecord.ts';

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
	 * @param {Day} compareItem is the Day object to check if is present within the array
	 * @return {boolean} true if within the array, false if not
	 */
	includes(compareItem: Day | DayRecord): boolean {
		for (let i = 0; i < this.length; i++) {
			if (compareItem.day == this.values[i].day &&
				compareItem.month == this.values[i].month &&
				compareItem.year == this.values[i].year
			) {
				return true;
			}
		}
		return false;
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
			console.log("day constructed from dateString");
		} else if (typeof a == "object" && a instanceof Date) {
			this.year = a.getFullYear();
			this.month = a.getMonth();
			this.day = a.getDate();
			console.log("day constructed from date");
		} else if (typeof a === 'number') {
			// number[]
			this.year = a;
			this.month = b;
			this.day = c;
			console.log("day constructed from year , month , day");
		} else {
			console.log("no value found to construct day->",a,b,c);
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
		if ([0, 6].indexOf(this.getDate().getDay()) < 0) {
			return true;
		}
		return false;
	}
	getString(): string {
		return this.year + "-" + this.padMonth() + "-" + this.padDay();
	}
	getDate(): Date {
		return new Date(this.year, this.month, this.day);
	}
	/** 
	 * 
	 * @return {number} returns the unixtimestamp (in seconds)
	 * */
	getTime(): number {
		return this.getDate().getTime() / 1000;
	}
}

export class DayRecord extends Day {
	date: string;
	open: number;
	high: number;
	low: number;
	close: number;
	volume: number;
	adj_close: number;
	
	constructor(
		date: string,
		open: number,
		high: number,
		low: number,
		close: number,
		volume: number,
		adj_close: number
	){
		super(date);
	}
}