const sql = require("sqlite");
sql.open("../score.sqlite");
const settings = require('../settings.json');
const chalk = require ('chalk');
let curren = ":tickets:"
let chatBit = ":eye_in_speech_bubble:"

exports.run = (client, message, params) => {
  sql.get(`SELECT * FROM hyperlevels WHERE userId = "${message.author.id}"`).then(hl => {
    if (!hl) {
      return message.reply(`\`ERROR\` HyperLevel requirement not met`)
    }
    // Set hyperlevel requirement here (hl.hlvl >= int)
    if (hl.hlvl !== 0) {
      /*

        Command data here

      */
      if (message.mentions.members.first() !== undefined) {
        let zap = '';
        zap += `   X   /xx  XXx\n`
        zap += `    x / Xx XXx\n`
        zap += `     x|xX XX\n`
        zap += `      XX X\n`
        zap += `      -X^\n`
        zap += `     /  Xx\n`
        zap += `     | xX xX\n`
        zap += `    /  Xx  X\n`
        zap += `   /   xX xX\n`
        zap += `    x x XX\n`
        zap += `     x   Xx\n`
        zap += `   ${message.mentions.members.first().displayName}\n`
        zap += `     was just ZAPPED!`
        let lightning = ':cloud_lightning: :cloud_lightning: :cloud_lightning: :cloud_lightning: :cloud_lightning: :cloud_lightning: '
        msg = message;
        message.delete();
        msg.channel.send(`${message.mentions.members.first()}\n${lightning}\`\`\`${zap}\`\`\``)
      }
    } else {
      return message.reply(`\`ERROR\` HyperLevel isn't high enough.`)
    }
  })
};

/*
enabled, guildOnly, aliases, permission level
*/
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['hzap'],
  permLevel: 3
};

/*
name, desc., usage
name is also the command alias
*/
exports.help = {
  name: 'hyperzap',
  description: 'Thunderbolt that kid. (HL1)',
  usage: 'hyperzap [@user]'
};
