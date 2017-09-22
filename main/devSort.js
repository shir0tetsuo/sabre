const sql = require("sqlite");
sql.open("../score.sqlite");
const settings = require('../settings.json');
const chalk = require ('chalk');
let curren = ":tickets:"
let chatBit = ":eye_in_speech_bubble:"

function afterloop(output) {
  message.channel.send(`${output}`, {code:'asciidoc'})
}

exports.run = async(client, message, params) => {
  sql.get(`SELECT * FROM scores WHERE userId = "${message.author.id}"`).then(row => {
    if (!row) return message.reply(`\`FATAL-ERROR\``)
    if (row.level >= 9000) {
      sql.get(`SELECT * FROM scores ORDER BY userId DESC, level DESC`).then(dat => {
        var output = '';
        output += `__\`TOP 10 SABRE USERS\`__`
        for (i = 0; i > 10; d = dat.userId, l = dat.level, i++) {
          output += `${d[i]} :: ${l[i]}`
        }
        afterloop(output);
      })
    } else {
      message.reply(`\`FATAL-ERROR\` You aren't level 9000, silly!`)
    }
  })
};

/*
enabled, guildOnly, aliases, permission level
*/
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['ds'],
  permLevel: 4
};

/*
name, desc., usage
name is also the command alias
*/
exports.help = {
  name: 'devSort',
  description: 'Prototype Command of Mystery.',
  usage: 'devSort'
};
