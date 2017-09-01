const settings = require('../settings.json');
const Discord = require ("discord.js");
exports.run = (client, message, params) => {
  message.author.send("Sabre was developed primarily by <@!303309686264954881> (shadowsword#0179) - Version " + settings.version)
  message.author.send("Special thanks to Dr Booyah, Nick, Mimystar, Dan, Raymond, Emma, Airborne, Paradise, Tony.")
  message.author.send("Also a thanks to the idiots at AnIdiotsGuide for providing the marvellous Discord.js library and examples.")
  message.author.send("Developed primarily for the Alaska Roblox Discord Server & DAVNET Discord Server! Saying ?night in any context will summon the creator. A self-delete channel is available by making a room called 'selfdelete'. This is great for having your uber secret conversations. \n``" + `Memory Usage: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB.\nUsers: ${client.users.size}\nServers: ${client.guilds.size}\nChannels: ${client.channels.size}\nDiscord: v${version}\nNode: ${process.version}` + "``")
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['devteam', 'i', 'devs', 'v'],
  permLevel: 0
};

exports.help = {
  name: 'info',
  description: 'Displays basic info about the Bot.',
  usage: 'info'
};
