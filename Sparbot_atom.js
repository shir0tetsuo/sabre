////////////////////////////////////////////////////////////////////////////////
// wrapper loading
////////////////////////////////////////////////////////////////////////////////
const settings = require('./settings.json')
const chalk = require ("chalk"); // console chalk system
const Discord = require ("discord.js"); // discord client
const client = new Discord.Client(); // discord client
////////////////////////////////////////////////////////////////////////////////
// application collection
////////////////////////////////////////////////////////////////////////////////
const InvokeSpar = require('./sys/SparComp/sparring.js')
const InvokeHelpMenu = require('./sys/SparComp/help.js')
const ListStatistic = require('./sys/SparComp/liststat.js')
const InvokeTimer = require('./sys/SparComp/countdown.js')
const InvokeBreakPractice = require('./sys/SparComp/barrierbreaker.js')
const InvokeAssist = require('./sys/SparComp/assistance.js')
const PDTools = require('./sys/SparComp/pdmain.js')
const Evaluate = require('./sys/SparComp/backend.js')
////////////////////////////////////////////////////////////////////////////////
// system prefix
////////////////////////////////////////////////////////////////////////////////
var prefix = "?spar"
////////////////////////////////////////////////////////////////////////////////
// login and authentication lines
////////////////////////////////////////////////////////////////////////////////
console.log(chalk.redBright("Spar System Initialization"))
client.login(settings.token_sparbot);
client.on("ready", () => {
  console.log("SPARBOT INITIALIZATION COMPLETE!")
  client.user.setPresence({ game: { name: `?spar`, type: 0}})
  client.user.setStatus("online")
});
////////////////////////////////////////////////////////////////////////////////
// Message-Command Processing is done here
////////////////////////////////////////////////////////////////////////////////
function CleanProcess(message) {
  const mdata = message.content.toLowerCase();
  if (mdata === `${prefix}`) {
    InvokeHelpMenu(message) // data detatched
    return;
  } else if (mdata.startsWith(`${prefix} heal`) || mdata.startsWith(`${prefix} barrier`)) {
    InvokeAssist(message)
    return;
  } else if (mdata.startsWith(`${prefix} breaker`)) {
    InvokeBreakPractice(message) // data detatched
    return;
  } else if (mdata.startsWith(`?ev`)) {
    if (settings.ownerid !== message.author.id) {
      message.reply(`:radioactive: Unauthorized`)
    } else {
      Evaluate(message, client)
    }
    return;
  } else if (mdata.startsWith(`${prefix} stats`)) {
    ListStatistic(message) // data detatched
    return;
  } else if (mdata.startsWith(`${prefix} count`)) {
    if (message.mentions.users.first() !== null && message.mentions.users.first() !== undefined) {
      InvokeTimer(message) // data detatched
    } else {
      message.reply(`Action required: \`Please @mention A user\``)
      return;
    }
    // more else ifs go here
  } else if (mdata.startsWith(`${prefix} pdt`)) {
    PDTools(message);
    return;
  }
  if (message.isMentioned(client.user.id)) {
    InvokeSpar(message) // data detatched
  }
}
////////////////////////////////////////////////////////////////////////////////
// message handler
////////////////////////////////////////////////////////////////////////////////
client.on("message", message => {
  if (message.author.bot) return; // Can't run commands by itself
  if (message === null) return; // No null messages
  if (message.content.length <= 3) return; // Ignore everything less-than 3 characters
  if (message.channel.type === "dm") {
    message.react("👆")
    message.reply(`Written by shadowsword#0179 303309686264954881, please use commands within a server.`)
    return;
  } // Should someone DM the bot
  CleanProcess(message);
})
