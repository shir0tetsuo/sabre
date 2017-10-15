const Transaction = require('./transaction.js');

function generateReward(message, h) {
  var rewardPrint = Math.round(Math.random())
  // Level 1 Winnings
  if (h.hlvl >= 1) {
    if (rewardPrint <= 0.33) {
      var rTk = Math.round(Math.random() * (100000 - 1000 * h.hlvl) + 1000 * h.hlvl)
      var rewObject = `${rTk} Sabre Tickets`
      Transaction(message, 'tk', rTk)
    } else if (rewardPrint <= 0.66) {
      var rBy = Math.round(Math.random() * (120000 - 1000 * h.hlvl) + 1000 * h.hlvl)
      var rewObject = `${rBy} Bytes`
      Transaction(message, 'b', rBy)
    } else if (rewardPrint <= 0.97) {
      var rewObject = `1 Dark Ticket`
      Transaction(message, 'dtk', 1)
    } else {
      var rewObject = `Nothing.`
    }
  } else {
    var rewObject = "nothing."
  }
  return `Obtained ${rewObject}`
}

module.exports = (message, h) => {
  return generateReward(message, h);
}
