const sql = require("sqlite");
sql.open("../score.sqlite");
const Discord = require ("discord.js");
const settings = require('../settings.json');
const chalk = require ('chalk');
let curren = ":tickets:"
let chatBit = ":eye_in_speech_bubble:"

exports.run = (client, message, params) => {
  if (!params[0]) return message.author.send(`${message.author}, some text is required with this command!`)
  let search = params.join('+')
  let appearance = params.join(' ')
  let link = `https://www.google.com/search?q=${search}`
  let ddglink = `https://duckduckgo.com/?q=${search}`
  //message.channel.send(`[Let's Google ${appearance}](${link})`)
  const embed = new Discord.RichEmbed()
    .setTitle('Search the Web')
    .setAuthor(client.user.username, 'https://i.imgur.com/mmhjYyz.png')
    .setColor(0x36B236)
    .setTimestamp()
    .setThumbnail('https://i.imgur.com/mmhjYyz.png')
    .addField('Need help?', `[Let's Google ${appearance}](${link})`)
    .addField('Google\'s not your cup of tea?', `[Let's DuckDuckGo ${appearance}](${ddglink})`)
    .setFooter('Hope that helps')
    message.channel.send({ embed })
};
// Maybe change this to richEmbed and add Google's logo?
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
