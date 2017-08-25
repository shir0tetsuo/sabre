const chalk = require('chalk');
module.exports = member => {
  console.log(new Date());
  console.log(chalk.bgGreen(`${member.user.tag} ${member.displayName} Joined ${member.guild.name}.`))
  let guild = member.guild;
  guild.defaultChannel.send(`Please welcome ${member.user.username} to the server!`);
};
