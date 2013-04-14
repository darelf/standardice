var events = require('events')
var util = require('util')

/* Simple xDx dice parse */
var dsplit = /(\d+)[dD](\d+)([-+]\d+)?/


var StandardDice = function() {
  events.EventEmitter.call(this)
}
util.inherits(StandardDice, events.EventEmitter)

StandardDice.prototype.basicRoll = function(die) {
  return parseInt(Math.round(Math.random() * (die-1) + 1))
}

StandardDice.prototype.smartRoll = function(die) {
  var retval = {value: 0, history:[]}
  var d = this.basicRoll(die.sides)
  if (die.explode) {
    while (d >= die.explode) {
      retval.value += d
      retval.history.push(d)
      d = this.basicRoll(die.sides)
    }
  }
  retval.value += d
  retval.history.push(d)
  return retval
}

StandardDice.prototype.listRoll = function(dice) {
  var self = this
  var retval = []
  for (var i = 0; i < dice.length; i++) {
    retval.push(self.smartRoll(dice[i]))
  }
  return retval
}

StandardDice.prototype.hitsByTN = function(dice, target) {
  var results = this.listRoll(dice)
  return results.filter(function(i) { return (i.value >= target) })
}

StandardDice.prototype.basicParse = function(dstr) {
  var self = this
  var retval = []
  if(dsplit.test(dstr)) {
    var dinfo = dsplit.exec(dstr)
    var dice = []
    for (var i = 0; i < dinfo[1]; i++) {
      dice.push( {sides: dinfo[2]} )
    }
    retval = self.listRoll(dice)
  }
  return retval
}

StandardDice.prototype.basicTotal = function(dstr) {
  var dice = this.basicParse(dstr)
  return dice.reduce(function(p,c,i,a) { return p.value + c.value })
}

module.exports = StandardDice
