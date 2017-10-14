// ctrl-p = find a file

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

////////////////////////////////////////////////////////////////////////////////
// Define User Attack Messages
////////////////////////////////////////////////////////////////////////////////
const atkM = [
  'attempted to punch it in the face.',
  'attempted to kick it in the face.',
  'attempted to slam the entity.',
  'attempted to elbow in the face.'
]
const specM = [
  // fire
  'casted a fireball.',
  'summoned a heatwave.',
  'invoked magma.',
  // spirit
  'summoned a familiar.',
  'used the power of Death.',
  'casted NightBall.',
  'resurrected the Dead.',
  // wind
  'invoked the power of Wind.',
  'used Shatter Wave.',
  'used Telekinesis.',
  // earth
  'used Earthquake.',
  'summoned Leaf of Time.',
  'used Foresight Destruction.',
  // water
  'summoned Ice Blade.',
  'casted Megafreeze.',
  'invoked a Tsunami.',
  // other
  'used Shadow Sword.',
  'used Death Scythe.',
  'used Deadly Nightshade.',
  'used Epic Pistol.',
  'used Samurai Sword.',
  'used Alien Gun.'
]

////////////////////////////////////////////////////////////////////////////////
// Random, Reset, Valid Actions
////////////////////////////////////////////////////////////////////////////////

function Rand(data) {
  return data[Math.floor(Math.random() * data.length)]
}

function doReset(message) {
  isFighting.delete(message.author.id)
}
//const validActions = Object.keys(basic).concat('special').concat('guard').concat('run');
const validActions = (['atk', 'guard', 'special', 'run'])
const validActionRegex = new RegExp(validActions.join('|'), 'i');
const validActionString = validActions.map(action => `${action}`).join(' || ');

/*

        other symbols
        // http://www.fileformat.info/info/unicode/category/So/list.htm

*/
////////////////////////////////////////////////////////////////////////////////
// Unicode Assets
////////////////////////////////////////////////////////////////////////////////

let qVendor = '\u2324' // ⌤
let qWarp = '\u2398' //  ⎘
let qUser = '\u24C5' // Ⓟ
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

////////////////////////////////////////////////////////////////////////////////
// Vendor Assets
////////////////////////////////////////////////////////////////////////////////

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

////////////////////////////////////////////////////////////////////////////////
// Standard Sabre Transaction Functions
////////////////////////////////////////////////////////////////////////////////

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

////////////////////////////////////////////////////////////////////////////////
// Hyperlevel Sabre Transaction Functions
////////////////////////////////////////////////////////////////////////////////

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

////////////////////////////////////////////////////////////////////////////////
// hlvl to Sidebar Color
////////////////////////////////////////////////////////////////////////////////

function getColor(hl) {
  if (hl.hlvl >= 5) {
    return 0x5FEFBF
  } else if (hl.hlvl >= 0) {
    return 0x34d1a2
  }
}

////////////////////////////////////////////////////////////////////////////////
// Depleted HP Conditions
////////////////////////////////////////////////////////////////////////////////

function isBaseDepleted(baseHP) {
  if (baseHP <= 0) {
    return true;
  } else {
    return false;
  }
}

function isBossDepleted(bossHP) {
  if (bossHP <= 0) {
    return true;
  } else {
    return false;
  }
}

////////////////////////////////////////////////////////////////////////////////
// hlvl to Reward on Boss Fight Win
////////////////////////////////////////////////////////////////////////////////

function generateReward(message, h) {
  var rewardPrint = Math.round(Math.random())
  if (h.hlvl >= 1) {
    if (rewardPrint <= 0.33) {
      var rTk = Math.round(Math.random() * (1000000 - 10000 * h.hlvl) + 10000 * h.hlvl)
      var rewObject = `${rTk} Sabre Tickets`
      scoreUpTicket(message, rTk)
    } else if (rewardPrint <= 0.66) {
      var rBy = Math.round(Math.random() * (1200000 - 5000 * h.hlvl) + 5000 * h.hlvl)
      var rewObject = `${rBy} Bytes`
      scoreUpBits(message, rBy)
    } else if (rewardPrint <= 1) {
      var rewObject = `1 Dark Ticket`
      hSpaceBUpdate(message)
    }
  } else {
    var rewObject = "nothing."
  }
  return `Obtained ${rewObject}`
}

////////////////////////////////////////////////////////////////////////////////
// generate Fight
////////////////////////////////////////////////////////////////////////////////

function fight(message, uid, boss, bossHP, h, baseHP) {
  //console.log(message.content, uid, boss, bossHP, h, baseHP)


  // Invoke Await
  message.channel.send(`**${message.member.displayName} (${message.author.username}#${message.author.discriminator})**,\n type \`${validActionString}\` to continue.`)
  message.channel.awaitMessages(response => response.author.id === uid && validActions.some(word => response.content.toLowerCase().startsWith(word)), {
      max: 1,
      time: 60000,
      errors: ['time'],
    })

    // Use Collected Data
    .then(collected => {
      const msg = collected.first();
      const input = msg.content.toLowerCase();

      ////////////////////////////////////////////////////////////////////////////
      // NPC DATA
      ////////////////////////////////////////////////////////////////////////////

      // Accuracy increases as hlvl increases
      var npcAccuracy = 59 + h.hlvl,

        // Load Player's HP to Memory
        oldPHP = baseHP;

      // Keep NPC's Accuracy within Acceptable Parameters
      if (npcAccuracy >= 95) {
        var npcMaxAccuracy = 95
      } else {
        var npcMaxAccuracy = npcAccuracy;
      }

      // Calculate NPC's Accuracy
      var npcHitChance = Math.round(Math.random() * 100);

      ////////////////////////////////////////////////////////////////////////////////
      // NPC Accuracy Failure, Generate NPC Message (GNPCM)
      if (npcHitChance >= npcMaxAccuracy) {
        var npcMessage = `\`\`\`diff\n--- ${boss} Missed!\`\`\``

        // NPC Accuracy Success
      } else {
        // NPC Damage Calculation
        var npcDamage = Math.round(Math.random() * (h.hlvl * 750 - h.hlvl * 300) + h.hlvl * 300)

        // Lower Player's HP
        baseHP -= npcDamage;

        // Generate NPC Message (GNPCM)
        var npcMessage = `\`\`\`diff\n- ${msg.author.username} was Damaged (${oldPHP} -> ${baseHP})\`\`\``
      }
      ////////////////////////////////////////////////////////////////////////////////

      ////////////////////////////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////////////////////////
      // PLAYER'S MOVE
      // ATK Floor, higher the accuracy, lower the chance
      ////////////////////////////////////////////////////////////////////////////////
      // atk
      if (input === 'atk') {

        // Define content handling.
        var sendContent = '';

        // Player used Object
        sendContent += `**${msg.author.username}** ${Rand(atkM)}\n`

        // Calculate Player Accuracy and Chance
        var atkAccuracy = 0.25,
          atkHitChance = Math.round(Math.random());

        // Player Accuracy Failure, Generate Player Message (GPM)
        if (atkHitChance >= atkAccuracy) {
          var atkMessage = `\`\`\`diff\n--- ${msg.author.username} Missed!\`\`\``

          // Player Accuracy Success
        } else {
          // Load NPC's HP to Memory
          var oldHP = bossHP;

          // Calculate Player's Damage
          var atkDamage = Math.round(Math.random() * (h.hlvl * 900 - h.hlvl * 455) + h.hlvl * 455)

          // Decrease Boss HP
          bossHP -= atkDamage;

          // Generate Player Message (GPM)
          var atkMessage = `\`\`\`diff\n+ ${boss} was Damaged (${oldHP} -> ${bossHP})\`\`\``
        }

        // Munge GNPCM + GPM
        sendContent += `${atkMessage}`
        sendContent += `${npcMessage}\n`

        //////////////////////////////////////////////////////////////////////////
        // Someone Died
        if (isBaseDepleted(baseHP) === true || isBossDepleted(bossHP) === true) {
          // Invoke Reset
          doReset(message);
          if (isBaseDepleted(baseHP) === true) {
            sendContent += `\`\`\`diff\n- You died.\`\`\``
          }
          if (isBossDepleted(bossHP) === true) {
            var rewardObject = generateReward(msg, h)
            sendContent += `\`\`\`diff\n! ${rewardObject}\`\`\``
          }
          // Return Compiled Data
          return msg.channel.send(`${sendContent}`);
        }
        //////////////////////////////////////////////////////////////////////////

        // Submit Compiled Data
        msg.channel.send(`${sendContent}`)

        // Continue Processing
        fight(message, uid, boss, bossHP, h, baseHP)
        return;

        ////////////////////////////////////////////////////////////////////////////////
        // special atk
      } else if (input === 'special') {

        // Define content handling.
        var sendContent = '';

        // Player used Special Object
        sendContent = `**${msg.author.username}** ${Rand(specM)}\n`

        // Calculate Player Accuracy and Chance
        var atkAccuracy = 0.35,
          atkHitChance = Math.round(Math.random());

        // Player Accuracy Failure, Generate Player Message (GPM)
        if (atkHitChance >= atkAccuracy) {
          var atkMessage = `\`\`\`diff\n--- ${msg.author.username} Missed!\`\`\``

          // Player Accuracy Success
        } else {
          // Load NPC's HP to Memory
          var oldHP = bossHP;

          // Calculate Player's Damage
          var atkDamage = Math.round(Math.random() * (h.hlvl * 1200 - h.hlvl * 525) + h.hlvl * 525)

          // Decrease Boss HP
          bossHP -= atkDamage;

          // Generate Player Message (GPM)
          var atkMessage = `\`\`\`diff\n+ ${boss} was Damaged (${oldHP} -> ${bossHP})\`\`\``
        }

        // Munge GPCM + GPM
        sendContent += `${atkMessage}`
        sendContent += `${npcMessage}\n`

        //////////////////////////////////////////////////////////////////////////
        // Someone Died
        if (isBaseDepleted(baseHP) === true || isBossDepleted(bossHP) === true) {
          // Invoke Reset
          doReset(message);
          if (isBaseDepleted(baseHP) === true) {
            sendContent += `\`\`\`diff\n- You died.\`\`\``
          }
          if (isBossDepleted(bossHP) === true) {
            var rewardObject = generateReward(msg, h)
            sendContent += `\`\`\`diff\n! ${rewardObject}\`\`\``
          }
          // Return Compiled Data
          return msg.channel.send(`${sendContent}`);
        }
        //////////////////////////////////////////////////////////////////////////

        // Submit Compiled Data
        msg.channel.send(`${sendContent}`)

        // Continue Processing
        fight(message, uid, boss, bossHP, h, baseHP)
        return;

        ////////////////////////////////////////////////////////////////////////////////
        // Special Moves
        ////////////////////////////////////////////////////////////////////////////////
        // guard
      } else if (input === 'guard') {

        // Define content handling.
        var sendContent = '';
        //console.log('Guarded')

        // PLAYER HEAL on No NPC Damage Defined (Accuracy Failure)
        if (!npcDamage) {
          // Generate NPC Message (GNPCM)
          sendContent += `\`\`\`diff\n+ ${boss}'s attack failed\`\`\``
          // Player HP Heal Calculation
          healCalculation = h.hlvl * 500

          // Append Player's Saved HP
          baseHP += healCalculation

          // Generate Player Message (GPM)
          sendContent += `\`\`\`diff\n+ ${msg.author.username} healed (${oldPHP} + ${healCalculation} -> ${baseHP})\`\`\``

          // PLAYER GETS DAMAGED
        } else {
          // Shave off some NPC Damage
          npcGuarded = Math.round(npcDamage / 8 * 3)
          // Append shaved NPC Damage to Player HP
          baseHP += npcGuarded

          // Generate Player Message (GPM)
          sendContent += `\`\`\`diff\n- ${msg.author.username} was damaged (${oldPHP} -> ${baseHP})\n`
          sendContent += `+ Protected against (${npcGuarded} damage)\`\`\``
        }

        //////////////////////////////////////////////////////////////////////////
        // Somebody Died
        if (isBaseDepleted(baseHP) === true) {
          sendContent += `\`\`\`diff\n- You died.\`\`\``
          // Invoke Reset
          doReset(message);
          // Return Compiled Data
          return msg.channel.send(`${sendContent}`);
        }
        //////////////////////////////////////////////////////////////////////////

        // Submit Compiled Data
        msg.channel.send(`${sendContent}`)

        // Continue Processing
        fight(message, uid, boss, bossHP, h, baseHP)
        return;
        ////////////////////////////////////////////////////////////////////////////////
        // run
      } else if (input === 'run') {
        msg.channel.send(`**${message.member.displayName} (${message.author.username}#${message.author.discriminator})** Ran Away.`)

        doReset(message);
        return;
      }
      /*  message.channel.send(`${sendContent}`)
        fight(message, uid, boss, bossHP, h, baseHP) */

      ////////////////////////////////////////////////////////////////////////////////
      // Player was unable to respond
    }).catch(() => {
      console.error;
      //console.log(message.content, uid, boss, bossHP, h, baseHP)
      message.channel.send(`**${message.author.username}** wasn't able to respond.`);

      doReset(message);
    })
}

////////////////////////////////////////////////////////////////////////////////
// run command
////////////////////////////////////////////////////////////////////////////////

exports.run = (client, message, params) => {

  // reset any vs if any
  doReset(message)

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

    ////////////////////////////////////////////////////////////////////////////
    // User Parameters
    ////////////////////////////////////////////////////////////////////////////
    /*
    if (message.author.id === settings.ownerid && params[0] === 'devmode' && params[1] >= 1) {
      giveKey(message, params[1])
      return message.reply(`\`Done.\``)
    } */

    ////////////////////////////////////////////////////////////////////////////
    // PL4O Developer Force Chance
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
        questColor = getColor(hl);

      //////////////////////////////////////////////////////////////////////////
      // Define content handling.
      let content = '';
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

      */
      // Begin: hlvl0 Randomness
      ////////////////////////////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////////////////////////
      if (hl.hlvl >= 0) {
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
          content += `/* A Boss wants to Fight! ${fisheye} *\n`
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
          content += `/* ${vert}${lightshadeFill}${lightshadeFill}${fisheye}${lightshadeFill}${darkshade}${lightshade}${vert} *\n`
          var legend = `* You are in danger!\n`
          legend += `< You have the following options.\n`
          /*

                  Invoke some battle here.

          */
          //  legend += `atk || guard || special || run`

          legend += `${validActionString}`
          console.log(chalk.redBright(`${message.member.displayName} in ${message.channel.name}, ${message.guild.name}; Picked a Fight.`))
          fight(message, message.author.id, fisheye, 4000, h, 8000); // message, boss, bossHP
          legend += ` >\n`
        } else if (chance >= 80) {
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
      }
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
  usage: 'quest\nPL4O :: quest devmode [num] = give keys\nPL4O :: quest force [0-100] = Force Chance.'
};
