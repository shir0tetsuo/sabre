const Discord = require('discord.js');
require('../settings.json')
const chalk = require('chalk');
module.exports = (guild, user) => {
  console.log(new Date());
  console.log(chalk.bgWhite.black(`${user.username} was UNBANNED from ${guild.name}.`))
  if (guild.id === settings.davnetguild) {
    guild.channels.find('name', 'security-bot').send({embed: {
      color: 0xFFFF00,
      timestamp: new Date(),
      fields: [
        { //member.user.username
          name: user.tag,
          value: "Was just unbanned!"
        }
      ]
    }})
  } else if (guild.id === settings.alaskaguild) {
    guild.channels.find('name', 'classified').send({embed: {
      color: 0xFFFF00,
      timestamp: new Date(),
      fields: [
        { //member.user.username
          name: user.tag,
          value: "Was just unbanned!"
        }
      ]
    }})
  } else {
    guild.defaultChannel.send(`${user.tag} was just unbanned!`);
  }
};
