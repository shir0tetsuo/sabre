// ctrl-p = find a file
const sql = require("sqlite");
sql.open("../score.sqlite");
const settings = require('../settings.json');
const chalk = require ('chalk');
let curren = ":tickets:"
let chatBit = ":eye_in_speech_bubble:"

exports.run = (client, message, params) => {
  // Everything that happens
  var MU = message.guild.roles.find("name", "Muted")
  if (!MU || MU === undefined) {
    message.guild.createRole().then(role => {
      role.edit({
                  name: "Muted",
                  color: 0x454647,
                  mentionable: false
      })
    }).then(() => {
      message.channel.send(`\`Role Created: Muted\``)
      message.channel.overwritePermissions(message.guild.roles.find("name", "Muted"), {
        READ_MESSAGES: false,
        SEND_MESSAGES: false
      })
    })
  } else {
    message.channel.overwritePermissions(message.guild.roles.find("name", "Muted"), {
      READ_MESSAGES: false,
      SEND_MESSAGES: false
    })
  }

  //message.channel.overwritePermissions(message.guild.id, {
  //  READ_MESSAGES: false,
  //  SEND_MESSAGES: false
  //})
  message.reply(`\`Muted tag revoked permissions\``)
};

/*
enabled, guildOnly, aliases, permission level
*/
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['setmute', 'mutedroom'],
  permLevel: 3
};

/*
name, desc., usage
name is also the command alias
*/
exports.help = {
  name: 'mutezone',
  description: 'Disables Muted tag from accessing that channel.',
  usage: 'mutezone'
};
