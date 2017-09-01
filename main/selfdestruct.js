const settings = require('../settings.json');
const chalk = require ('chalk');

exports.run = (client, message, params) => {
  if (params[1] === undefined) {
    message.reply("Missing Content!")
    message.delete()
  }
  if (params[0] < 1) {
    message.reply("First argument must be a number!")
    message.author.send("`ERROR: Number Required. Original Message: `" + message.content)
    message.delete()
  }
  const cmdArg = message.content.split(/\s+/g)
  let cLen = cmdArg[1].length + 1;
  let pLen = params[0].length + 1;
  let delaySec = params[0]
  let delayMil = params[0]*1000
  let cut = cLen + pLen
  message.channel.send(message.content.substring(cut, 1024) + "``" + `Self Destruct in ${delaySec} Seconds.` + "``").then(message => {
    setTimeout(() => {
      message.delete()
    }, delayMil)
  })
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['del'],
  permLevel: 1
};

exports.help = {
  name: 'selfdestruct',
  description: 'Creates a self-destructing message. PermLVL 1.',
  usage: 'del <delay in seconds> [message]'
};
