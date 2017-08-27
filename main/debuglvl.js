const settings = require('../settings.json');
const chalk = require ('chalk');
const sql = require('sqlite');
sql.open('../score.sqlite');
exports.run = (client, message, params) => {
  sql.get(`SELECT * FROM scores WHERE userId = "${message.author.id}"`).then(row => {
    console.log(message.author.id, row.level, row.tickets, row.chatBits)
  })
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['debug'],
  permLevel: 4
};

exports.help = {
  name: 'debuglvl',
  description: 'PermLVL 4.',
  usage: 'debuglvl'
};
