const settings = require('../settings.json');
const chalk = require ('chalk');
exports.run = (client, message, params) => {
  const permlvl = client.elevation(message)
  if (params[0] === null || params[1] === null) return message.reply("`ERROR` See Manual!")
  if (params[0].toLowerCase() === "green") {
    var slCol = 0x96E000
  } else if (params[0].toLowerCase() === "red") {
    var slCol = 0xAB0000
  } else if (params[0].toLowerCase() === "yellow") {
    var slCol = 0xFFED48
  } else if (params[0].toLowerCase() === "blue") {
    var slCol = 0x0049C0
  } else if (params[0].toLowerCase() === "purple") {
    var slCol = 0x844F9B
  } else return message.reply("`ERROR` See Manual!")
  if (message.mentions.members.first() !== undefined) {
    var sliced = params.slice(2)
    let person = message.mentions.members.first()
    var authName = person.displayName
    var authIcon = person.avatarURL
  } else {
    var sliced = params.slice(1)
    var authName = message.member.displayName
    var authIcon = message.author.avatarURL
  }
  let msg = message // ADD REACTS!
  message.delete()
  data = sliced.join(' ').substring(0, 1024)
  msg.channel.send({ embed: {
    color: slCol,
    timestamp: new Date(),
    footer: {
      text: msg.member.displayName, // client.user.username
      icon_url: msg.author.avatarURL // client.user.avatarURL
    },
    author: {
      name: authName,
      icon_url: authIcon
    },
    fields: [
      {
        name: `:large_orange_diamond: Achievement Unlocked!`,
        value: `${data}`
      }
    ]
  }}).then(m => {
    if (permlvl >= 3) {
      m.pin()
    }
  })
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['ACHIEVEMENT'],
  permLevel: 1
};

exports.help = {
  name: 'achievement',
  description: 'Give someone a cookie today.',
  usage: 'achievement [blue/yellow/red/green/purple] [text]'
};
