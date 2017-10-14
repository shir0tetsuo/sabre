// ctrl-p = find a file
const sql = require("sqlite");
sql.open("../score.sqlite");
const settings = require('../settings.json');
const chalk = require('chalk');
let curren = ":tickets:"
let chatBit = ":eye_in_speech_bubble:"
let hkey = ":key2:"
let isFighting = new Set();

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
function isBaseDepleted(message, baseHP) {
  if (baseHP <= 0) {
    message.reply(`Some lose message.`)
    doReset(message);
    return;
  }
}
function isBossDepleted(message, bossHP) {
  if (bossHP <= 0) {
    message.reply(`Some win message.`)
    doReset(message);
    return;
  }
}

function fight(message, uid, boss, bossHP, h, baseHP) {
  console.log(message.content, uid, boss, bossHP, h, baseHP)
  /*if (!isFighting.has(message.author.id)) {
    doReset(message);

    return;
  }*/
  message.channel.send(`**${message.member.displayName} (${message.author.username}#${message.author.discriminator})**, type \`${validActionString}\` to continue.`)
  message.channel.awaitMessages(response => response.author.id === uid && validActions.some(word => response.content.toLowerCase().startsWith(word)), {
    max: 1,
    time: 60000,
    errors: ['time'],
  }).then(collected => {
    const msg = collected.first();
    const input = msg.content.toLowerCase();

    // var sendContent = '';
    /*
    if (input === 'atk' || input === 'special') {
      if (input === 'atk') {
        const messages = [
          'attempted to punch it in the face.',
          'attempted to kick it in the face.',
          'attempted to slam the entity.',
          'attempted to elbow it in the face.'
        ]
        var attackChance = 0.75,
          min = 500.0,
          max = 900.0;
      } else if (input === 'special') {
        const messages = [
          'casted a fireball.',
          'summoned a heatwave.',
          'invoked magma.',
          'summoned a familiar.',
          'used the power of Death.',
          'casted NightBall.',
          'resurrected the Dead.',
          'invoked the power of Wind.',
          'used Shatter Wave.',
          'used Telekinesis.',
          'used Earthquake.',
          'summoned Leaf of Time.',
          'used Foresight Destruction.',
          'summoned Ice Blade.',
          'casted Megafreeze.',
          'invoked a Tsunami.',
          'used Shadow Sword.',
          'used Death Scythe.',
          'used Deadly Nightshade.',
          'used Epic Pistol.',
          'used Samurai Sword.',
          'used Alien Gun.'
        ]
        var attackChance = 0.65,
          min = 525.0,
          max = 1200.0;
      } else {
        fight(message, uid, boss, bossHP, h, baseHP)
        return;
      }

      if (Math.random() > attackChance) {
        sendContent += `\`\`\`diff\n- ${message.author.username} missed.\`\`\``
      } else {
        const damage = Math.round(Math.random() * (max - min) + min);

        var oldHP = bossHP;
        bossHP -= damage;

        sendContent += `**${message.member.displayName} (${message.author.username}#${message.author.discriminator})** ${Rand(messages)}\n`
        sendContent += `\`\`\`diff\n+ ${boss} took damage. (${oldHP} -> ${bossHP})\`\`\`\n`
      }

      sendContent += `It's ${boss}'s move.\n`
      // boss turn
      var oldPHP = baseHP;
      const misschance = Math.round(Math.random() * 100)
      const missminimum = Math.round(h.hlvl + 65)
      if (missminimum >= misschance) {
        sendContent += `\`\`\`diff\n--- ${boss} missed.\`\`\``
      } else {
        const npcmax = Math.round(Math.random() * (h.hlvl * 750))
        const npcmin = Math.round(Math.random() * (h.hlvl * 100))
        const npcdamage = Math.round(Math.random() * (npcmax - npcmin) + npcmin)

        baseHP -= npcdamage;
        sendContent += `\`\`\`diff\n- ${message.author.username}#${message.author.discriminator} took damage. (${oldPHP} -> ${baseHP})\`\`\``
      }

      message.channel.send(`${sendContent}`)

      if (baseHP <= 0) {
        // LOSS DATA GOES HERE!
        sendContent += `\`\`\`asciidoc\nYou died! :: Lost X\`\`\``
        doReset(message);
        return;
      }
      if (bossHP <= 0) {
        sendContent += `\`\`\`asciidoc\nYou defeated ${boss} :: Gained X\`\`\``
        doReset(message);
        return;
      }

      // loop again after turn
      fight(message, uid, boss, bossHP, h, baseHP)
      return;
    } */

  //  var npcAccuracy = 74 + h.hlvl,
    //  npcHitChance = Math.floor(Math.random() * (100 - npcAccuracy));

// NPC Floor
  if (!baseHP) var baseHP = 8000;
    var npcAccuracy = 74 + h.hlvl,
      oldPHP = baseHP;
    if (npcAccuracy >= 100) {
      var npcMaxAccuracy = 100
    } else {
      var npcMaxAccuracy = npcAccuracy;
    }
    var npcHitChance = Math.round(Math.random() * 100);

    if (npcHitChance >= npcMaxAccuracy) {
      var npcMessage = `\`\`\`diff\n--- ${boss} Missed!\`\`\``
    } else {
      var npcDamage = Math.round(Math.random() * (h.lvl*750 - h.hlvl*300) + h.hlvl*300)
      baseHP -= npcDamage*1;
      var npcMessage = `\`\`\`diff\n- ${msg.author.username} was Damaged (${oldPHP} -> ${baseHP})\`\`\``
    }

// ATK Floor
    if (input === 'atk') {
      var sendContent = '';

      sendContent += `${npcMessage}`
      msg.channel.send(`${sendContent}`)
      isBaseDepleted(msg, baseHP)
      isBossDepleted(msg, bossHP)
      fight(message, uid, boss, bossHP, h, baseHP)
      return;
    } else if (input === 'special') {
      var sendContent = '';

      sendContent += `${npcMessage}`
      msg.channel.send(`${sendContent}`)
      isBaseDepleted(msg, baseHP)
      isBossDepleted(msg, bossHP)
      fight(message, uid, boss, bossHP, h, baseHP)
      return;
    } else if (input === 'guard') {
      var sendContent = '';
      console.log('Guarded')

      msg.channel.send(`${sendContent}`)
      isBaseDepleted(msg, baseHP)
      fight(message, uid, boss, bossHP, h, baseHP)
      return;
    } else if (input === 'run') {
      msg.channel.send(`**${message.member.displayName} (${message.author.username}#${message.author.discriminator})** Ran Away.`)

      doReset(message);
      return;
    }
    /*  message.channel.send(`${sendContent}`)
      fight(message, uid, boss, bossHP, h, baseHP) */
  }).catch(() => {
    console.error;
    console.log(message.content, uid, boss, bossHP, h, baseHP)
    message.channel.send(`**${message.author.username}** wasn't able to respond.`);

    doReset(message);
  })
}

exports.run = (client, message, params) => {
  doReset(message)
  sql.get(`SELECT * FROM hyperlevels WHERE userId = "${message.author.id}"`).then(hl => {
    if (!hl) {
      return message.reply(`\`ERROR\` HyperLevel requirement not met`)
    }
    var h = hl;
    if (message.author.id === settings.ownerid && params[0] === 'devmode' && params[1] >= 1) {
      giveKey(message, params[1])
      return message.reply(`\`Done.\``)
    }
    if (params[0] === "force" && params[1] !== 0 && message.author.id === settings.ownerid) {
      var chance = params[1]
      console.log(chalk.redBright(`${message.member.displayName} in ${message.channel.name}, ${message.guild.name}; Developer Mode (${chance})`))
    } else {
      var chance = Math.floor(Math.random() * 100)
      console.log(chalk.redBright(`${message.member.displayName} in ${message.channel.name}, ${message.guild.name}; (${chance})`))
    }
    //console.log(chance)
    // Set hyperlevel requirement here (hl.hlvl >= int)
    if (hl.spaceA * 1 >= 1) {
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
          fight(message, message.author.id, fisheye, 3000, h, 8000); // message, boss, bossHP
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
      content += `/* ${qUser} = ${message.author.username}#${message.author.discriminator} *\n`


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
