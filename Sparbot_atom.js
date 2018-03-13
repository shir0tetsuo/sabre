const settings = require('./settings.json')
const chalk = require ("chalk"); // console chalk system
const Discord = require ("discord.js"); // discord client
const client = new Discord.Client(); // discord client

console.log(chalk.redBright("Spar System Initialization"))

var mach = "Autonomous Sparring Mechanism"

var HLPText = ``;
HLPText += `SparCompanion is an ${mach}. *Sparring by definition is to make the motions of boxing without landing heavy blows, as a form of training.*\n`
HLPText += `__**Warning**__\n`
HLPText += `The usage of this bot is **intended for individuals knowledged in how to move their Astral Body / Spirit / Soul.**\n`
HLPText += `Upon **tagging this bot,** the system will respond with a series of questions pretaining to the difficulty of the training.\n`
HLPText += `Once each question is responded, **A magickally automated entity will come forth for such training.** Here are the **absolute conditions.**\n`
HLPText += `:one: If oblitherated before the time limit expires, another entity will spawn into existence and continue.\n`
HLPText += `:two: This bot will never hit critically that permanently damages the invoker.\n`
HLPText += `:three: If the invoker is unable to continue, the bot will cease to be despite the remaining limit.\n`
HLPText += `:four: Upon the expiry of the time limit, the entity will completely dematerialize, and a healing Ki ball is sent to the invoker.\n`
HLPText += `:five: If for some reason service is interrupted, such as a restart, expiry conditions will apply.\n`
HLPText += `**Questions:** Time Limit, Defense, Speed, Attack, Intelligence.`

var DLText = `\n`;
DLText += `:one: The ${mach} will have **no barriers.**\n`
DLText += `:two: The ${mach} will have a **Class I Barrier** capable of defending against basic psychic attacks.\n`
DLText += `:three: The ${mach} will have a **Class II Barrier** capable of defending against light attacks.\n`
DLText += `:four: The ${mach} will have a **Class III Barrier** capable of defending against strong attacks.\n`
DLText += `:five: The ${mach} will have a **Class III Barrier** and **Regenerative Capability** for maximum difficulty.\n`

var SPDText = `\n`;
SPDText += `:one: The ${mach} will stay as **still as a tree.**\n`
SPDText += `:two: The ${mach} will **walk around somewhat casually.**\n`
SPDText += `:three: The ${mach} will **run around.**\n`
SPDText += `:four: The ${mach} will **sprint like Jackie Chan on drugs.**\n`
SPDText += `:five: The ${mach} will be capable of **flash-stepping.** Good luck.\n`

var ATKText = `\n`;
ATKText += `:one: The ${mach} **cannot attack.**\n`
ATKText += `:two: The ${mach} **hits with a long toilet paper roll.**\n`
ATKText += `:three: The ${mach} **hits with greater force.** Like Jackie Chan.\n`
ATKText += `:four: The ${mach} **materializes close-range weaponry.** Hold onto your drink, bucko.\n`
ATKText += `:five: The ${mach} **can use long-range attacks (like elements) in moderation.** Kinda like Super Saiyan Goku.\n`
ATKText += `:six: The ${mach} **uses close and long range attacks, elemental attacks, and kinesis.** All that, and it still won't kill you (but it'll hurt... a lot.)`

var INTText = `\n`;
INTText += `:one: The ${mach} **is dumbfounded.** It probably can't dodge anything, and really has no idea what it's doing (but still follows guidelines). It might hit you with shear luck.\n`
INTText += `:two: The ${mach} **posesses average intelligence.** A smarter and more patient cookie. It can dodge stuff, just don't expect it to do math.\n`
INTText += `:three: The ${mach} **is a master of its domain.** A slightly dumber Whis.\n`
INTText += `:four: The ${mach} **is like facing a Jedi Master.** Oh, and it can now use flight and illusions. Seriously, get out your lucky rabbit's foot.`

function InvokeSpar(message){
  message.reply(`Please state a time limit between 1-10 minutes.`)

  message.reply(`Please state the level of defense. ${DLText}`)

  message.reply(`Please state the level of speed. ${SPDText}`)

  message.reply(`Please state the level of attack. ${ATKText}`)

  message.reply(`Please state the level of intelligence. ${INTText}`)
}

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
    message.reply("Written by shadowsword#0179")
    return;
  }
  if (message.content === "?spar") {
    message.reply(`${HLPText}`)
    return;
  }
  if (message.isMentioned(client.user.id)) {
    InvokeSpar(message)
  }
})
