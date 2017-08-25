const settings = require('../settings.json')
const chalk = require('chalk');
module.exports = member => {
  console.log(new Date());
  console.log(chalk.bgYellow.black(`${member.user.tag} ${member.displayName} Left ${member.guild.name}.`))
  let guild = member.guild;
  if (guild.id === settings.davnetguild) {
    //let davnet_gmA = guild.channels.find('name', 'security-bot')
    guild.channels.find('name', 'security-bot').send({embed: {
      color: 0xA7A7A5,
      timestamp: new Date(),
      fields: [
        { //member.user.username
          name: member.user.tag + " (" + member.displayName + ")",
          value: "Parted the server."
        }
      ]
    }})
  } else if (guild.id === settings.alaskaguild) {
    //let alaska = guild.channels.get(settings.alaskachanclassified)
    //let alaska_gmA = guild.channels.find('name', 'classified')
    guild.channels.find('name', 'classified').send({embed: {
      color: 0xA7A7A5,
      timestamp: new Date(),
      fields: [
        { //member.user.username
          name: member.user.tag + " (" + member.displayName + ")",
          value: "Parted the server."
        }
      ]
    }})
  } else {
    guild.defaultChannel.send(`Please say goodbye to ${member.user.username} we will miss you!`);
  }
};
