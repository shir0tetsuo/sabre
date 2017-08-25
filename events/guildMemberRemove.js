const chalk = require('chalk');
module.exports = member => {
  console.log(new Date());
  console.log(chalk.bgYellow(`${member.user.tag} ${member.displayName} Left ${member.guild.name}.`))
  let guild = member.guild;
  guild.defaultChannel.send(`Please say goodbye to ${member.user.username} we will miss you!`);
};
