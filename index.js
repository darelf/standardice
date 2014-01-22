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
  var retval = {sides: die.sides, value: 0, history:[]}
  if (die.sides) {
    var d = this.basicRoll(die.sides)
    if (die.explode) {
      while (d >= die.explode) {
        retval.history.push(d)
        d = this.basicRoll(die.sides)
      }
    }
    
    retval.history.push(d)
    var total_d = retval.history.reduce(function(p,c,i,a) { return p + c })
    if (die.tn) {
      if (d >= die.tn)
        total_d = 1
      else
        total_d = 0
    }
    if ( die.keep ) {
      if (total_d >= die.keep)
        retval.value = total_d
    } else {
      retval.value = total_d
    }
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
    var combos = dstr.split(/[-+]/)
    for (var x = 0; x < combos.length; x++) {
      var sign = dstr[dstr.indexOf(combos[x])-1]
      if (/^\d+$/.test(combos[x])) {
        var val = combos[x]
        if (sign) val = sign + combos[x]
        dice.push({value: parseInt(val)})
      } else {
        var dinfo = self.dsplit.exec(combos[x])
        var eregex = /([ehk])(\d+)/g
        for (var i = 0; i < dinfo[1]; i++) {
          var d = {sides: parseInt(dinfo[2])}
          var einfo = []
          while ((einfo = eregex.exec(combos[x].substring(dinfo[0].length))) !== null) {
            if (einfo[1] === 'e')
              d.explode = parseInt(einfo[2])
            if (einfo[1] === 'k')
              d.keep = parseInt(einfo[2])
            if (einfo[1] === 'h')
              d.tn = parseInt(einfo[2])
          }
          dice.push( d )
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
