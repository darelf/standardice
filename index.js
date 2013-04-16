var events = require('events')
var util = require('util')

var StandardDice = function() {
  events.EventEmitter.call(this)
}
util.inherits(StandardDice, events.EventEmitter)

StandardDice.prototype.dsplit = /(\d+)[dD](\d+)/

StandardDice.prototype.basicRoll = function(die) {
  return parseInt(Math.round(Math.random() * (die-1) + 1))
}

StandardDice.prototype.smartRoll = function(die) {
  var retval = {value: 0, history:[]}
  if (die.sides) {
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
  } else {
    retval = die
  }
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
  var dice = []
  if(self.dsplit.test(dstr)) {
    var combos = dstr.split(/[+-]/)
    for (var x = 0; x < combos.length; x++) {
      if (/^\d+$/.test(combos[x])) {
        dice.push({value: parseInt(combos[x])})
      } else {
        var dinfo = self.dsplit.exec(combos[x])
        for (var i = 0; i < dinfo[1]; i++) {
          dice.push( {sides: parseInt(dinfo[2])} )
        }
      }
    }
  }
  return dice
}

StandardDice.prototype.basicTotal = function(dstr) {
  var dice = dstr
  var rolls = dstr
  if (!(dstr instanceof Array)) {
    dice = this.basicParse(dstr)
    rolls = this.listRoll(dice)
  }
  var total = rolls.reduce(function(p,c,i,a) { return (p.value ? p.value : p) + c.value })
  return total
}

module.exports = StandardDice
