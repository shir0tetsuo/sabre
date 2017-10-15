// ctrl-p = find a file


const Rand = require('../sys/quest-data/random.js')
const Transaction = require('../sys/quest-data/transaction.js')
const NPC = require('../sys/quest-data/NPCData.js')
const PLY = require('../sys/quest-data/PlayerData.js')
const Reward = require('../sys/quest-data/reward.js')
const fight = require('../sys/quest-data/fight.js')
const MAP = require('../sys/quest-data/set_map.json')
const generateForest = require('../sys/quest-data/dungeon.js')

////////////////////////////////////////////////////////////////////////////////
// Plugin Assets
////////////////////////////////////////////////////////////////////////////////

const sql = require("sqlite");
sql.open("../score.sqlite");
const settings = require('../settings.json');
const chalk = require('chalk');
let curren = ":tickets:"
let chatBit = ":eye_in_speech_bubble:"
let hkey = ":key2:"
let isFighting = new Set();

//const validActions = Object.keys(basic).concat('special').concat('guard').concat('run');
const validActions = PLY('NULL', 'validActions', isFighting)
const validActionRegex = PLY('NULL', 'validActionRegex', isFighting)
const validActionString = PLY('NULL', 'validActionString', isFighting)
qUser = '\u24C5' // Ⓟ
/*
let qVendor = '\u2324' // ⌤
let qWarp = '\u2398' //  ⎘

let qKey = '\u26BF'
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
*/
exports.run = (client, message, params) => {
  // reset any vs if any
  PLY(message, 'reset', isFighting)
  ////////////////////////////////////////////////////////////////////////////////
  // Load Hyperlevel Data to Memory
  sql.get(`SELECT * FROM hyperlevels WHERE userId = "${message.author.id}"`).then(hl => {
    ////////////////////////////////////////////////////////////////////////////
    // User has no Hyperlevel
    if (!hl) {
      return message.reply(`\`ERROR\` HyperLevel requirement not met`)
    }
    ////////////////////////////////////////////////////////////////////////////
    // Condensed row
    var h = hl;

    if (params[0] === "force" && params[1] !== 0 && message.author.id === settings.ownerid) {
      var chance = params[1]
      console.log(chalk.redBright(`${message.member.displayName} in ${message.channel.name}, ${message.guild.name}; Developer Mode (${chance})`))
      // Master Chance
    } else {
      var chance = Math.floor(Math.random() * 100)
      console.log(chalk.redBright(`${message.member.displayName} in ${message.channel.name}, ${message.guild.name}; (${chance})`))
    }

    // Set hyperlevel requirement here (hl.hlvl >= int)
    // spaceA = Quest Keys
    if (hl.spaceA * 1 >= 1) {
      // Invoke Styling Mechanisms
      var header = '```md',
        footer = '```',
        // Call upon Color to Set Sidebar Color
        questColor = PLY(message, 'getColor', isFighting, h);

      //////////////////////////////////////////////////////////////////////////
      // Define content handling.
      var content = '';
      // User Statistics
      content += `/* ${message.member.displayName} *\n`
      content += `< You spent 1 Quest Key >\n`
      content += `> HLVL: ${hl.hlvl}, HQKY: ${hl.spaceA*1 - 1}, HDTK: ${hl.spaceB}.\n\n`
      //////////////////////////////////////////////////////////////////////////
      /*

        Todo:
        - Enemy Database
        - Functionize Map Generation
        - Append Enemy Database to Fight Function
        - Decrease Earnings (Done)
        - Increase NPC Damage (Done)

      */
      // Begin: hlvl0 Randomness
      ////////////////////////////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////////////////////////
      var boss = `${NPC('enemy')}${NPC('ename')}`
      var bossTiny = `${boss.substring(0, 1)}`
      content += `${generateForest(message, boss, bossTiny, h, content)}` // returns content
  /*    if (hl.hlvl >= 0) {
        // define defaults
        let top = `> ${topLeft}${horz}${topRight}`
        let topBoss = `/* ${topLeft}${horz}${horz}${topRight} *`
        let mid = `> ${vert}${lightshadeFill}${lightshade}${lightshadeFill}${vert}`
        let midBoss = `/* ${vert}${lightshadeFill}${lightshade}${lightshadeFill}${lightshade}${vert} *`
        let bot = `> ${botLeft}${horz}${botRight}`
        let botBoss = `/* ${botLeft}${horz}${horz}${botRight} *`
        // munge top half
        if (chance >= 95) {
          content += `[Area](1 :: Dark Chasm ::)\n`

          content += `/* A Boss wants to Fight! ${boss} *\n`
          content += `${topBoss}\n${midBoss}\n`
          isFighting.add(message.author.id)
        } else {
          content += `[Area](1 :: Dark Forest ::)\n`
          content += `# Discovered Dark Room\n`
          content += `${top}\n${mid}\n`
        }

        // randomness
        if (chance >= 95) {
          // first boss
          content += `/* ${vert}${lightshadeFill}${medshade}${darkshade}${medshade}${lightshadeFill}${vert} *\n`
          content += `/* ${vert}${lightshadeFill}${lightshadeFill}${boss.substring(0, 1)}${lightshadeFill}${darkshade}${lightshade}${vert} *\n`
          var legend = `* You are in danger!\n`
          legend += `< You have the following options.\n`
          /*

                  Invoke some battle here.


          //  legend += `atk || guard || special || run`

          legend += `${validActionString}`
          console.log(chalk.redBright(`${message.member.displayName} in ${message.channel.name}, ${message.guild.name}; Picked a Fight.`))
          fight(message, message.author.id, boss, 4000, h, 8000, isFighting); // message, boss, bossHP
          legend += ` >\n`
        } else if (chance >= 80) {
          content += `> ${vert}${lightshadeFill}${qVendor}${lightshadeFill}${vert}\n`
          var legend = `< You are greeted by ${qVendor}${PLY(message, 'vendMessageA', isFighting, h)}\n`
          legend += `${PLY(message, 'vendMessageB', isFighting, h)} >\n`
        } else if (chance >= 50) {
          var legend = `< The room was empty. >\n`
        } else if (chance >= 15) {
          content += `${mid}\n`
          content += `> ${vert}${lightshadeFill}${qKey}${lightshadeFill}${vert}\n`
          content += `${mid}\n`
          var legend = `< You found another Quest Key ${qKey} >\n`
          Transaction(message, 'qkey', 1)
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
            Transaction(message, 'tk', tk)
          } else if (mysteryObj >= 2) {
            let bytes = Math.round(Math.random() * (30000 - 256) + 256)
            legend += `< ${mysteriousObject} It was bytes.\n`
            legend += `Obtained ${bytes} bytes. >\n`
            Transaction(message, 'b', bytes)
          } else {
            legend += `< ${mysteriousObject} It was a Dark Ticket.\n`
            legend += `Obtained 1 Dark Ticket. >\n`
            Transaction(message, 'dtk', 1)
          }
        }
        if (chance >= 95) {
          content += `/* ${vert}${darkshade}${lightshadeFill}${qUser}${lightshadeFill}${lightshadeFill}${darkshade}${lightshade}${vert} *\n`
          content += `${midBoss}\n${midBoss}\n${botBoss}\n\n`
          content += `${legend}`
        } else {
          content += `> ${vert}${lightshadeFill}${qUser}${lightshadeFill}${vert}\n`
          // munge bottom half
          content += `${mid}\n${bot}\n\n`
          // what happened
          content += `${legend}`
        }
      } */
      // EOF: hlvl0
      ////////////////////////////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////////////////////////

      // End with stating what symbol the user is.
      content += `/* ${qUser} = ${message.author.username}#${message.author.discriminator} *\n`


      ////////////////////////////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////////////////////////
      // Munge all data and print quest results.
      ////////////////////////////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////////////////////////
      message.reply({
        embed: {
          color: questColor,
          timestamp: new Date(),
          author: {
            name: `${client.user.username}'s Forest`,
            icon_url: client.user.avatarURL
          },
          footer: {
            text: `${message.author.username}#${message.author.discriminator} (v${settings.version})`
          },
          fields: [{
            name: `-1 ${hkey}: You seek adventures in the Dark Forest.`,
            value: `${header}\n${content}\n${footer}`
          }]
        }
      })
      // Key Transaction
      Transaction(message, 'qkey', -1);
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
  usage: 'quest\nPL4O :: quest devmode [num] = give keys\nPL4O :: quest force [0-100] = Force Chance.'
};
