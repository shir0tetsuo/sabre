const settings = require('../settings.json');
const chalk = require ('chalk');
exports.run = (client, message, params) => {
  // From sabre_atom4
  const permlvl = client.elevation(message)
  // EoF sabre_atom4
  console.log(new Date())
  console.log(chalk.greenBright(message.member.displayName), chalk.yellow(message.content), chalk.blueBright(message.guild.name, message.channel.name));
  console.log(chalk.yellow("System returned permission level:"), chalk.redBright(permlvl))
  message.author.send(`Permission Level: ${permlvl}`)
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['plv', 'permlevel'],
  permLevel: 0
};

exports.help = {
  name: 'plvl',
  description: 'Displays your command permission level.',
  usage: 'plvl'
};
