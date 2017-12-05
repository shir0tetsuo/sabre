
const settings = require('../settings.json');
const chalk = require('chalk');
module.exports = (guild, user) => {
  console.log(new Date());
  console.log(chalk.bgWhite.black(`${user.username} was BANNED from ${guild.name}.`))
  if (guild.id === settings.alaskaguild) {
    guild.channels.find('name', 'classified').send({embed: {
      color: 0xFFA500,
      timestamp: new Date(),
      fields: [
        { //member.user.username
          name: user.tag,
          value: "Was just banned!"
        }
      ]
    }})
  } else if (guild.id === settings.davnetguild) {
    guild.channels.find('name', 'security-bot').send({embed: {
      color: 0xFFA500,
      timestamp: new Date(),
      fields: [
        { //member.user.username
          name: user.tag,
          value: "Was just banned!"
        }
      ]
    }})
  } else {
    if (guild.defaultChannel === undefined || !guild.defaultChannel) return;
    guild.defaultChannel.send(`${user.username} was just banned!`);
  }
};
