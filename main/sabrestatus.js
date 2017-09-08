const settings = require('../settings.json');
const chalk = require('chalk');
exports.run = (client, message, params) => {
  if (!params[0]) return;
  const detail = message.content.split(/\s+/g);
  if (detail[1] === "online" || detail[1] === "idle" || detail[1] === "dnd" || detail[1] === "invisible") {
    client.user.setStatus(`${detail[1]}`)
    message.reply("`Access Granted` Sabre's Status was Updated.")
    console.log(new Date())
    console.log(chalk.greenBright(message.member.displayName), chalk.yellow(message.content), chalk.blueBright(message.guild.name, message.channel.name));
    console.log(chalk.yellow("Sabre's Status changed."))
  } else if (detail[1] === "game") {
    client.user.setPresence({ game: { name: `${message.content.split(' ').slice(2).join(' ').substring(0, 128)}`, type: 0}})
    message.reply("`Access Granted` Sabre's Presence was Updated.")
    console.log(new Date())
    console.log(chalk.greenBright(message.member.displayName), chalk.yellow(message.content), chalk.blueBright(message.guild.name, message.channel.name));
    console.log(chalk.yellow("Sabre's Game Status changed."))
  } else if (detail[1] === "reset") {
    client.user.setPresence({ game: { name: `With ${client.guilds.size} Servers. v${settings.version}`, type: 0}})
    client.user.setStatus("dnd")
    message.reply("`Access Granted` Sabre's Presence was reset.")
    console.log(new Date())
    console.log(chalk.greenBright(message.member.displayName), chalk.yellow(message.content), chalk.blueBright(message.guild.name, message.channel.name));
    console.log(chalk.yellow("Sabre's Status was reset."))
  } else {
    message.reply("`Access Denied` The argument was not understood.")
  };
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['saberstatus', 'sst'],
  permLevel: 4
};

exports.help = {
  name: 'sabrestatus',
  description: 'Changes Sabre\'s Status.',
  usage: 'sabrestatus [game/online/reset/dnd/idle/invisible] [game-message]'
};
