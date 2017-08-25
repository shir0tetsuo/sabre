
exports.run = function(client, message, args) {
  let messagecount = parseInt(args.join(' '));
  message.channel.fetchMessages({
    limit: messagecount
  }).then(messages => message.channel.bulkDelete(messages));
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['wipe', 'delete'],
  permLevel: 3
};

exports.help = {
  name: 'purge',
  description: 'Purges X amount of messages from a given channel. Permission Level 3.',
  usage: 'purge <number>'
};
