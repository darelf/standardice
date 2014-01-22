var SD = require('./index.js')
var roller = new SD()

// Basic Parse
console.log("Rolling 5d6 with basic results...")
console.log( roller.listRoll(roller.basicParse("5d6")) )
console.log("")

// Basic Parse Explode
console.log("Rolling 5d6e5 which explodes on 5 or 6 (e5)...")
console.log( roller.listRoll( roller.basicParse("5d6e5") ) )
console.log("")

// Basic Parse with total only
console.log("Rolling 2d6 with the total only...")
console.log( roller.basicTotal("2d6") )
console.log("")

// Basic Parse with basic results and total only for same dice
console.log("Rolling 2d6+5 with basic results...")
var d = roller.basicParse("2d6+5")
console.log( d )
d = roller.listRoll(d)
console.log( d )
console.log("")

console.log("Same with total only...")
console.log( roller.basicTotal(d) )
console.log("")

console.log("Rolling 2d6-3 with basic results...")
d = roller.basicParse("2d6-3")
console.log(d)
d = roller.listRoll(d)
console.log(d)
console.log("")

console.log("Same roll with total only...")
console.log( roller.basicTotal(d) )
console.log("")

console.log("Rolling 2d6+5d12 with basic results...")
d = roller.basicParse("2d6+5d12")
console.log( d )
console.log( roller.listRoll(d) )


// Keep By TN
console.log("Rolling 5d10 keeping only 7 or higher...")
console.log(roller.listRoll( roller.basicParse("5d10k7") ))
console.log("")

// Keep By TN with explode on 10
console.log("Rolling 5d10 keeping only 7 or higher and exploding on 9...")
console.log(roller.listRoll( roller.basicParse("5d10k7e9") ))

// Count hits by TN
console.log("Rolling 5d10 counting hits of 6 or higher... (5d10h6)")
console.log(roller.listRoll( roller.basicParse("5d10h6") ))
console.log("")
