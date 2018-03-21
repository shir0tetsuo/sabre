const settings = require('./settings.json')
const chalk = require ("chalk"); // console chalk system
const Discord = require ("discord.js"); // discord client
const client = new Discord.Client(); // discord client

const InvokeSpar = require('./sys/SparComp/sparring.js')
const InvokeBreakPractice = require('./sys/SparComp/breaker.js')

// Added tally system
const sql = require("sqlite");
sql.open("../score.sqlite");

////////////////////////////////////////////////////////////////////////////////
// Version number and recursive text
var asmv = "1.4.0" // Version Number
var prefix = "?spar"
var RTe = "Reply time expired."
var mach = "Autonomous Sparring Mechanism"

console.log(chalk.redBright("Spar System Initialization"))

////////////////////////////////////////////////////////////////////////////////
// Recursive help menu
var opts = `\`${prefix}\`\n\`${prefix} count\`\n\`${prefix} v\`\n\`${prefix} heal\`\n\`${prefix} barrier\`\n\`${prefix} breaker\`\n\`${prefix} stats\`\n\`${prefix} help\``

////////////////////////////////////////////////////////////////////////////////
// Invoke Texts

var BKDef = `\n`;
BKDef += `:one: The ${mach} spawns **3 Barriers.**\n`
BKDef += `:two: The ${mach} spawns **10 Barriers.**\n`
BKDef += `:three: The ${mach} spawns **20 Barriers.**\n`
BKDef += `:four: The ${mach} spawns **50 Barriers.**\n`
BKDef += `:five: The ${mach} spawns **100 Barriers.**\n`
BKDef += `:six: The ${mach} spawns **200 Barriers.**\n`
BKDef += `\`\`\`md\n[!]: All these barriers are Class III.\nThe level of difficulty increases with each barrier and attempts to match the user's strength.\`\`\``

////////////////////////////////////////////////////////////////////////////////
function ListStatistic(message) {
  sql.get(`SELECT * FROM SparComp WHERE userid = "masterstat"`).then(m => {
    if (!m) {
      message.reply(`\`Error\` The database hasn't been initialized yet.`)
      return;
    } else {
      var MasterStat = m.record;
      sql.get(`SELECT * FROM SparComp WHERE userId = "${message.author.id}"`).then(scs => {
        let StateMRecord = `:exclamation: There are __${MasterStat}__ matches recorded.`
        if (!scs) {
          message.reply(`${StateMRecord}\n\`The system could not find a statistic for you.\``)
        } else {
          message.reply(`${StateMRecord}\n\`You have ..\`__\`${scs.record}\`__\`, Recorded Matches.\``)
        }
      })
    }
  })
}

////////////////////////////////////////////////////////////////////////////////
function InvokeTimer(message){
  let opponent = message.mentions.users.first();
  if (opponent.id === message.author.id) {
    message.reply(`You're really going to fight *yourself?*`)
    return;
  } else if (opponent.bot) {
    message.reply(`Bot users cannot be mentioned for this type of command.`)
    return;
  }
      message.channel.send(`${message.author}\n:crossed_swords::vs::crossed_swords:\n${opponent}, \n:three:`)
      setTimeout(() => {
        message.channel.send(`:two:`)
        setTimeout(() => {
          message.channel.send(`:one:`)
          setTimeout(() => {
            message.channel.send(`:regional_indicator_g::regional_indicator_o: `)
          }, 2000)
        }, 2000)
      }, 2000)
  }

////////////////////////////////////////////////////////////////////////////////
function InvokeBreakPractice(message){
  const ActSix = (['1', '2', '3', '4', '5', '6'])
  const ActTen = (['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'])

  message.reply(`Please state a time limit between 1-10 minutes.`)
  message.channel.awaitMessages(BK => BK.author.id === message.author.id && ActTen.some(word => BK.content.startsWith(word)), {
    max: 1,
    time: 60000,
    errors: ['time'],
  })
  .then(FinishedTime => {
    LimitQuery = FinishedTime.first().content;
    if (LimitQuery === "1") {
      var limiter = 60000
    } else if (LimitQuery === "2") {
      var limiter = 120000
    } else if (LimitQuery === "3") {
      var limiter = 180000
    } else if (LimitQuery === "4") {
      var limiter = 240000
    } else if (LimitQuery === "5") {
      var limiter = 300000
    } else if (LimitQuery === "6") {
      var limiter = 360000
    } else if (LimitQuery === "7") {
      var limiter = 420000
    } else if (LimitQuery === "8") {
      var limiter = 480000
    } else if (LimitQuery === "9") {
      var limiter = 540000
    } else if (LimitQuery === "10") {
      var limiter = 600000
    } else {
      message.reply(`\`Internal Error\``)
      return;
    }
    message.reply(`Please state the level of defense. ${BKDef}`)
    message.channel.awaitMessages(BD => BD.author.id === message.author.id && ActSix.some(word => BD.content.startsWith(word)), {
      max: 1,
      time: 60000,
      errors: ['time'],
    })
    .then(() => {
      message.reply(`**Your barrier-breaking practice has initiated!** They have been placed ahead of you, each a meter apart. Good luck.`)
      setTimeout(() => {
        message.reply(`**Expiry!** Barrier practice has ended.`)
      }, limiter)
    })
    .catch(() => {
      console.error;
      console.log(`${mach} BREAK BARR`)
      message.reply(`${RTe}`)
    })
  })
  .catch(() => {
    console.error;
    console.log(`${mach} BREAK TIMER (BREAKER)`)
    message.reply(`${RTe}`)
  })
}

////////////////////////////////////////////////////////////////////////////////
// Login lines and message listeners
client.login(settings.token_sparbot);

client.on("ready", () => {
  console.log("SPARBOT INITIALIZATION COMPLETE!")
  client.user.setPresence({ game: { name: `?spar`, type: 0}})
  client.user.setStatus("online")
});

client.on("message", message => {
  if (message.author.bot) return;
  if (message === null) return;
  if (message.content.length <= 3) return;
  if (message.channel.type === "dm") {
    message.react("👆")
    message.reply(`Written by shadowsword#0179\n${opts}`)
    return;
  }
  if (message.content === `${prefix}`) {
    message.reply(`${HLPText}`)
    return;
  } else if (message.content.startsWith(`${prefix} v`)) {
    message.reply(`SparCompanion ASM v${asmv}`)
    return;
  } else if (message.content.startsWith(`${prefix} heal`)) {
    message.reply(`**Four Ki-balls have been dispatched to assist you.** This does not work while a match is in progress.`)
    return;
  } else if (message.content.startsWith(`${prefix} barrier`)) {
    message.reply(`**A Class III Barrier surrounds you.** This does not work while a match is in progress.\nThe barrier will dematerialize if there are no threats detected.`)
    return;
  } else if (message.content.startsWith(`${prefix} breaker`)) {
    InvokeBreakPractice(message)
    return;
  } else if (message.content.startsWith(`${prefix} help`)) {
    message.reply(`${opts}`)
    return;
  } else if (message.content.startsWith(`${prefix} stats`)) {
    ListStatistic(message)
    return;
  } else if (message.content.startsWith(`${prefix} count`)) {
    if (message.mentions.users.first() !== null && message.mentions.users.first() !== undefined) {
      InvokeTimer(message)
    } else {
      message.reply(`Action required: \`Please @mention A user\``)
      return;
    }
  }
  if (message.isMentioned(client.user.id)) {
    InvokeSpar(message)
  }
})
