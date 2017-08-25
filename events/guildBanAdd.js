const settings = require('../settings.json');
const chalk = require('chalk');
module.exports = (guild, user, member) => {
  console.log(chalk.bgWhite.black(`${member.user.tag} ${member.displayName} was BANNED from ${member.guild.name}.`))
  if (guild.id === settings.alaskaguild) {
    guild.channels.find('name', 'classified').send({embed: {
      color: 0xFFA500,
      timestamp: new Date(),
      fields: [
        { //member.user.username
          name: member.user.tag + " (" + member.displayName + ")",
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
          name: member.user.tag + " (" + member.displayName + ")",
          value: "Was just banned!"
        }
      ]
    }})
  } else {
    guild.defaultChannel.send(`${user.username} was just banned!`);
  }
};
