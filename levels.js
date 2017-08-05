// Testing levels in json
const levl = require("./multilevel.json")
console.log(levl.level1)
console.log(levl.level2)
console.log(levl.level3)
console.log(levl.level4.level4)
console.log(levl)
// Test: External text variables in math functions
const game = require("./multilevel2.json")
console.log(game)
console.log(game.game)
var gamemat = game.game[Math.floor(Math.random() * game.game.length)]
console.log(gamemat.text)
