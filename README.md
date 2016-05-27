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

# sql tries

* [sql.js](https://github.com/kripken/sql.js/)
* sqlite ( aka [node-sqlite](https://github.com/kriasoft/node-sqlite) )
* sqlite3

# GUI frameworks

* Angular2?
* [React](http://facebook.github.io/react/)

# Graphing

http://plottablejs.org/examples/finance/

# Queries

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

