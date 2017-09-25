const sql = require("sqlite");
sql.open("../score.sqlite");
const settings = require('../settings.json');
const chalk = require ('chalk');
let curren = ":tickets:"
let chatBit = ":eye_in_speech_bubble:"

function afterloop(message, output) {
  message.channel.send(`${output}`, {code:'asciidoc'})
}

exports.run = async(client, message, params) => {
  sql.get(`SELECT * FROM scores WHERE userId = "${message.author.id}"`).then(row => {
    if (!row) return message.reply(`\`FATAL-ERROR\``)
    if (row.level >= 10) {
      let delayMil = 45000
      let output = '';
      let selfdestruct = `This message self destructs in 45 seconds.`
      if (params[0] === 'l') {
        sql.all(`SELECT * FROM scores ORDER BY level DESC LIMIT 10`).then(data => {
          output += `__**TOP 10 :: LEVEL**__\n\n`
          output += data.map(m => `<@${m.userId}>\`\`\`asciidoc\nLEVEL :: ${m.level}\nTICKETS :: ${m.tickets}\nBYTES :: ${m.chatBits}\`\`\``).join('\n')
          output += `\n${selfdestruct}`
          message.channel.send(`${output}`).then(message => {
            setTimeout(() => {
              message.delete()
            }, delayMil)
          })
        })
      } else if (params[0] === 't') {
        sql.all(`SELECT * FROM scores ORDER BY tickets DESC LIMIT 10`).then(data => {
          output += `__**TOP 10 :: TICKETS**__\n`
          output += data.map(m => `<@${m.userId}>\`\`\`asciidoc\nLEVEL :: ${m.level}\nTICKETS :: ${m.tickets}\nBYTES :: ${m.chatBits}\`\`\``).join('\n')
          output += `\n${selfdestruct}`
          message.channel.send(`${output}`).then(message => {
            setTimeout(() => {
              message.delete()
            }, delayMil)
          })
        })
      } else if (params[0] === 'b') {
        sql.all(`SELECT * FROM scores ORDER BY chatBits DESC LIMIT 10`).then(data => {
          output += `__**TOP 10 :: BYTES**__\n`
          output += data.map(m => `<@${m.userId}>\`\`\`asciidoc\nLEVEL :: ${m.level}\nTICKETS :: ${m.tickets}\nBYTES :: ${m.chatBits}\`\`\``).join('\n')
          output += `\n${selfdestruct}`
          message.channel.send(`${output}`).then(message => {
            setTimeout(() => {
              message.delete()
            }, delayMil)
          })
        })
      } else return message.reply(`\`ERROR\` See Manual`)

      /* sql.get(`SELECT * FROM scores ORDER BY level DESC LIMIT 10`).then(dat => {
        console.log(dat)
        for (i = 0; i > 10; d = dat.userId, l = dat.level, i++) {
          let output = `${d[i]} :: ${l[i]}`
          message.channel.send(`${output}`, {code:'asciidoc'})
        }
      }) */
    } else {
      message.reply(`\`FATAL-ERROR\` You aren't level 10, silly!`)
    }
  })
};

/*
enabled, guildOnly, aliases, permission level
*/
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['sldb', 'ldrb', 'leaderboards'],
  permLevel: 0
};

/*
name, desc., usage
name is also the command alias
*/
exports.help = {
  name: 'leaderboard',
  description: 'Displays Global Sabre Leaderboards. (SL10)',
  usage: 'leaderboard [l/t/b]\nLevel Requirements :: 10'
};
