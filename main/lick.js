
exports.run = (client, message, params) => {
  if (message.mentions.members.first() === undefined || message.mentions.members.first() === null) return message.reply(`No mention!`);
  if (message.mentions.members.first().displayName === message.member.displayName) return message.reply(`You can't lick yourself! Or can you...`)
  var aids = Math.floor(Math.random() * 100);
  
  if (message.mentions.members.first() !== undefined && aids >=50) {
    message.channel.send(`Oh no! **${message.mentions.members.first().displayName}** has been licked by ${message.author} and was given AIDS. You've been Magic Johnson'd!`);
  } else {
    message.channel.send(`Woah! ${message.author} just tried to lick **${message.mentions.members.first().displayName}** but failed to get rid of the AIDS.`);
  }
};

/*
enabled, guildOnly, aliases, permission level
*/
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['lck'],
  permLevel: 0
};

/*
name, desc., usage
name is also the command alias
*/
exports.help = {
  name: 'lick',
  description: 'Lick someone',
  usage: 'lick <tag someone>'
};
