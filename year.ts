import { Day , DayArray } from './day.ts'

export class Year {
	year: number;
	
	constructor(year: number){ }
	
	getHoliDays(): DayArray {
		let days: DayArray;
		
		/** New Years */
		days[days.length] = this.weekendNextMonday(new Day(this.year,1,1));
		/** MLK is the 3rd Monday in January */
		days[days.length] = this.getDayOfWeekOccurance(1,1,3);
		/** Washington's birthday is the 3rd Monday in February */
		days[days.length] = this.getDayOfWeekOccurance(2,1,3);
		/** Good Friday , 2 days before Easter */
		days[days.length] = this.getGoodFriday();
		/** Memorial Day is the LAST Monday in May */
		days[days.length] = this.getMemorialDay();
		/** The Fourth of July */
		days[days.length] = this.weekendNextMonday(new Day(this.year,7,4));
		/** Labor Day is the 1st Monday in September */
		days[days.length] = this.getDayOfWeekOccurance(9,1,1);
		/** Thanksgiving is the Fourth Thursday in November */
		days[days.length] = this.getDayOfWeekOccurance(11,4,4);
		/** Christmas */
		days[days.length] = this.weekendNextMonday(new Day(this.year,12,25))
		return days;
	}
	
	/**
	 * Memorial day is the LAST monday in the month of May
	 * Start backwards from the last day of the month until you find a monday.
	 * @return {Day} Day object of Memorial day
	 */
	getMemorialDay(): Day {
		/** @desc started in February */ 
		let m: number=5;
		/** start at the last day in the month and count backwards */
		let d: number=this.daysInMonth(m);
		for ( let y=this.year, date: Date; d>0;d--){
			date = new Date(this.year,m,d);
			if ( date.getDay() == 1 ) { break; }
		}
		return new Day(this.year,m,d);
	}
	
	/** 
	 * Find the Nth occurance of Day of the Week
	 * @param {number} month - month of the year
	 * @param {number} dayOfWeek - 0 (Sunday) through 6 (Saturday) 
	 * @param {number} occurance - the Nth occurance
	 * @return {Day} return the Day object of this occurance
	 */
	getDayOfWeekOccurance(month: number, dayOfWeek: number, occurance: number): Day {
		/** @desc {number} day to start with */
		let d: number=1;
		for ( let y=this.year, maxDays=this.daysInMonth(month), date: Date; d<maxDays;d++){
			date = new Date(this.year,month,d);
			if ( date.getDay() == dayOfWeek ) { break; }
		}
		/** @desc now that the first occurance is found, we add (N-1)*7 weeks in order to find the correct occurance */ 
		d += ( ( occurance - 1 ) * 7 ) ;
		
		return new Day(this.year,month,d);
	}
	
	/**
	 * This will transform the day input into the next monday if the input day was on a weekend
	 * @param {Day} day - this is the day to check for a weekend
	 * @return {Day} this is the transformed day, next monday, if it is transformed
	 */
	weekendNextMonday(day: Day ): Day {
		/** @desc {number} day to start with */
		let d: number=day.day;
		/** @desc {number} month of year */
		let m: number=day.month;
		/** @desc {number} year for the day */
		let y: number=day.year;
		/** @desc {Date} Date object to calculate day of week with */
		let date: Date = new Date(y,m,d);
		if ( [0,6].indexOf(date.getDay()) < 0 ){
			/** check if date / day is on Sunday I add 1 */
			if ( date.getDay() == 0 ) { d+= 1; }
			/** else if date / day is on Saturday, add 2 */
			if ( date.getDay() == 6 ) { d+= 2; }
			/** recreate day using new values */
			day = new Day(y,m,d);
		} 
		/** return day, whether it be the original or the modified */
		return day;
	}

	/**
	 * Return the number of days in the supplied month  
	 * {@link http://stackoverflow.com/questions/1184334/get-number-days-in-a-specified-month-using-javascript this is the result of an answer posted on StackOverflow}
	 * @param {number} month - month of the year
	 * @return {number} daysInMonth - days in the month
	 */
	daysInMonth(month:number) {
		return new Date(this.year, month, 0).getDate();
	}
	
	/**
	 * Good Friday is 2 days before Easter
	 * @return {Day} day object of Good Friday
	 */
	getGoodFriday(): Day {
		/** get easter as a Date Object */
		let easter = this.getEaster().getDate();
		/** two days before easter (86400 seconds in a day, 2 days, 1000 milliseconds) */
		return new Day(new Date(easter.getTime()-(86400*2*1000)));
	}
	
	/**
	 * Returns the Day object for easter this year
	 * Easter as it happens is the most complex holidy to calculate ever. 
	 * Uses Integer math, thus all of the floor() calcs, for more information see this
	 * {@link http://aa.usno.navy.mil/faq/docs/easter.php incredibly useful navy article on calculating Easter's Date}
	 * @return {Day} object containing the day of Easter
	 */
	getEaster(): Day{
		let y: number= this.year;
		let m: number;
		let d: number;
		
		let c = Math.floor(y / 100)
		let n = y - Math.floor(19 * Math.floor( y / 19 ))
		let k = Math.floor(( c - 17 ) / 25)
		let i = c - Math.floor(c / 4) - Math.floor(( c - k ) / 3) + Math.floor(19 * n) + 15
		i = i - Math.floor(30 * Math.floor( i / 30 ))
		i = i - Math.floor(Math.floor( i / 28 ) * Math.floor( 1 - Math.floor( i / 28 ) * Math.floor( 29 / ( i + 1 ) ) * Math.floor( ( 21 - n ) / 11 ) ))
		let j = y + Math.floor(y / 4) + i + 2 - c + Math.floor(c / 4)
		j = j - Math.floor(7 * Math.floor( j / 7 ))
		let l = i - j
		m = 3 + Math.floor(Math.floor( l + 40 ) / 44)
		d = l + 28 - Math.floor(31 * Math.floor( m / 4 ))
		
		return new Day(y,m,d);
	}

}