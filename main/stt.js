const sql = require("sqlite");
sql.open("../score.sqlite");
const settings = require('../settings.json');
const chalk = require ('chalk');
let curren = ":tickets:"
let chatBit = ":eye_in_speech_bubble:"

exports.run = (client, message, params) => {

  //const millis = new Date().getTime() - message.guild.createdAt.getTime();
  //const days = Math.floor(millis / 1000 / 60 / 60 / 24);
  //console.log(client.user)

  //const jtime = message.member.joinedAt
  //const jtimeDays = Math.floor(jtime / 1000 / 60 / 60 / 24);
  //const millisJoined = new Date().getTime() - message.member.joinedAt.getTime();
  //const daysJoined = millisJoined / 1000 / 60 / 60 / 24;
  //console.log(daysJoined)
  //console.log(message.member.joinedTimestamp)
  //console.log(jtimeDays)
  if (message.mentions.members.first() !== undefined) {
    console.log(message.mentions.members.first())
    console.log(message.mentions.members.first().presence.status)
    //console.log(message.mentions.members.first().joinedTimestamp)
    //console.log(message.mentions.members.first())
    //console.log(message.mentions.members.first().user)
    //console.log(message.mentions.members.first().user.discriminator)
    //console.log(message.guild.members)
    //console.log(`${message.guild.members.filter(m => m.presence.status !== 'offline').size} / ${message.guild.memberCount}`)
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
