const settings = require('../settings.json');
const chalk = require('chalk');

function Package(guild, user) {
  var securitybotChannel = guild.channels.find('name', 'security-bot');
  if (securitybotChannel !== undefined && securitybotChannel !== null) {
    securitybotChannel.send({embed: {
      color: 0xA3F700,
      timestamp: new Date(),
      fields: [
        { //member.user.username
          name: member.user.tag + " (" + member.displayName + ")",
          value: "Joined the server."
        }
      ]
    }})
  } else {
    guild.createChannel('security-bot', 'text').then(ch => {
      ch.overwritePermissions(guild.roles.find("name", "Sabre"), {
        READ_MESSAGES: true,
        SEND_MESSAGES: true,
        READ_MESSAGE_HISTORY: true,
        MENTION_EVERYONE: true,
        ADD_REACTIONS: true,
        MANAGE_ROLES_OR_PERMISSIONS: true,
        ATTACH_FILES: true
      })
      ch.overwritePermissions(guild.id, {
        READ_MESSAGES: false,
        READ_MESSAGE_HISTORY: false,
        SEND_MESSAGES: false
      }).then(() => {
        ch.send({embed: {
          color: 0xA3F700,
          timestamp: new Date(),
          fields: [
            { //member.user.username
              name: member.user.tag + " (" + member.displayName + ")",
              value: "Joined the server."
            }
          ]
        }})
      })
    })
  }

}

module.exports = (guild, user) => {
  console.log(new Date());
  console.log(chalk.bgWhite.black(`${user.username} was BANNED from ${guild.name}.`))
  Package(guild, user)
};
