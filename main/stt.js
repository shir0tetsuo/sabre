const sql = require("sqlite");
sql.open("../score.sqlite");
const settings = require('../settings.json');
const chalk = require ('chalk');
let curren = ":tickets:"
let chatBit = ":eye_in_speech_bubble:"

exports.run = (client, message, params) => {
  //console.log(client.user)
  if (message.mentions.members.first() !== undefined) {
    //console.log(message.mentions.members.first())
    //console.log(message.mentions.members.first().user)
    //console.log(message.mentions.members.first().user.discriminator)
    console.log(message.guild.members)
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['xdev'],
  permLevel: 4
};

exports.help = {
  name: 'stt',
  description: '\'Send To Terminal\' Logs some stuff to the console.',
  usage: 'stt [stuff]'
};
