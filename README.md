# EH1 electron starting
[mkmrk github repo](https://github.com/variab1e/mkmrk)

**from electron-quickstart** This is a minimal Electron application based on the [Quick Start Guide](http://electron.atom.io/docs/latest/tutorial/quick-start) within the Electron documentation.

**Use this app along with the [Electron API Demos](http://electron.atom.io/#get-started) app for API code examples to help you get started.**

A basic Electron application needs just these files:

- `package.json` - Points to the app's main file and lists its details and dependencies.
- `main.js` - Starts the app and creates a browser window to render HTML. This is the app's **main process**.
- `index.html` - A web page to render. This is the app's **renderer process**.

You can learn more about each of these components within the [Quick Start Guide](http://electron.atom.io/docs/latest/tutorial/quick-start).

## To Use

### Eric's Notes

* see the typescript transpiler `tsc`
    - [typescript docs](https://www.typescriptlang.org/docs/tutorial.html)
* use build `scripts` in `package.json`
* [example of electron typescript application](https://github.com/steve-perkins/MediaGallery/blob/master/renderer.ts)

To clone and run this repository you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
git clone https://github.com/electron/electron-quick-start
# Go into the repository
cd electron-quick-start
# Install dependencies and run the app
npm install && npm start
```

Learn more about Electron and its API in the [documentation](http://electron.atom.io/docs/latest).

# Typescript

[handbook](https://www.typescriptlang.org/docs/tutorial.html)

## tsc (transpiler)

https://www.typescriptlang.org/docs/handbook/compiler-options.html

## tsconfig.json

https://www.typescriptlang.org/docs/handbook/tsconfig-json.html

## typings

[typings overview](https://github.com/typings/typings)

[typings for npm packages](https://www.typescriptlang.org/docs/handbook/typings-for-npm-packages.html)

[typings generator](https://github.com/typings/generator-typings)

- [file structure best practices](https://github.com/typings/discussions/issues/15)

- [typings installation](https://github.com/typings/typings/blob/master/docs/faq.md#where-do-the-type-definitions-install)

# SQLite3

## Fundamentals

[data types](https://www.sqlite.org/datatype3.html)
* data types are **NOT** static, the column's data type is merely a suggestion
* 

## js & typescript sql libraries

* [sql.js](https://github.com/kripken/sql.js/)
* sqlite ( aka [node-sqlite](https://github.com/kriasoft/node-sqlite) )
* [sqlite3](https://github.com/mapbox/node-sqlite3#installing)
    - [node and sqlite3](http://blog.modulus.io/nodejs-and-sqlite)
    - 

# GUI frameworks

* Angular2?
* [React](http://facebook.github.io/react/)

# Graphing

http://plottablejs.org/examples/finance/

# Queries

[Yahoo Finance API Question on StackOverflow](http://stackoverflow.com/questions/5108399/yahoo-finance-all-currencies-quote-api-documentation)

[Project written using python](https://github.com/lukaszbanasiak/yahoo-finance/blob/master/yahoo_finance/__init__.py)

## Further Reading-

https://developer.yahoo.com/yql/console/?q=select%20*%20from%20csv%20where%20url%3D%27http%3A%2F%2Fdownload.finance.yahoo.com%2Fd%2Fquotes.csv%3Fs%3DYHOO%2CGOOG%2CAAPL%26f%3Dsl1d1t1c1ohgv%26e%3D.csv%27%20and%20columns%3D%27symbol%2Cprice%2Cdate%2Ctime%2Cchange%2Ccol1%2Chigh%2Clow%2Ccol2%27

http://www.yqlblog.net/blog/2009/06/02/getting-stock-information-with-yql-and-open-data-tables/



```

http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20IN%20(%22YHOO%22,%22AAPL%22)&format=json&env=http://datatables.org/alltables.env


curl -v --data-urlencode format=json \
--data-urlencode env=http://datatables.org/alltables.env \
--data-urlencode 'q=Select * from yahoo.finance.quotes where symbol IN ("YHOO","AAPL")' \
http://query.yahooapis.com/v1/public/yql -o - | jq .

curl -v "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20IN%20(%22YHOO%22,%22AAPL%22)&format=json&env= http://datatables.org/alltables.env" -o - | jq .

****

curl -v --data-urlencode format=json \
--data-urlencode env=http://datatables.org/alltables.env \
--data-urlencode 'q=Select * from yahoo.finance.historicaldata where startDate="2016-01-14" AND endDate="2016-01-15" AND symbol="YHOO"' \
http://query.yahooapis.com/v1/public/yql -o - | jq .

****

yahoo.finance.????
---->
 query = 'select * from yahoo.finance.{table} where {key} = "{symbol}"'.format(
            symbol=self.symbol, table=table, key=key)
https://github.com/lukaszbanasiak/yahoo-finance/blob/master/yahoo_finance/__init__.py
#line 85

```

# Async Functions

_awesome_

<https://templecoding.com/blog/2016/02/17/async-await-with-es6-babel-and-typescript/>