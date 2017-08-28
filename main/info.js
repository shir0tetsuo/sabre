const settings = require('../settings.json');
exports.run = (client, message, params) => {
  message.author.send("Sabre was developed primarily by <@!303309686264954881>.")
  message.author.send("Special thanks to Dr Booyah, Nick, Mimystar, Dan, Raymond, Emma, Airborne, Paradise, Tony.")
  message.author.send("Also a thanks to the idiots at AnIdiotsGuide for providing the marvellous Discord.js library and examples.")
  message.author.send("Developed primarily for the Alaska Roblox Discord Server & DAVNET Discord Server! Saying ?night in any context will summon the creator.")
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['devteam', 'i', 'devs'],
  permLevel: 0
};

exports.help = {
  name: 'info',
  description: 'Displays basic info about the Bot.',
  usage: 'info'
};
