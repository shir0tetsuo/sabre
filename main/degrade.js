const sql = require("sqlite");
sql.open("../score.sqlite");
const settings = require('../settings.json');
const chalk = require ('chalk');
let curren = ":tickets:"
let chatBit = ":eye_in_speech_bubble:"

function scoreUpTicket(mess, xval) {
  if (!xval) var xval = 1
  sql.get(`SELECT * FROM scores WHERE userId = "${mess.author.id}"`).then(row => {
    sql.run(`UPDATE scores SET tickets = ${row.tickets + xval*1} WHERE userId = ${mess.author.id}`)
  })
}
function scoreDownTicket(mess, xval) {
  if (!xval) var xval = 1
  console.log(chalk.gray("Lowering ticket score by", xval*1, mess.author.id), mess.author.tag)
  sql.get(`SELECT * FROM scores WHERE userId = "${mess.author.id}"`).then(row => {
    if (row.tickets*1 >= xval*1) {
      sql.run(`UPDATE scores SET tickets = ${row.tickets - xval*1} WHERE userId = ${mess.author.id}`)
    } else {
      sql.run(`UPDATE scores SET tickets = 0 WHERE userId = "${mess.author.id}"`)
    }
  })
}
function scoreUpBits(mess, xval) {
  if (!xval) var xval = 1
  sql.get(`SELECT * FROM scores WHERE userId = "${mess.author.id}"`).then(row => {
    sql.run(`UPDATE scores SET chatBits = ${row.chatBits + xval*1} WHERE userId = ${mess.author.id}`)
  })
}
function scoreDownBits(mess, xval) {
  if (!xval) var xval = 1
  console.log(chalk.gray("Lowering byte score by", xval*1, mess.author.id), mess.author.tag)
  sql.get(`SELECT * FROM scores WHERE userId = "${mess.author.id}"`).then(row => {
    if (row.chatBits*1 >= xval*1) {
      sql.run(`UPDATE scores SET chatBits = ${row.chatBits - xval*1} WHERE userId = ${mess.author.id}`)
    } else {
      sql.run(`UPDATE scores SET chatBits = 0 WHERE userId = ${mess.author.id}`)
    }
  })
}
function Rand(data) {
  // where data is the array
  return data[Math.floor(Math.random() * data.length)]
}
function colorCalc(int) {
  if (int >= 90) return 0xcd3b00
  if (int >= 60) return 0xaa9e04
  if (int >= 25) return 0xfff500
  if (int >= 0) return 0xa7f516
}
function dungeonTx(luck, dnum) {
  let texts = '';
  if (dnum >= 9) {
    texts += 'They go down a dark cave of sorts.\n' // darkness
    if (luck >= 97) {
      texts += 'They brought a flashlight. There was a bunch of diamonds laying around!'
    } else if (luck >= 92) {
      texts += 'They brought a glowstick. There was something shiny. They found a Golden Nugget!'
    } else if (luck >= 85) {
      texts += 'They brought their phone light. There was some sort of unopened box!'
    } else if (luck >= 80) {
      texts += 'They are greeted by fireflies. The crystalline nature of the cave is revealed.'
    } else if (luck >= 70) {
      texts += 'but their friend came up and made them aware of the dangers. He bribes you to turn away.'
    } else if (luck >= 65) {
      texts += '..but the cave was made of glass! The sun rises revealing some goodies.'
    } else if (luck >= 55) {
      texts += 'They keep walking into the darkness, but fall accidentally.'
    } else if (luck >= 50) {
      texts += 'They feel something touch their foot in the darkness.'
    } else if (luck >= 45) {
      texts += 'They glow because of the radiation. It attracts some creepy spiders.'
    } else if (luck >= 40) {
      texts += 'They can\t see. Exiting the cave they see the stars.'
    } else if (luck >= 33) {
      texts += 'They can\'t see.'
    } else if (luck >= 20) {
      texts += 'They step in something slimy. They return and the doctor\'s say it\'s cancerous.'
    } else if (luck >= 15) {
      texts += 'They wake up a bear.'
    } else if (luck >= 10) {
      texts += 'They trip and fall into a darker part of the cave, awakening a dragon.'
    } else {
      texts += 'Suddenly Satan appears. They gaze upon them and are instantly liquified.'
    }
  } else if (dnum >= 8) {
    texts += 'They walked under a Thunder Storm.\n' // lightning
    if (luck >= 95) {
      texts += 'They were struck by lightning! But miraculously was immune to damage! The local townsfolk called them a God.'
    } else if (luck >= 55) {
      texts += 'They get caught in the rain, but suffer no strikes. Successfully crossed through the storm.'
    } else if (luck >= 33) {
      texts += 'They get caught in the rain, and ended up getting drenched. They suffer from a cold.'
    } else {
      texts += '***ZAP***, you smell something burning.'
    }
  } else if (dnum >= 7) {
    texts += 'They decided to go fishing.\n' // water
    if (luck >= 85) {
      texts += 'They catch a legendary fish of the sea.'
    } else if (luck >= 70) {
      texts += 'They end up with many smaller fish to be sold at the market.'
    } else if (luck >= 55) {
      texts += 'They end up with a bunch of shrimp.'
    } else if (luck >= 40) {
      texts += 'A shark approaches. They are stranded at sea for the rest of the day.'
    } else if (luck >= 33) {
      texts += 'Their boat stops working properly. They get a little sunburned.'
    } else {
      texts += 'Posseidon is angry. They are thrown overboard into the sea.'
    }
  } else if (dnum >= 6) {
    texts += 'They just wanted to see the stars at night.\n' // earth
    if (luck >= 98) {
      texts += 'There was a meteor shower. The sky lit up with beauty. You find some tickets on the ground later.'
    } else if (luck >= 90) {
      texts += 'They are greeted by aliens. They appoint you a position of political power to monitor the human species.'
    } else if (luck >= 80) {
      texts += 'Their boss calls. They get a raise.'
    } else if (luck >= 55) {
      texts += 'They see something stuck in the tree.'
    } else if (luck >= 40) {
      texts += 'They go to a bar instead.'
    } else if (luck >= 33) {
      texts += 'A branch falls and hits their head.'
    } else {
      texts += 'An earthquake occurs. Their house gets sunk into the earth.'
    }
  } else if (dnum >= 5) {
    texts += 'They couldn\'t keep their eyes open.\n' // fire
    if (luck >= 95) {
      texts += 'They end up having an amazing dream about a lottery. When they wake up they win something from buying a ticket.'
    } else if (luck >= 40) {
      texts += 'They wake in the middle of the night to a fire. They leave but see their building get destroyed.'
    } else {
      texts += 'Their lungs fill with smoke in the middle of the night as a fire starts.'
    }
  } else if (dnum >= 4) {
    texts += 'They climbed up a steep hill.\n' // wind
    if (luck >= 40) {
      texts += 'At the top of the hill they are greeted by a trader. You exchange some words about buying and selling.'
    } else if (luck >= 20) {
      texts += 'They are blown down the hill, and they drop their wallet. They are greeted by a huge rock.'
    } else {
      texts += 'They are sucked into a tornado upon the horizon, and never heard from again.'
    }
  } else if (dnum >= 3) {
    texts += 'They had a weird dream.\n' // shadow
    if (luck >= 92) {
      texts += 'They dreamt of becoming famous. They look at the newspaper and see their face on the cover.'
    } else if (luck >= 85) {
      texts += 'They dreamt of shooting rainbows out of their eyelids. They make a novel out of it.'
    } else if (luck >= 55) {
      texts += 'They go to the store the next morning and notice a huge sale on everything.'
    } else if (luck >= 39) {
      texts += 'It is of the same haunting nightmare they\'ve had for weeks.'
    } else {
      texts += 'Sabre kidnaps them in their sleep. Who knows what happens next.'
    }
  } else if (dnum >= 2) {
    texts += 'They went on a walk.\n'
    if (luck >= 95) {
      texts += 'They are greeted with fame and fortune; There was a bunch of fans outside paying hundreds for autographs. The paper was a bit expensive.'
    } else if (luck >= 55) {
      texts += 'Nothing overly interesting happens throughout the day. When they get home they open their cheque.'
    } else {
      texts += 'A million ravens come out of nowhere and carry them far, far away.'
    }
  } else {
    texts += 'They get off the phone.\n'
    if (luck >= 92) {
      texts += 'They successfully win a case in court.'
    } else if (luck >= 85) {
      texts += 'Their franchise expands vastly.'
    } else if (luck >= 55) {
      texts += 'They win some more stocks.'
    } else if (luck >= 50) {
      texts += 'It\'s their landlord again. They forgot to pay some bills.'
    } else if (luck >= 40) {
      texts += 'They were sent a bill for the ambulance fee for the last time they ran this command.'
    } else if (luck >= 33) {
      texts += 'They started to throw up violently.'
    } else {
      texts += 'A truck runs them over due to not paying any attention.'
    }
  }
  return texts;
}
////////////////////////////////////////////////////////////////////////////////
// exports.run
////////////////////////////////////////////////////////////////////////////////

exports.run = (client, message, params) => {
  sql.get(`SELECT * FROM scores WHERE userId = "${message.author.id}"`).then(row => {
    if (row.level >= 12 && row.tickets >= 1000) {
      let output = `${message.member.displayName} ran the **D E G R A D E** Command...\n`;
      let dgchance = Math.floor(Math.random() * 100)
      let thePercent = (100 - dgchance*1)
      let dungeonNumber = Math.floor(Math.random() * 10)
      output += `You are the ${thePercent}%.\n`
      embedColor = colorCalc(dgchance);
      let dungeonText = dungeonTx(dgchance, dungeonNumber)
      let damageText = '';
      let dandyText = '';
      if (dgchance >= 80) { // how lucky you were, calcs
        var ticketGain = Math.round(Math.random() * 2500)
        setTimeout(() => {
          scoreUpTicket(message, ticketGain)
        }, 2500)
        damageText += `You were so lucky, you returned with ${ticketGain}${curren}`
        dandyText += `Ain't that swell?`
      } else if (dgchance >= 55) {
        var ticketGain = Math.round(Math.random() * 1500)
        setTimeout(() => {
          scoreUpTicket(message, ticketGain)
        }, 2500)
        damageText += `You were so lucky, you returned with ${ticketGain}${curren}`
        dandyText += `I like this adventure.`
      } else if (dgchance >= 40) { // 40 - 54 non successful
        damageText += `This wasn't really a successful adventure.`
        dandyText += `Could of been worse, right?`
      } else if (dgchance >= 33) {
        var ticketGain = Math.round(Math.random() * 500)
        setTimeout(() => {
          scoreDownTicket(message, ticketGain)
        }, 2500)
        damageText += `You felt like going to the hospital.`
        dandyText += `It costed ${ticketGain}${curren} to get patched up.`
      } else {
        var ticketGain = Math.round(Math.random() * 2000)
        setTimeout(() => {
          scoreDownTicket(message, ticketGain)
        }, 2500)
        damageText += `You have suffered a fatal injury.`
        dandyText += `It costed ${ticketGain}${curren} in funeral expenses.`
      }
      message.channel.send({ embed: {
        color: embedColor,
        timestamp: new Date(),
        author: {
          name: message.member.displayName,
          icon_url: message.author.avatarURL
        },
        description: output,
        fields: [
          {
            name: `${message.member.displayName} is on an adventure.`,
            value: `${dungeonText}`
          },
          {
            name: `${damageText}`,
            value: `${dandyText}`
          }
        ]
      }})
      setTimeout(() => {
        scoreDownTicket(message, 1000)
      }, 2000)
    } else {
      return message.reply("You don't have enough tickets or you are not Level 12!")
    }
  })
};

/*
enabled, guildOnly, aliases, permission level
*/
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['dgrd'],
  permLevel: 1
};

/*
name, desc., usage
name is also the command alias
*/
exports.help = {
  name: 'degrade',
  description: 'Like Russian Roulette, but more intense! (SL12)(1000TK)',
  usage: 'degrade'
};
