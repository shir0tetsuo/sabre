// ctrl-p = find a file
const sql = require("sqlite");
sql.open("../score.sqlite");
const settings = require('../settings.json');
const chalk = require ('chalk');
let curren = ":tickets:"
let chatBit = ":eye_in_speech_bubble:"

function hSpaceAUpdate(m) {
  setTimeout(() => {
    sql.get(`SELECT * FROM hyperlevels WHERE userId = "${m.author.id}"`).then(hl => {
      if (!hl) {
        return message.reply(`\`Internal Error\``)
      } else {
        sql.run(`UPDATE hyperlevels SET spaceA = "${hl.spaceA*1 + 1*1}" WHERE userId = "${m.author.id}"`)
        console.log(chalk.greenBright(`${m.member.displayName} in ${m.channel.name}, ${m.guild.name}; +1 Key`))
      }
    })
  }, 2000)
}

exports.run = (client, message, params) => {
  sql.get(`SELECT * FROM hyperlevels WHERE userId = "${message.author.id}"`).then(hl => {
    if (!hl) {
      return message.reply(`\`ERROR\` HyperLevel requirement not met`)
    }
    // Set hyperlevel requirement here (hl.hlvl >= int)
    if (hl.hlvl !== 0) {
      const cMath = Math.round(Math.random() * (2000 - 100) + 100); // return number between 100-2000
      if (cMath >= 800) {
        var cName = 'Obtained 1 :key2:',
          cVal = `You can use the \`${settings.prefix}quest\` command with this key.`
        hSpaceAUpdate(message);
      } else {
        var cName = 'Sorry',
          cVal = 'Nothing Obtained.'
      }
      message.channel.send({embed: {
        color: 0x4fe63b,
        timestamp: new Date(),
        author: {
          name: message.member.displayName,
          icon_url: message.author.avatarURL
        },
        fields: [
          {
            name: `${cName}`,
            value: `${cVal}`
          }
        ]
      }})
    /*  message.reply(`\`Rolling!\``)
      .then(m => {
        setTimeout(() => {
          m.edit(`\`Almost There!\``)
            .then(m => {
              const cMath = Math.round(Math.random() * (2000 - 100) + 100) // return number between 100-2000
              if (cMath >= 1800) {
                var cName = 'Obtained 1 :key2:',
                  cVal = `You can use the \`${settings.prefix}quest\` command with this key.`
                hSpaceAUpdate(message);
              } else {
                var cName = 'Sorry',
                  cVal = 'You didn\'t win anything.'
              }// else ifs
              m.edit
            })
        }, 5000)
      }) */
    } else {
      return message.reply(`\`ERROR\` HyperLevel isn't high enough.`)
    }
  })
};

/*
enabled, guildOnly, aliases, permission level
*/
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['hs'],
  permLevel: 1
};

/*
name, desc., usage
name is also the command alias
*/
exports.help = {
  name: 'hyperslot',
  description: 'Win keys and dark tickets. (HL1)',
  usage: 'hyperslot'
};
