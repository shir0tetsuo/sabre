const sql = require("sqlite");
sql.open("../score.sqlite");
const settings = require('../settings.json');
const chalk = require ('chalk');
let curren = ":tickets:"
let chatBit = ":eye_in_speech_bubble:"

exports.run = (client, message, params) => {
  const user = message.mentions.users.first()
  if (!user) {
    throw 'PLZ Mention the user'
  }
  if (!user.avatarURL) {
    throw 'There\'s no avatar bro'
  }
  let msg = message;
  message.delete();
  msg.channel.send({embed: {
    color: 0xb5ff00,
    timestamp: new Date(),
    description: `Abrakadabra, Sabre did magic maybe`,
    author: {
      name: user.displayName,
      icon_url: user.avatarURL
    },
    fields: [
      {
        name: `${user.displayName}'s Avatar`,
        value: `[Download](${user.avatarURL})`
      }
    ]
  }}).then(m => {
    setTimeout(() => {
      m.delete()
    }, 20000)
  })
};

/*
enabled, guildOnly, aliases, permission level
*/
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['avt', 'avurl'],
  permLevel: 4
};

/*
name, desc., usage
name is also the command alias
*/
exports.help = {
  name: 'avatardownload',
  description: 'Directly display avatar URL',
  usage: 'avatardownload (@user)'
};
