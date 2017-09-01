const settings = require('../settings.json');
const Discord = require ("discord.js");
exports.run = (client, message, params) => {
  message.channel.send({ embed: {
    color: 0x009DC4,
    timestamp: new Date(),
    description: `Sabre v${settings.version}`
    author: {
      name: client.user.username,
      icon_url: message.author.avatarURL
    },
    fields: [
      {
        name: `\u200b`,
        value: `:minidisc: Memory Usage: **${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB.**\n:tropical_fish: Users: **${client.users.size}**\n:satellite: Servers: **${client.guilds.size}**\n:biohazard: Channels: **${client.channels.size}**\n:gear: Node: ${process.version}`
      }
    ]
  }})
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['stat'],
  permLevel: 0
};

exports.help = {
  name: 'stats',
  description: 'Displays statistical data on the Bot.',
  usage: 'stats'
};
