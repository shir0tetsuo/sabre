const sql = require('sqlite');
sql.open('/root/NC/utils/NorthStar/sabre.discord.js/score.sqlite');
exports.run = (client, message, params) => {
  sql.get(`SELECT * FROM scores WHERE userId = "303309686264954881"`).then(row => {
    console.log(row.level, row.tickets, row.chatBits)
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
