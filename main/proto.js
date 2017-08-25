const settings = require('../settings.json');
const chalk = require ('chalk');
exports.run = (client, message, params) => {
  if (!params[0]) return;
  console.log(chalk.yellow(message.member.displayName, message.content), chalk.blueBright(message.guild.name, message.channel.name));
  message.reply("`Access Granted` System logged snowflake for object.");
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['prototype'],
  permLevel: 4
};

exports.help = {
  name: 'prototype',
  description: 'Displays the mentioned object as a snowflake.',
  usage: 'prototype [mention]'
};
