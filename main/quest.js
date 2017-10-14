// ctrl-p = find a file
const sql = require("sqlite");
sql.open("../score.sqlite");
const settings = require('../settings.json');
const chalk = require ('chalk');
let curren = ":tickets:"
let chatBit = ":eye_in_speech_bubble:"
let hkey = ":key2:"

function Rand(data) {
  return data[Math.floor(Math.random() * data.length)]
}

/*

        other symbols
        // http://www.fileformat.info/info/unicode/category/So/list.htm

*/
let qVendor = '\u2324' // ⌤
let qWarp = '\u2398' //  ⎘
let qUser = '\u24C5' // Ⓟ
let qKey = '\u2ECF'
let topLeft = '\u2554'
let topRight = '\u2557'
let botLeft = '\u255A'
let botRight = '\u255D'
let horz = '\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550' // 10 spaces
let vert = '\u2551'
let lightshadeFill = '\u2591\u2591\u2591\u2591'
let lightshade = '\u2591'
let medshade = '\u2592'
let darkshade = '\u2593'
let mysteriousObject = '\u25A8'
let fisheye = '\u25C9'

const vendors = [
  'Jerry',
  'Ian',
  'Kevin',
  'Morpheus'
]
const vendorsResponse = [
  '"Keep your head up high. You won\'t find hope lying on the ground."',
  '"I\'m addicted to Sabre help!"',
  '"...oh, Hello."',
  '"Pardon me."',
  '"Read ALL The Words!"'
]

function scoreUpTicket(mess, xval) {
  if (!xval) var xval = 1
  setTimeout(() => {
    sql.get(`SELECT * FROM scores WHERE userId = "${mess.author.id}"`).then(row => {
      sql.run(`UPDATE scores SET tickets = ${row.tickets + xval*1} WHERE userId = ${mess.author.id}`)
      console.log(`${mess.member.displayName} in ${mess.channel.name}, ${mess.guild.name}; + ${xval} Tickets`)
    })
  }, 2000)
}
function scoreUpBits(mess, xval) {
  if (!xval) var xval = 1
  setTimeout(() => {
    sql.get(`SELECT * FROM scores WHERE userId = "${mess.author.id}"`).then(row => {
      sql.run(`UPDATE scores SET chatBits = ${row.chatBits + xval*1} WHERE userId = ${mess.author.id}`)
      console.log(`${mess.member.displayName} in ${mess.channel.name}, ${mess.guild.name}; + ${xval} Bytes`)
    })
  }, 2000)
}

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
function hSpaceBUpdate(m) {
  setTimeout(() => {
    sql.get(`SELECT * FROM hyperlevels WHERE userId = "${m.author.id}"`).then(hl => {
      if (!hl) {
        return message.reply(`\`Internal Error\``)
      } else {
        sql.run(`UPDATE hyperlevels SET spaceB = "${hl.spaceB*1 + 1*1}" WHERE userId = "${m.author.id}"`)
        console.log(chalk.greenBright(`${m.member.displayName} in ${m.channel.name}, ${m.guild.name}; +1 Dark Ticket`))
      }
    })
  }, 2000)
}

function getKey(m, keys) {
  if (!keys) var keys = 1;
  setTimeout(() => {
    sql.get(`SELECT * FROM hyperlevels WHERE userId = "${m.author.id}"`).then(hl => {
      sql.run(`UPDATE hyperlevels SET spaceA = "${hl.spaceA*1 - keys*1}" WHERE userId = "${m.author.id}"`)
      console.log(chalk.blueBright(`${m.member.displayName} in ${m.channel.name}, ${m.guild.name}; -1 Quest Key`))
    })
  }, 2000)
}
function giveKey(m, keys) {
  if (!keys) var keys = 1;
  setTimeout(() => {
    sql.get(`SELECT * FROM hyperlevels WHERE userId = "${m.author.id}"`).then(hl => {
      sql.run(`UPDATE hyperlevels SET spaceA = "${hl.spaceA*1 + keys*1}" WHERE userId = "${m.author.id}"`)
      console.log(chalk.blueBright(`${m.member.displayName} in ${m.channel.name}, ${m.guild.name}; +1 Quest Key`))
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
    if (hl.spaceA*1 >= 1) {
      var header = '```md',
        footer = '```',
        questColor = getColor(hl);
      let content = '';
      content += `/* ${message.member.displayName} *\n`
      content += `< You spent 1 Quest Key >\n`
      content += `> HLVL: ${hl.hlvl}, HQKY: ${hl.spaceA*1 - 1}, HDTK: ${hl.spaceB}.\n\n`

      // map data //////////////////////////////////////////////////////////////
      /*
      if (hl.hlvl >= 0) {
        // define defaults
        let chance = Math.floor(Math.random() * 100)
        let top = `> ${topLeft}${horz}${topRight}`
        let mid = `> ${vert}${lightshadeFill}${lightshade}${lightshadeFill}${vert}`
        let bot = `> ${botLeft}${horz}${botRight}`
        // munge top half
        content += `${top}\n${mid}\n`
        // randomness
        if (chance >= 90) {
          content += `> ${vert}${lightshadeFill}${qVendor}${lightshadeFill}${vert}\n`
          var legend = `< You are greeted by the area vendor ${qVendor} >\n`
        } else if (chance >= 50) {

        } else if (chance >= 20) {

        } else {

        }
        content += `> ${vert}${lightshadeFill}${qUser}${lightshadeFill}${vert}\n`
        // munge bottom half
        content += `${mid}\n${bot}\n\n`
        // what happened
        content += `${legend}`
      }
      */
      if (hl.hlvl >= 0) {
        // define defaults
        let chance = Math.floor(Math.random() * 100)
        let top = `> ${topLeft}${horz}${topRight}`
        let mid = `> ${vert}${lightshadeFill}${lightshade}${lightshadeFill}${vert}`
        let bot = `> ${botLeft}${horz}${botRight}`
        // munge top half
        content += `[Area](1 :: Dark Forest ::)\n`
        content += `# Discovered Dark Room\n`
        content += `${top}\n${mid}\n`
        // randomness
        if (chance >= 90) {
          content += `> ${vert}${lightshadeFill}${qVendor}${lightshadeFill}${vert}\n`
          var legend = `< You are greeted by ${qVendor}${Rand(vendors)}\n`
          legend += `${Rand(vendorsResponse)} >\n`
        } else if (chance >= 50) {
          var legend = `< The room was empty. >\n`
        } else if (chance >= 15) {
          content += `${mid}\n`
          content += `> ${vert}${lightshadeFill}${qKey}${lightshadeFill}${vert}\n`
          content += `${mid}\n`
          var legend = `< You found another Quest Key ${qKey} >\n`
          giveKey(message, 1)
        } else {
          content += `> ${vert}${lightshadeFill}${qWarp}${lightshadeFill}${vert}\n`
          content += `> ${vert}${lightshadeFill}${mysteriousObject}${lightshadeFill}${vert}\n`
          var legend = `# A Warp Gate Appeared ${qWarp}.\n`
          legend += `/* Mysterious Object was discovered ${mysteriousObject}. *\n`
          let mysteryObj = Math.round(Math.random() * 3);
          if (mysteryObj >= 3) {
            let tk = Math.round(Math.random() * (10000 - 100) + 100)
            legend += `< ${mysteriousObject} It was tickets.\n`
            legend += `Obtained ${tk} tickets. >\n`
            scoreUpTicket(message, tk)
          } else if (mysteryObj >= 2) {
            let bytes = Math.round(Math.random() * (30000 - 256) + 256)
            legend += `< ${mysteriousObject} It was bytes.\n`
            legend += `Obtained ${bytes} bytes. >\n`
            scoreUpBits(message, bytes)
          } else {
            legend += `< ${mysteriousObject} It was a Dark Ticket.\n`
            legend += `Obtained 1 Dark Ticket. >\n`
            hSpaceBUpdate(message)
          }
        }
        content += `> ${vert}${lightshadeFill}${qUser}${lightshadeFill}${vert}\n`
        // munge bottom half
        content += `${mid}\n${bot}\n\n`
        // what happened
        content += `${legend}`
      }
      content += `/* ${qUser} = ${message.author.username}#${message.author.discriminator} *\n`


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