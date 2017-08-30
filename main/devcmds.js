const sql = require('sqlite');
sql.open('../score.sqlite');
exports.run = (client, message, params) => {
  let person = message.mentions.members.first()
  if (person === undefined) return message.reply("`ERROR`")
  message.person.send(message.content)
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['devc', 'xdev'],
  permLevel: 4
};

exports.help = {
  name: 'devcmd',
  description: 'Developer Command. PermLVL 4.',
  usage: 'devcmd'
};
