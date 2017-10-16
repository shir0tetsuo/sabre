const MAP = require('./set_map.json')
const Rand = require('./random.js')
/*

        other symbols
        // http://www.fileformat.info/info/unicode/category/So/list.htm

*/
const qEnemy = [
  '\u2324',
  '\u25C9',
  '\u2331',
  '\u238A',
  '>))\u25C9>',
  '\u00B0',
  '\u233A',
  '\u2325',
  '\u2349',
  '\u235A',
  '\u235F',
  '\u2368',
  '\u2386',
  '\u238C',
  '\u2392',
  '\u23E3',
  '\u23F0',
  '\u25D0',
  '\u25D1',
  '\u25D2',
  '\u25D3',
  '\u25D4',
  '\u25D5',
  '\u25EC',
  '\u25ED',
  '\u25EE',
  '\u2654',
  '\u2655',
  '\u2656',
  '\u2657',
  '\u2658',
  '\u2659',
  '\u265A',
  '\u265B',
  '\u265C',
  '\u265D',
  '\u265E',
  '\u265F',
  '\u2660',
  '\u26EE'
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
  '\u25A8', // 2 // Shaded Square
  '\u25C8', // 3 // Diamond with Dot
  '\u25CA', // 4 // Thin Diamond
  '\u25CD', // 5 // Circle with fill
  '\u25CE', // 6 // Bullseye
  '\u25CF', // 7 // Black Circle
  '\u262F' // 8 // Yinyang
]

module.exports = (mode) =>  {
  if (mode === 'enemy') {
    return Rand(qEnemy)
  }
  if (mode === 'ename') {
    return `${Rand(qEnemyNameA)} ${Rand(qEnemyNameB)}`
  }
  if (mode === 'warpGate') {
    return qObject[0];
  }
  if (mode === 'common') {
    return qObject[1];
  }
  if (mode === 'questShard') {
    return qObject[4]
  }
  if (mode === 'yinyang') {
    return qObject[8]
  }
  if (mode === 'circle') {
    return qObject[7]
  }
  if (mode === 'item1') {
    return qObject[2];
  }
  if (mode === 'item2') {
    return qObject[3];
  }
  if (mode === 'item3') {
    return qObject[5];
  }
  if (mode === 'item4') {
    return qObject[6];
  }
}
