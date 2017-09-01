const settings = require('../settings.json');
const chalk = require ('chalk');

function StringGen(length, chars) {
    var mask = '';
    if (chars.indexOf('A') > -1) mask += 'ABCDEF';
    if (chars.indexOf('#') > -1) mask += '0123456789';
    var result = '';
    for (var i = length; i > 0; --i) result += mask[Math.floor(Math.random() * mask.length)];
    return result;
}

exports.run = (client, message, params) => {
  let marker = StringGen(5, 'A#')
  message.channel.send("__**``" + `MARKER: ${marker}` + "``**__")
  console.log(chalk.blueBright(message.guild.name, message.channel.name), chalk.greenBright(marker), new Date(), message.member.displayName)
  message.delete();
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['mark'],
  permLevel: 1
};

exports.help = {
  name: 'marker',
  description: 'Creates a chat marker to search later. PermLVL 1.',
  usage: 'marker'
};
