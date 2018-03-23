const settings = require('./settings.json')
const chalk = require ("chalk"); // console chalk system
const Discord = require ("discord.js"); // discord client
const client = new Discord.Client(); // discord client

const InvokeSpar = require('./sys/SparComp/sparring.js')
const InvokeHelpMenu = require('./sys/SparComp/help.js')
const ListStatistic = require('./sys/SparComp/liststat.js')
const InvokeTimer = require('./sys/SparComp/countdown.js')
const InvokeBreakPractice = require('./sys/SparComp/barrierbreaker.js')

// Added tally system
const sql = require("sqlite");
sql.open("../score.sqlite");

////////////////////////////////////////////////////////////////////////////////
// Version number and recursive text
//var asmv = "1.4.0" // Version Number
var prefix = "?spar"
var RTe = "Reply time expired."
var mach = "Autonomous Sparring Mechanism"

console.log(chalk.redBright("Spar System Initialization"))


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
    InvokeHelpMenu(message) // data detatched
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
  } else if (message.content.startsWith(`${prefix} stats`)) {
    ListStatistic(message) // data detatched
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
    InvokeSpar(message) // data detatched
  }
})
