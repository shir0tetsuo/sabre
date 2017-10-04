////////////////////////////////////////////////////////////////////////////////
// SHIELD - Special Haul Invoking Extremely Lewd Dialogue
// convert to lower case for easier scanning
const settings = require('./settings.json')
const chalk = require ("chalk"); // console chalk system
const Discord = require ("discord.js"); // discord client
const client = new Discord.Client(); // discord client
const fs = require("fs"); // filesystem r/w enabled
console.log(chalk.redBright("System Initialization"))

client.login(settings.token_shield);

function Keyscore(mess) {
  if (mess.guild === null) return;
  const VIP = ["chriz"]
  const currentop = ["kim", "k1m"]
  const milop = ["fiveg", "adr", "coco", "ifailed", "yoloman", "gaming", "nep", "neon", "aulus", "hox"]
  const database = ["bomb", "fineprint", "nemesis", "pyramid", "platform 2", "sentinel", "saphire", "floyd", "jonut", "special pr", "white o", "silencer", "s1", "python", "nuke", "nuclear", "launch c", "deee", "n00", "noctua", "csd", "doi", "classified", "amba", "silenced", "deen", "testwarn", "david", "allah", "riot", "not m", "protest", "terror", "satellite", "hack", "explo"]
  if (VIP.some(word => mess.content.toLowerCase().includes(word))) {
    mess.react("😎")
    const embed = new Discord.RichEmbed()
      .setTitle('SHIELD VIP LOGGING')
      .setColor(0x79a60c)
      .setFooter(mess.channel.name)
      .setTimestamp()
      .addField('VIP Logging Captured Event', `${mess.content}`)
    mess.guild.channels.find('name', 'shield').send({ embed })
  }
  if (currentop.some(word => mess.content.toLowerCase().includes(word))) {
    mess.react("☢")
    const embed = new Discord.RichEmbed()
      .setTitle('SHIELD CURRENT-OPERATIONS')
      //.setAuthor(mess.member.name)
      .setColor(0xD4C750)
      .setFooter(mess.channel.name)
      .setTimestamp()
      .addField('Current-Operations System Logged Event', `${mess.content}`)
    mess.guild.channels.find('name', 'shield').send({ embed })
  }
  if (milop.some(word => mess.content.toLowerCase().includes(word))) {
    mess.react("❗")
    const embed = new Discord.RichEmbed()
      .setTitle('SHIELD MILITARY-OPERATIONS')
      //.setAuthor(mess.member.name)
      .setColor(0xFFAA7A)
      .setFooter(mess.channel.name)
      .setTimestamp()
      .addField('MILITARY-OPERATIONS System Logged Event', `${mess.content}`)
    mess.guild.channels.find('name', 'shield').send({ embed })
  }
  if (database.some(word => mess.content.toLowerCase().includes(word))) {
    mess.react("⚠")
    const embed = new Discord.RichEmbed()
      .setTitle('SHIELD')
      //.setAuthor(mess.member.name)
      .setColor(0xFF3800)
      .setFooter(mess.channel.name)
      .setTimestamp()
      .addField('Keyword Detected by System', `${mess.content}`)
    mess.guild.channels.find('name', 'shield').send({ embed })
  }

}

client.on("ready", () => {
  console.log(chalk.greenBright("SHIELD System Ready\nSHIELD System Ready"))
  // Above no longer works as of Aug 16 Discord update
  // May modify default settings to disinclude server size
  client.user.setPresence({ game: { name: `Overlooking Alaska`, type: 0}})
  client.user.setStatus("online")
});
client.on("message", message => {
  if (message.channel.type === "dm") {
    if (message.author.bot) return;
    message.reply("`CLASSIFIED//SECRET` A project by shadowsword#0179 (NightDelSol) - Special Haul Invoking Lewd Dialogue")
    return;
  }
  Keyscore(message);//
})
