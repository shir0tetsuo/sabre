// ctrl-p = find a file
const sql = require("sqlite");
sql.open("../score.sqlite");
const settings = require('../settings.json');
const chalk = require ('chalk');
let curren = ":tickets:"
let chatBit = ":eye_in_speech_bubble:"

function Rand(data) {
  // where data is the array
  return data[Math.floor(Math.random() * data.length)]
}

const mysteryarray = [
  'Oh no! Background radiation affected all these particles!',
  'Out of all probability, two bowls of pteunias spawned into existence..',
  'Captain, we have a problem! The reactor overloaded! Aaah!'
]

function doFunny() {
  return `${Rand(mysteryarray)}`
}

function Cryptographic(xlen) {
  if (!xlen) var xlen = 1
    var charset = "0123456789 XY+-Oo.eE=/Z",
        retVal = "";
    for (var i = 0, n = charset.length; i < xlen; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}


exports.run = (client, message, params) => {
  if (message.mentions.members.first() === undefined || message.mentions.members.first() === null) return message.reply(`No Mentions!`)
  var users = message.mentions.members.map(m => `${m.user.tag} (${m.displayName})`)
  var key1 = Cryptographic(18);
  var key2 = Cryptographic(18);
  var key3 = Cryptographic(18);
  var key4 = Cryptographic(18);
  var uniq = Cryptographic(5);
  var nukk = `:radioactive:\n**\`\`\`diff\n`
  nukk += `- Authorization Required -\n`
  nukk += `- ////////////////////// -\n\n`
  nukk += `-      SYSTEM READY      -\n`
  nukk += `- ////////////////////// -\`\`\`**`
  nukk += `\`\`\`md\n`
  nukk += `[#]: ${key1}\n[#]: ${key2}\n[#]: ${key3}\n[#]: ${key4}\n`
  nukk += `\`\`\`**\`\`\`diff\n`
  nukk += `- Authorization Required -\n`
  nukk += `- ////////////////////// -\n\n`
  nukk += `+      ACCESS GRANTED    +\n`
  nukk += `==========================\n`
  nukk += `+ ${uniq}\n`
  nukk += `+ [${key1}]\n`
  nukk += `+ [${key2}]\n`
  nukk += `+ [${key3}]\n`
  nukk += `+ [${key4}]\`\`\`**`
  message.channel.send(`${nukk}`).then(() => {
    setTimeout(() => {
      message.channel.send(`:radioactive: \n\`\`\`diff\n- Let's smash some particles!\n- Smashing ${users.join(` particle with the `)} particlematron!! Let's see what happened!\`\`\``)
    }, 3000)

    setTimeout(() => {
      var results = doFunny()
      message.channel.send(`\`EXPERIMENT ${key1}\`\n${results}`)
    }, 6000)

  })
};

/*
enabled, guildOnly, aliases, permission level
*/
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['ptc'],
  permLevel: 1
};

/*
name, desc., usage
name is also the command alias
*/
exports.help = {
  name: 'particle',
  description: 'Generates random particle signature.',
  usage: 'particle [@mentions]'
};
