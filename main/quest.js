// ctrl-p = find a file
const sql = require("sqlite");
sql.open("../score.sqlite");
const settings = require('../settings.json');
const chalk = require ('chalk');
let curren = ":tickets:"
let chatBit = ":eye_in_speech_bubble:"
let hkey = ":key2:"

function getKey(m, keys) {
  if (!keys) var keys = 1;
  setTimeout(() => {
    sql.get(`SELECT * FROM hyperlevels WHERE userId = "${m.author.id}"`).then(hl => {
      sql.run(`UPDATE hyperlevels SET spaceA = "${hl.spaceA*1 - keys*1}" WHERE userId = "${m.author.id}"`)
    })
  }, 2000)
}
function giveKey(m, keys) {
  if (!keys) var keys = 1;
  setTimeout(() => {
    sql.get(`SELECT * FROM hyperlevels WHERE userId = "${m.author.id}"`).then(hl => {
      sql.run(`UPDATE hyperlevels SET spaceA = "${hl.spaceA*1 + keys*1}" WHERE userId = "${m.author.id}"`)
    })
  }, 2000)
}

function getColor(hl) {
  if (hl.hlvl >= 5) {
    return 0x5FEFBF
  } else if (hl.hlvl >= 0) {
    return 0x34d1a2
  }
}
function map(hl) {
  let data = '';
  if (hl.lvl >= 0) {
    data += `> /////////////`
    data += `> //   \u233e\u2324    //`
    data += `> /////////////`
  }
  return data;
}

exports.run = (client, message, params) => {
  sql.get(`SELECT * FROM hyperlevels WHERE userId = "${message.author.id}"`).then(hl => {
    if (!hl) {
      return message.reply(`\`ERROR\` HyperLevel requirement not met`)
    }
    if (message.author.id === settings.ownerid && params[0] === 'devmode' && params[1] >= 1) {
      giveKey(message, params[1])
      return message.reply(`\`Done.\``)
    }
    // Set hyperlevel requirement here (hl.hlvl >= int)
    // http://www.fileformat.info/info/unicode/category/So/list.htm
    if (hl.spaceA*1 >= 1) {
      var header = '```md',
        footer = '```',
        questColor = getColor(hl);
      let content = '';
      content += `/* ${message.member.displayName} *\n`
      content += `< You spent 1 Quest Key >\n`
      content += `> HLVL: ${hl.hlvl}, HQKY: ${hl.spaceA*1 - 1}, HDTK: ${hl.spaceB}.\n\n`
      content += `${map(hl)}\n`


      message.reply({embed: {
        color: questColor,
        timestamp: new Date(),
        author: {
          name: `${client.user.username}'s Forest`,
          icon_url: client.user.avatarURL
        },
        footer: {
          text: `${message.author.username}#${message.author.discriminator}`
        },
        fields: [
          {
            name: `-1 ${hkey}: You seek adventures in the Dark Forest.`,
            value: `${header}\n${content}\n${footer}`
          }
        ]
      }})
      getKey(message, 1);
    } else {
      return message.reply(`\`ERROR\` You don't have any keys.`)
    }
  })
};

/*
enabled, guildOnly, aliases, permission level
*/
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['q'],
  permLevel: 1
};

/*
name, desc., usage
name is also the command alias
*/
exports.help = {
  name: 'quest',
  description: 'Let Sabre\'s Forest take you away. (HK1)',
  usage: 'quest\nPL4O :: quest devmode [num] = give keys'
};
