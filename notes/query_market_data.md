
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

# News Sources


