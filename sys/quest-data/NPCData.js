const MAP = require('./set_map.json')
const Rand = require('./random.js')
/*

        other symbols
        // http://www.fileformat.info/info/unicode/category/So/list.htm

*/
const qEnemy = [
  '\u2324', '\u25C9', '\u2331', '\u238A', '>))\u25C9>'
]

const qEnemyName = [
  // eastereggs
  'Ronaldo', 'Boba Fett', 'George', 'David', 'Tony', 'Dan',
  // main
  'Shadow', 'Shadowling', 'Underdweller', 'King', 'Darkness',
  // star wars
  'Wookie', 'Weird Symbol', 'Jerry'
]

const qObject = [
  '\u2398', // 0 // warpGate
  '\u2324', // 1 // -^-
  '\u25A8' // 2 // mysteriousObject
]

module.exports = (mode) =>  {
  if (mode === 'enemy') {
    return Rand(qEnemy)
  }
  if (mode === 'ename') {
    return Rand(qEnemyName)
  }
  if (mode === 'common') {
    return qObject[1];
  }
  if (mode === 'item1') {
    return qObject[2]
  }
}
