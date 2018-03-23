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
    InvokeBreakPractice(message) // data detatched
    return;
  } else if (message.content.startsWith(`${prefix} stats`)) {
    ListStatistic(message) // data detatched
    return;
  } else if (message.content.startsWith(`${prefix} count`)) {
    if (message.mentions.users.first() !== null && message.mentions.users.first() !== undefined) {
      InvokeTimer(message) // data detatched
    } else {
      message.reply(`Action required: \`Please @mention A user\``)
      return;
    }
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
    message.reply(`Written by shadowsword#0179, please use commands within a server.`)
    return;
  } // Should someone DM the bot
  CleanProcess(message);
})
