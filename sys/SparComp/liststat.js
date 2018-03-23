const sql = require("sqlite");
sql.open("/root/NC/utils/NorthStar/score.sqlite");

function ListStatistic(message) {
  sql.get(`SELECT * FROM SparComp WHERE userid = "masterstat"`).then(m => {
    if (!m) {
      message.reply(`\`Error\` The database hasn't been initialized yet.`)
      return;
    } else {
      var MasterStat = m.record;
      sql.get(`SELECT * FROM SparComp WHERE userId = "${message.author.id}"`).then(scs => {
        let StateMRecord = `:exclamation: There are __${MasterStat}__ matches recorded.`
        if (!scs) {
          message.reply(`${StateMRecord}\n\`The system could not find a statistic for you.\``)
        } else {
          message.reply(`${StateMRecord}\n\`You have ..\`__\`${scs.record}\`__\`, Recorded Matches.\``)
        }
      })
    }
  })
}

module.exports = (message) =>  {
  ListStatistic(message)
  return;
}
