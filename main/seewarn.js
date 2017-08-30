const settings = require('../settings.json');
const chalk = require ('chalk');
const sql = require("sqlite");
sql.open("../score.sqlite");
exports.run = (client, message, params) => {
  sql.get(`SELECT * FROM warning WHERE userId = "${message.author.id}"`).then(row => {
    if (!row) {
      message.reply("You have never received a warning.")
    } else {
      message.reply(`Date Warned: ${row.date} - You have ${row.times} warnings.`)
    }
  })
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['seewarn'],
  permLevel: 0
};

exports.help = {
  name: 'seeWarn',
  description: 'Displays how many warnings a user has received.',
  usage: 'seeWarn'
};
