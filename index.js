var express = require('express');
var app = express();
var http = require('http').Server(app);
var pg = require('pg')
var conString = "postgres://postgres:postgres@localhost/test";

pg.connect(conString, function(err, client, done) {
	if (err) {
		return console.error('error fetching client from pool', err);
	}
	client.query('SELECT $1::int AS number', ['1'], function(err, result) {
		done();
		if (err) {
			return console.error("error running query", err)
		}
		console.log(result.rows[0].number)
	});
});

app.use(express.static(__dirname));
app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

http.listen((process.env.PORT || 3000), function(){
  console.log('listening on *:3000');
});

//use dbvis