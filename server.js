var http = require('http')
var u = require("url")

var SD  = require('./index.js')
var roller = new SD()


var app = http.createServer(function(req, res) {
	var q = u.parse(req.url, true)
	if (q.query.dice) {
		console.log(q.query.dice)
		res.end(JSON.stringify({dice: roller.listRoll(roller.basicParse(q.query.dice))}))
	} else {
		res.end("I don't know what I'm doing")
	}
})

app.listen(8081)
