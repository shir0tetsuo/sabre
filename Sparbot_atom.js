const settings = require('./settings.json')
const chalk = require ("chalk"); // console chalk system
const Discord = require ("discord.js"); // discord client
const client = new Discord.Client(); // discord client

console.log(chalk.redBright("Spar System Initialization"))

client.login(settings.token_sparbot);

client.on("ready", () => {
  console.log("SPARBOT INITIALIZATION COMPLETE!")
  client.user.setStatus("online")
});

client.on("message", message => {
  if (message.author.bot) return;
  if (message === null) return;
  if (message.content.length <= 4) return;
  if (message.channel.type === "dm") {
    message.react("👆")
    message.reply("Written by shadowsword#0179")
    return;
  }
  if (message.isMentioned === true) {
    message.reply(`\`Mentioned Flag True\``)
  }
})
