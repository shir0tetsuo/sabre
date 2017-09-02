const settings = require('../settings.json');
const chalk = require ('chalk');
exports.run = (client, message, params) => {
  message.reply(`**[D̗̬ͅo̳n̤̲̫͈̝̣a͎̥t̩͕̖e̜̱](${settings.donation})**\n.\nI'll try to be consistent.`)
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [''],
  permLevel: 1
};

exports.help = {
  name: 'donate',
  description: 'Post in announcements room if any as Sabre. PermLVL 1.',
  usage: 'donate'
};
