const settings = require('../settings.json');
exports.run = (client, message, params) => {
  if (params[0] === undefined) return message.reply("You need something to vote on!")
  msg = message
  message.delete()
  msg.channel.send(`${msg.author} opened a Vote: ` + msg.content.substring(7,1000)).then(function (msg) {
    msg.react("👍");
    msg.react("👎");
  })
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['VOTE'],
  permLevel: 2
};

exports.help = {
  name: 'vote',
  description: 'Displays your message in Vote format.',
  usage: 'vote [message]'
};
