const settings = require('../settings.json');
const chalk = require ('chalk');
exports.run = (client, message, params) => {
  if (!params[0]) return;
  log(`${message.author.DisplayName} ran a command with Level ${permlvl} Access.`)
  console.log(chalk.yellow(message.content));
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
