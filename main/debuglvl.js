const sql = require('sqlite');
sql.open('../score.sqlite');
exports.run = (client, message, params) => {
  sql.get(`SELECT * FROM scores WHERE userId = "303309686264954881"`).then(row => {
    console.log(row.level, row.tickets, row.chatBits)
  })
};

exports.conf = {
  enabled: false,
  guildOnly: false,
  aliases: ['debug'],
  permLevel: 4
};

exports.help = {
  name: 'debuglvl',
  description: 'Developer Command.',
  usage: 'debuglvl, see Secure Terminal for details.'
};
