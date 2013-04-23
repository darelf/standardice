var http = require('http')
var ports = require('seaport').connect('localhost', 9090)
var u = require("url")

var SD  = require('./index.js')
var roller = new SD()


var app = http.createServer(function(req, res) {
	var q = u.parse(req.url, true)
	if (q.query.dice) {
		res.end("the total for " + q.query.dice + " = " + roller.basicTotal(q.query.dice))
	} else {
		res.end("I don't know what I'm doing")
	}
})

app.listen(ports.register('standardice@0.0.1'))
