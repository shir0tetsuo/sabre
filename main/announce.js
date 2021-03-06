const settings = require('../settings.json');
const chalk = require ('chalk');
exports.run = (client, message, params) => {
  if (params[0] === null) return message.reply("`ERROR` No text detected")
  let annRoomA = message.guild.channels.find('name', 'announce')
  let annRoomB = message.guild.channels.find('name', 'announcements')
  if (annRoomA !== null) {
    annRoomA.send(message.content.substring(7,1024))
    message.reply("`SUCCESS` Check " + annRoomA)
    return;
  } else if (annRoomB !== null) {
    annRoomB.send(message.content.substring(7,1024))
    message.reply("`SUCCESS` Check " + annRoomB)
    return;
  } else {
    message.reply("`ERROR` Apparently there are 2 announcement rooms.")
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['ANNC'],
  permLevel: 3
};

exports.help = {
  name: 'annc',
  description: 'Post in announcements room if any as Sabre.',
  usage: 'annc [message]'
};
