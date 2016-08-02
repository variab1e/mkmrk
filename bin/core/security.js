"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const fetch = require('isomorphic-fetch');
const fs = require('fs');
const sql = require('sql.js');
const path = require('path');
const day_1 = require('./day');
const year_1 = require('./year');
const elog_1 = require('../lib/elog');
class Security {
    constructor(_symbol, 
        /**
         * path for the database
         * `./` and `process.cwd()` both reference the directory that node was called from
         * `__dirname` references the directory that the file resides in
         * http://www.hacksparrow.com/understanding-directory-references-in-node-js.html
         */
        dbname = "../data/f.db") {
        this._symbol = _symbol;
        this.dbname = dbname;
        this._history = new day_1.DayArray();
        this.dayRange = new Array();
        this.expectedDays = new day_1.DayArray();
        elog_1.elog("Security constructor for " + _symbol);
        this.dbpath = path.join(__dirname, "..", this.dbname);
        this.db = new sql.Database(fs.readFileSync(this.dbpath));
        // date stored as ISO 8601
        this.writeSql("CREATE TABLE IF NOT EXISTS " + this._symbol + " (" +
            " `date`	TEXT NOT NULL UNIQUE, " +
            " `open`	REAL NOT NULL, " +
            " `high`	REAL NOT NULL, " +
            " `low`	REAL NOT NULL, " +
            " `close`	REAL NOT NULL, " +
            " `volume`	NUMERIC, " +
            " `adj_close`	REAL, " +
            " PRIMARY KEY(date) " +
            "); ");
        elog_1.elog("table created");
    }
    get symbol() {
        return this._symbol;
    }
    get history() {
        elog_1.elog("elog->getHistory->", this._history);
        return this._history;
    }
    writeSql(sqlstr) {
        elog_1.elog("writeSql:" + sqlstr);
        this.db.run(sqlstr);
        fs.writeFileSync(this.dbpath, new Buffer(this.db.export()));
    }
    historyFromSql(dayStart, dayEnd) {
        try {
            let dayRecords = new day_1.DayArray();
            this.db.each('SELECT * FROM ' + this._symbol + ' WHERE ' +
                'date>="' + dayStart.toString() + '" AND date<="' + dayEnd.toString() + '" ORDER BY date', function (r) {
                elog_1.elog(r);
                dayRecords.push(new day_1.DayRecord(r.date, r.open, r.high, r.low, r.close, r.volume, r.adj_close));
            });
            return dayRecords;
        }
        catch (e) {
            elog_1.elog("ERROR:" + e);
        }
        elog_1.elog("historyFromSql ERROR - null being returned.");
        return null;
    }
    historySaveSql() {
        try {
            for (var i = 0; i < this._history.length; i++) {
                let d = this._history[i];
                this.writeSql("REPLACE INTO " + this._symbol + " (" +
                    " date , " +
                    " open , " +
                    " high , " +
                    " low , " +
                    " close , " +
                    " volume , " +
                    " adj_close " +
                    ") VALUES (" +
                    "   '" + d.dateString + "'" +
                    " , '" + d.open + "'" +
                    " , '" + d.high + "'" +
                    " , '" + d.low + "'" +
                    " , '" + d.close + "'" +
                    " , '" + d.volume + "'" +
                    " , '" + d.adj_close + "'" +
                    "); ");
            }
        }
        catch (e) {
            elog_1.elog("ERROR:" + e);
        }
    }
    createHistoryDayRange(dayStart, dayEnd) {
        let holidays = new day_1.DayArray();
        for (let d = dayStart.day, m = dayStart.month, y = dayStart.year, day = new day_1.Day(y, m, d), holidays = new year_1.Year(y).getHoliDays(); day.getTime() < dayEnd.getTime(); (d < new year_1.Year(y).getDaysInMonth(m) ? d += 1 :
            (m == 12 ? (d = 1, m = 1, y++, holidays = new year_1.Year(y).getHoliDays()) : (d = 1, m++)))) {
            elog_1.elog(`currently testing day ${y}-${m}-${d}`);
            // day is the day currently being tested
            day = new day_1.Day(y, m, d);
            if (day.isWeekend()) {
                /** it is a weekend */
                elog_1.elog(`${y}-${m}-${d} is a weekend - not being added to expectedDays`);
                // dayRange is the an array of all days tested, add it here
                this.dayRange.push(day);
                continue;
            }
            else if (holidays.includes(day)) {
                /** it is a holiday */
                elog_1.elog(`${y}-${m}-${d} is a holiday - not being added to expectedDays`);
                this.dayRange.push(day);
                continue;
            }
            else {
                /** these are the weekday, non-holidays, they should have trading activity */
                this.dayRange.push(day);
                // add it to the array of days we expect to find data for, as it is neither a weekend nor a holiday.
                this.expectedDays.push(day);
            }
            elog_1.elog(`end of loop for day ${y}-${m}-${d}`);
        }
    }
    checkHistoryRange(dayRecord) {
        /** check if the number of dayRecords is the same length as the number of expectedDays else return false */
        if (dayRecord.length == this.expectedDays.length) {
            for (let i = 0; i < dayRecord.length; i++) {
                /** return false if expectedDays ever does NOT include the dayRecocord */
                if (!this.expectedDays.includes(dayRecord[i])) {
                    return false;
                }
                else {
                    elog_1.elog(dayRecord[i].toString() + " is expected");
                }
                ;
            }
            elog_1.elog("HistoryRange has been checked and matches for SQL");
            return true;
        }
        else {
            elog_1.elog(`dayRecord.length of ${dayRecord.length} != this.expectedDays.length of ${this.expectedDays.length}`);
        }
        return false;
    }
    loadHistory(dayStartString, dayEndString, filename) {
        return __awaiter(this, void 0, void 0, function* () {
            let dayStart = new day_1.Day(dayStartString);
            let dayEnd = new day_1.Day(dayEndString);
            this.createHistoryDayRange(dayStart, dayEnd);
            elog_1.elog("getHistory(" + this._symbol + ")");
            let json;
            if (filename) {
                elog_1.elog("Filename " + filename + " set, loading from file " + filename);
                /** NOTE TO SELF: DIRECTORY SHOULD BE:: `../data/` */
                //let json = JSON.parse(fs.readFileSync(path.join(__dirname, this._symbol+".json")).toString());
                let json = JSON.parse(fs.readFileSync(filename).toString());
                let dayRecords = this.historyParseJson(json);
                if (this.checkHistoryRange(dayRecords)) {
                    this._history = dayRecords;
                    this.historySaveSql();
                    elog_1.elog("History loaded from file" + filename);
                    return;
                }
            }
            else {
                /** try to load from SQL database */
                try {
                    elog_1.elog("try to load data from SQL");
                    let dayRecords = this.historyFromSql(dayStart, dayEnd);
                    if (this.checkHistoryRange(dayRecords)) {
                        this._history = dayRecords;
                        elog_1.elog("history loaded from SQL");
                        /** successfully loaded from SQL - stop processing further sources */
                        return;
                    }
                }
                catch (e) {
                    elog_1.elog("ERROR:" + e);
                }
                /** all internal sources have failed, do a fresh external lookup */
                let json = yield this.query('Select * from yahoo.finance.historicaldata where ' +
                    'startDate="' + dayStart.toString() + '" ' +
                    'AND endDate="' + dayEnd.toString() + '" ' +
                    'AND symbol="' + this.symbol + '"');
                let dayRecords = this.historyParseJson(json);
                if (this.checkHistoryRange(dayRecords)) {
                    this._history = dayRecords;
                    this.historySaveSql();
                    elog_1.elog("History saved to SQL");
                    return;
                }
            }
        });
    }
    historyParseJson(json) {
        elog_1.elog("query results=" + json.query.results.quote.length);
        let dayRecords = new day_1.DayArray();
        for (var i = 0; i < json.query.results.quote.length; i++) {
            let d = json.query.results.quote[i];
            dayRecords.push(new day_1.DayRecord(d.Date, d.Open, d.High, d.Low, d.Close, d.Volume, d.Adj_Close));
        }
        return dayRecords;
    }
    query(query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let response = yield fetch("http://query.yahooapis.com/v1/public/yql" +
                    "?" +
                    encodeURI("format=json" + "&" +
                        "env=http://datatables.org/alltables.env" + "&" + "q=" +
                        query));
                let json = yield response.json();
                elog_1.elog("query(" + query + ") " + response.status + " " + response.statusText + " --to--> " + response.url);
                return json;
            }
            catch (err) {
                elog_1.elog(err.message);
            }
        });
    }
}
exports.Security = Security;
//# sourceMappingURL=security.js.map