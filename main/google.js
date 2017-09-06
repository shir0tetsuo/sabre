const sql = require("sqlite");
sql.open("../score.sqlite");
const settings = require('../settings.json');
const chalk = require ('chalk');
let curren = ":tickets:"
let chatBit = ":eye_in_speech_bubble:"

exports.run = (client, message, params) => {
  if (!params[0]) return message.author.send(`${message.author}, some text is required with this command!`)
  let search = params.join('+')
  let appearance = params.join(' ')
  let link = `https://www.google.ca/search?q=${search}`
  //message.channel.send(`[Let's Google ${appearance}](${link})`)
  message.channel.send({embed: {
    color: 0x36B236,
    timestamp: new Date(),
    author: {
      name: client.user.username,
      icon_url: client.user.avatarURL
    },
    fields: [
      {
        name: "Need help?",
        value: `[Let's Google ${appearance}](${link})`
      }
    ]
  }})
};

/*
enabled, guildOnly, aliases, permission level
*/
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['ggl'],
  permLevel: 2
};

/*
name, desc., usage
name is also the command alias
*/
exports.help = {
  name: 'google',
  description: 'Generates a quick link for a Google search.',
  usage: 'google [something to search]'
};
