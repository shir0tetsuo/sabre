const settings = require('../settings.json');
const chalk = require ('chalk');
exports.run = (client, message, params) => {
//  message.reply(`**[D̗̬ͅo̳n̤̲̫͈̝̣a͎̥t̩͕̖e̜̱](${settings.donation})**\n.\nI'll try to be consistent.`)
  message.channel.send({embed: {
    color: 0x0070BA,
    timestamp: new Date(),
    description: "`This message will self-destruct in 1 minute.`",
    author: {
      name: "Hello, " + message.member.displayName,
      icon_url: message.author.avatarURL
    },
    fields: [
      {
        name: "```Thankyou for considering a donation```",
        value: `[D̗̬ͅo̳n̤̲̫͈̝̣a͎̥t̩͕̖e̜̱](${settings.donation})`
      },
      {
        name: "```Help me build an awesome bot thing```",
        value: `${message.member.displayName}, I couldn't of done this\nwithout the help of the discord.js community.\nCurrently, Sabre extends out to __**${client.users.size}**__ users.\nDonators may receive cool benefits in future updates.\n**v${settings.version}**`
      }
    ]
  }}).then(message => {
    setTimeout(() => {
      message.delete()
    }, 60000) // 1 minute
  })
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['support'],
  permLevel: 1
};

exports.help = {
  name: 'donate',
  description: 'Post in announcements room if any as Sabre.',
  usage: 'donate'
};
