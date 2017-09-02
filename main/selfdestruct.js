const settings = require('../settings.json');
const chalk = require ('chalk');

exports.run = (client, message, params) => {
  if (params[1] === undefined) {
    message.reply("Missing Content!")
    message.delete()
    return;
  }
  if (params[0] < 1) {
    message.reply("First argument must be a number!")
    message.author.send("`ERROR: Number Required. Original Message: `" + message.content)
    message.delete()
    return;
  }
  const cmdArg = message.content.split(/\s+/g)
  let cLen = cmdArg[0].length + 1;
  let pLen = params[0].length + 1;
  let delaySec = params[0]
  let delayMil = params[0]*1000
  let cut = cLen + pLen
  let mess = message
  message.delete()
  //mess.content.substring(cut, 1024) + " ``" + `Self Destruct in ${delaySec} Seconds.` + "``"
  mess.channel.send({embed: {
    color: 0x992D22,
    timestamp: new Date(),
    author: {
      name: mess.member.displayName,
      icon_url: mess.author.avatarURL
    },
    fields: [
      {
        name: "``" + `Message will Self-Destruct in ${delaySec} Seconds` + "``",
        value: `${mess.content.substring(cut, 1024)}`
      }
    ]
  }}).then(message => {
    setTimeout(() => {
      message.delete()
    }, delayMil)
  })
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['del', 'selfdelete'],
  permLevel: 1
};

exports.help = {
  name: 'selfdestruct',
  description: 'Creates a self-destructing message.',
  usage: 'del <delay in seconds> [message]'
};
