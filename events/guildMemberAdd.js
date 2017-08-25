const settings = require('../settings.json')
const chalk = require('chalk');
module.exports = member => {
  console.log(new Date());
  console.log(chalk.bgGreen.black(`${member.user.tag} ${member.displayName} Joined ${member.guild.name}.`))
  let guild = member.guild;
  if (guild.id === settings.davnetguild) {
    //let davnet_gmA = guild.channels.find('name', 'security-bot')
    guild.channels.find('name', 'security-bot').send({embed: {
      color: 0xA3F700,
      timestamp: new Date(),
      footer: {
        text: client.user.username + ", Server Time"
      },
      fields: [
        { //member.user.username
          name: member.user.tag + " (" + member.displayName + ")",
          value: "Joined the server."
        }
      ]
    }})
  } else if (guild.id === settings.alaskaguild) {
    //let alaska = guild.channels.get(settings.alaskachanclassified)
    //let alaska_gmA = guild.channels.find('name', 'classified')
    guild.channels.find('name', 'classified').send({embed: {
      color: 0xA3F700,
      timestamp: new Date(),
      footer: {
        text: client.user.username + ", Server Time"
      },
      fields: [
        { //member.user.username
          name: member.user.tag + " (" + member.displayName + ")",
          value: "Joined the server."
        }
      ]
    }})
  } else {
    guild.defaultChannel.send(`Please welcome ${member.user.username} to the server!`);
  }
};
