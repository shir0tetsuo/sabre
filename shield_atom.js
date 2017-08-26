////////////////////////////////////////////////////////////////////////////////
// SHIELD - Special Haul Invoking Extremely Lewd Dialogue
const settings = require('./settings.json')
const chalk = require ("chalk"); // console chalk system
const Discord = require ("discord.js"); // discord client
const client = new Discord.Client(); // discord client
const fs = require("fs"); // filesystem r/w enabled
console.log(chalk.redBright("System Initialization"))

client.login(settings.token_shield);

function Keyscore(mess) {
  if (mess.guild.channels === null) return;
  const database = ["bomb", "Bomb", "BOMB", "fineprint", "Fineprint", "FINEPRINT", "nemesis", "Nemesis", "NEMESIS", "t pyramid", "Pyramid", "PYRAMID", "platform 2", "Platform 2", "PLATFORM 2", "t sentinel", "Sentinel", "SENTINEL", "t sapphire", "Sapphire", "SAPPHIRE", "t floyd", "FLOYD", "jonut", "Jonut", "JONUT", "special projects", "Special Projects", "SPECIAL PR", "white o", "White O", "WHITE O", "White O", "silencer", "Silencer", "SILENCER", "S1", "s1", "t python", "Python", "PYTHON", "nuke", "Nuke", "NUKE", "nuclear", "Nuclear", "NUCLEAR", "launch codes", "Launch codes", "Launch Codes", "LAUNCH C", "LAUNCH c", "DEEE", "n00", "N00", "NOCTUA", "noctua", "Noctua", "CSD", "csd", "doi", "DOI", "DoI", "classified", "Classified", "CLASSIFIED", "AMBA", "amba", "Amba", "silenced", "SILENCED", "Silenced", "Deen", "deen", "DEEN", "testwarn", "david", "David", "DAVID", "allah", "Alla", "ALLA", "riot", "Riot", "RIOT", "Not My", "NOT M", "not m", "not M", "protest", "Protest", "PROTEST", "pyramid", "sentinel", "sapphire", "Floyd", "terror", "Terror", "TERROR", "python", "satellite", "Satellite", "SATELLITE", "hack", "Hack", "HACK", "explo", "Explo", "EXPLO"]
  if (database.some(word => mess.content.includes(word))) {
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
    message.reply("`CLASSIFIED//SECRET` A project by shadowsword#0179 (NightDelSol)")
  }
  Keyscore(message);
})
