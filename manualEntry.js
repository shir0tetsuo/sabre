const sql = require ("sqlite");
////////////////////////////////////////////////////////////////////////////////
// Modify the variables below to change new values
let userId = 303309686264954881
let newLv = 1
let newTk = 1
let newCb = 1
sql.open("./score.sqlite");
sql.get(`SELECT * FROM scores WHERE userId = "${userId}"`).then(row => {
  console.log(chalk.yellow(row.userId))
  console.log(chalk.red(`LV: ${row.level}, TK: ${row.tickets}, CB: ${row.chatBits}`))
})
////////////////////////////////////////////////////////////////////////////////
// Uncomment lines below to activate
//sql.run(`UPDATE scores SET level = ${newLv} WHERE userId = "${userId}"`)
//sql.run(`UPDATE scores SET tickets = ${newTk} WHERE userId = "${userId}"`)
//sql.run(`UPDATE scores SET chatBits = ${newCb} WHERE userId = "${userId}"`)
