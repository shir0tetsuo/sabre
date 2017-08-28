const settings = require('../settings.json');
const chalk = require ('chalk');
exports.run = (client, message, params) => {
  // From sabre_atom4
  let permlvl = 0;
  let basic_alaska = message.guild.roles.find('name', settings.basicroleALASKA);
  let basic_davnet = message.guild.roles.find('name', settings.basicroleDAVNET);
  if (basic_alaska && message.member.roles.has(basic_alaska.id)) permlvl = 1;
  if (basic_davnet && message.member.roles.has(basic_davnet.id)) permlvl = 1;
  let mod_role = message.guild.roles.find('name', settings.modrolename);
  let mod_davnet = message.guild.roles.find('name', settings.modrolenameDAVNET);
  if (mod_role && message.member.roles.has(mod_role.id)) permlvl = 2;
  if (mod_davnet && message.member.roles.has(mod_davnet.id)) permlvl = 2;
  let admin_role = message.guild.roles.find('name', settings.adminrolename);
  let admin_davnet = message.guild.roles.find('name', settings.adminrolenameDAVNET);
  if (admin_role && message.member.roles.has(admin_role.id)) permlvl = 3;
  if (admin_davnet && message.member.roles.has(admin_davnet.id)) permlvl = 3;
  if (message.author.id === settings.ownerid) permlvl = 4;
  if (message.author.id === settings.davidid) permlvl = 4;
  if (message.author.id === settings.nickid) permlvl = 4;
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
