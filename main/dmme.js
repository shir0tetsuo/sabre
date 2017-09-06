const sql = require("sqlite");
sql.open("../score.sqlite");
const settings = require('../settings.json');
const chalk = require ('chalk');
let curren = ":tickets:"
let chatBit = ":eye_in_speech_bubble:"

exports.run = (client, message, params) => {
  if (!params[0]) return message.author.send(`${message.author}, some text is required with this command!`)
  let state = `= ${message.member.displayName} is currently unavailable! =`
  let msg = message
  message.delete()
  msg.channel.send("```asciidoc\n" + `${state}\n\n${params.join(' ')} :: This message expires in 5 minutes.` + "```").then(message => {
    setTimeout(() => {
      message.delete()
    }, 300000) // 5 minutes
  })
}; // May add ASYNC for texts involving username

/*
enabled, guildOnly, aliases, permission level
*/
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['afk'],
  permLevel: 2
};

/*
name, desc., usage
name is also the command alias
*/
exports.help = {
  name: 'dmme',
  description: 'Displays a message that states you are AFK/unavailable.',
  usage: 'dmme [reason]'
};
