const settings = require('../settings.json');
const chalk = require ('chalk');
const sql = require("sqlite");
sql.open("./score.sqlite");
exports.run = (client, message, params) => {
  console.log(new Date())
  console.log(chalk.greenBright("A new database has been created."));
  message.reply("`Access Granted` ***This should only be run once per seed!***");
  sql.run("CREATE TABLE IF NOT EXISTS warning (userid TEXT, times INTEGER, date TEXT)").then(() => {
    sql.run("INSERT INTO warning (userid, times, date) VALUES (?, ?, ?)", [message.author.id, 0, "Sun Aug 26"]);
  };
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['touchd'],
  permLevel: 4
};

exports.help = {
  name: 'touchdb',
  description: 'Seeds a New Database. PermLVL 4.',
  usage: 'touchdb'
};
