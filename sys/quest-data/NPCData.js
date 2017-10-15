const MAP = require('./set_map.json')
const Rand = require('./random.js')
/*

        other symbols
        // http://www.fileformat.info/info/unicode/category/So/list.htm

*/
const qEnemy = [
  '\u2324', '\u25C9', '\u2331', '\u238A', '>))\u25C9>', '\u00B0', '\u233A', '\u2325', '\u2349', '\u235A', '\u235F', '\u2368', '\u2386', '\u238C', '\u2392', '\u23E3', '\u23F0'
]

const qEnemyNameA = [
  // Nationality
  'Roman', 'Russian', 'Canadian', 'British', 'French', 'Domestic', 'Foreign', 'Aztec', 'Egyptian', 'Norwegian', 'Atlantic',
  // Rank
  'Sergeant', 'Corporal', 'Master', 'Apprentice', 'Colonel', 'Captain', 'General',
  // description
  'Fuzzy', 'Tainted', 'Old', 'Moldy', 'Yellow', 'Salty', 'Rough', 'Benign', 'Underdwelling',
  // Quirky Name
  'Bubba', 'Jerry', 'Adam', 'Willy', 'Ronaldo', 'Ron', 'Lord'

]

const qEnemyNameB = [
  // fruit
  'Apple', 'Banana', 'Orange', 'Peach', 'Melon', 'Kiwi', 'Berry',
  // Veg
  'Pepper', 'Tomato', 'Potato', 'Cucumber',
  // Clothing
  'Sandles', 'Mittens', 'Boots', 'Shoes', 'Socks',
  // Title
  'King', 'Knight', 'Guard', 'Manager', 'David', 'Bot', 'Satan'
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
    return `${Rand(qEnemyNameA)} ${Rand(qEnemyNameB)}`
  }
  if (mode === 'common') {
    return qObject[1];
  }
  if (mode === 'item1') {
    return qObject[2]
  }
}
