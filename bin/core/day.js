"use strict";
//import { DayRecord } from './dayRecord.ts';
const elog_1 = require('../lib/elog');
var Holiday;
(function (Holiday) {
    Holiday[Holiday["New Years"] = 0] = "New Years";
    Holiday[Holiday["Martin Luther King"] = 1] = "Martin Luther King";
    Holiday[Holiday["Washington's Birthday"] = 2] = "Washington's Birthday";
    Holiday[Holiday["Good Friday"] = 3] = "Good Friday";
    Holiday[Holiday["Memorial Day"] = 4] = "Memorial Day";
    Holiday[Holiday["Independance Day"] = 5] = "Independance Day";
    Holiday[Holiday["Labor Day"] = 6] = "Labor Day";
    Holiday[Holiday["Thanksgiving"] = 7] = "Thanksgiving";
    Holiday[Holiday["Christmas"] = 8] = "Christmas";
})(Holiday || (Holiday = {}));
class DayArray extends Array {
    /**
     * This should override the native includes so that boolean true is returned if
     * the Day input for compare item is in this array
     * @param {Day | DayRecord} compareItem is the Day object to check if is present within the array
     * @return {boolean} true if within the array, false if not
     */
    includes(compareItem) {
        for (let i = 0; i < this.length; i++) {
            /** bit of logging here */
            elog_1.elog("comparing[" + compareItem.year + "-" + compareItem.month + "-" + compareItem.day +
                "|to|" +
                this[i].year + "-" + this[i].month + "-" + this[i].day + "]");
            if (compareItem.day == this[i].day &&
                compareItem.month == this[i].month &&
                compareItem.year == this[i].year) {
                return true;
            }
        }
        return false;
    }
    getSeries() {
        let series = new Array();
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
            if (element instanceof DayRecord) {
                series.push({
                    x: element.toDate(),
                    y: element.open,
                    x2: element.toDate(),
                    y2: element.close
                });
            }
        });
        return series;
    }
}
exports.DayArray = DayArray;
/**
 * Purpose of this is to standardise on ISO-8601 format
 * {@link http://xkcd.com/1179/ xkcd knows it}
 */
class Day {
    constructor(a, b, c) {
        if (typeof a === "string") {
            let date = a;
            var [year, month, day] = date.split("-");
            this.year = parseInt(year);
            this.month = parseInt(month);
            this.day = parseInt(day);
            elog_1.elog(`day constructed from dateString => ${this.year}-${this.month}-${this.day}`);
        }
        else if (typeof a == "object" && a instanceof Date) {
            this.year = a.getFullYear();
            this.month = a.getMonth() + 1;
            this.day = a.getDate();
            elog_1.elog(`day constructed from date => ${this.year}-${this.month}-${this.day}`);
        }
        else if (typeof a === 'number') {
            // number[]
            this.year = a;
            this.month = b;
            this.day = c;
            elog_1.elog(`day constructed from year , month , day => ${this.year}-${this.month}-${this.day}`);
        }
        else {
            elog_1.elog("no value found to construct day->", a, b, c);
        }
    }
    /**
     * @return {string} returns the numberic month as a string left-0 padded to two characters
     */
    padMonth() {
        return ("00" + this.month).substr(-2, 2);
    }
    /**
     * @return {string} returns the numeric day of the month as a string left-0 padded to two characters
     */
    padDay() {
        return ("00" + this.day).substr(-2, 2);
    }
    /**
     * @return {boolean} return true if this is a weekend day, else false
     */
    isWeekend() {
        if ([0, 6].indexOf(this.toDate().getDay()) >= 0) {
            return true;
        }
        return false;
    }
    /**
     * @return {string} returns this in string format `YYYY-MM-DD`
     * */
    toString() {
        return this.year + "-" + this.padMonth() + "-" + this.padDay();
    }
    get dateString() { return this.toString(); }
    ;
    /**
     * @return {Date} returns a native javascript Date object set to this
     * */
    toDate() {
        /** NOTE: javascript native Date type month parameter is zero based */
        return new Date(this.year, this.month - 1, this.day);
    }
    /**
     * @return {number} returns the unixtimestamp (in seconds)
     * */
    getTime() {
        return this.toDate().getTime() / 1000;
    }
}
exports.Day = Day;
class DayRecord extends Day {
    /**
    date: string;
    public open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
    adj_close: number;
    **/
    constructor(date, open, high, low, close, volume, adj_close) {
        super(date);
        this.open = open;
        this.high = high;
        this.low = low;
        this.close = close;
        this.volume = volume;
        this.adj_close = adj_close;
    }
    get date() {
        return this.toDate();
    }
}
exports.DayRecord = DayRecord;
//# sourceMappingURL=day.js.map