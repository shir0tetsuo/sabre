const settings = require('./settings.json')
const chalk = require ("chalk"); // console chalk system
const Discord = require ("discord.js"); // discord client
const client = new Discord.Client(); // discord client

const InvokeSpar = require('./sys/SparComp/sparring.js')
const InvokeBreakPractice = require('./sys/SparComp/sparring.js')

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
