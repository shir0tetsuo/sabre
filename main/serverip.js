const settings = require('../settings.json');
var exec = require('child_process').exec;
exports.run = (client, message, params) => {
  if (message.author.id === settings.ownerid) {
    exec('curl icanhazip.com',
      function(error, stdout, stderr) {
        message.author.send(stdout)
      })
  } else {
    message.reply("`ERROR` You are not the Owner!")
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['sip', 'serverip'],
  permLevel: 4
};

exports.help = {
  name: 'serverIP',
  description: 'Displays the Server IP. OWNER ONLY!',
  usage: 'serverIP'
};
