const settings = require('../settings.json');
const chalk = require ('chalk');
exports.run = (client, message, params) => {
  // From sabre_atom4
  let permlvl = 0;
  let mod_role = message.guild.roles.find('name', settings.modrolename);
  if (mod_role && message.member.roles.has(mod_role.id)) permlvl = 2;
  let admin_role = message.guild.roles.find('name', settings.adminrolename);
  if (admin_role && message.member.roles.has(admin_role.id)) permlvl = 3;
  if (message.author.id === settings.ownerid) permlvl = 4;
  // EoF sabre_atom4
  console.log(new Date())
  console.log(chalk.greenBright(message.member.displayName), chalk.yellow(message.content), chalk.blueBright(message.guild.name, message.channel.name));
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
