const sql = require("sqlite");
sql.open("../score.sqlite");
const settings = require('../settings.json');
const chalk = require ('chalk');

exports.run = (client, message, params) => {
  if (params[0] === undefined) {
    sql.get(`SELECT * FROM avail WHERE userId = "${message.author.id}"`).then(row => {
      if (row.avail === 0) { // "Is Available: "
        var onlineStatus = `:lock:`
      } else if (row.avail === 0) {
        var onlineStatus = `:unlock: being displayed as Active!`
      } else {
        var onlineStatus = `:unlock: being displayed as AFK!`
      }
      message.reply(`You are ${onlineStatus}`)
    })
  }
};

/*
enabled, guildOnly, aliases, permission level
*/
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['seeonstat', 'os'],
  permLevel: 0
};

/*
name, desc., usage
name is also the command alias
*/
exports.help = {
  name: 'lockstatus',
  description: 'Displays if your user has lock enabled.',
  usage: 'lockstatus\nReference :: See lock help page'
};
