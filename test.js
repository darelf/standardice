var SD = require('./index.js')
var roller = new SD()

// Basic Parse
console.log("Rolling 2d6 with full results...")
console.log( roller.basicParse("2d6"))
console.log("")
// Basic Parse with total only
console.log("Rolling 2d6 with the total only...")
console.log( roller.basicTotal("2d6"))
console.log("")

// By TN
console.log("Rolling 5d10 keeping only 7 or higher...")
var dice = [{sides:10},{sides:10},{sides:10},{sides:10},{sides:10}]
console.log(roller.hitsByTN(dice, 7))
console.log("")

// By TN with explode on 10
console.log("Rolling 5d10 keeping only 7 or higher and exploding on 10...")
var dice = [{sides:10,explode:10},{sides:10,explode:10},{sides:10,explode:10},{sides:10,explode:10},{sides:10,explode:10}]
console.log(roller.hitsByTN(dice, 7))

