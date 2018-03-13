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
HLPText += `:six: A temporary circular-platform construct is materialized below the contestants during the match.\n`
HLPText += `:seven: The construct is passively repaired as time goes on.\n`
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
  const ActFour = (['1', '2', '3', '4'])
  const ActFive = (['1', '2', '3', '4', '5'])
  const ActSix = (['1', '2', '3', '4', '5', '6'])
  const ActTen = (['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'])

  message.reply(`Please state a time limit between 1-10 minutes.`)
  message.channel.awaitMessages(TL => TL.author.id === message.author.id && ActTen.some(word => TL.content.startsWith(word)), {
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
    message.reply(`Please state the level of defense. ${DLText}`)
    message.channel.awaitMessages(DS => DS.author.id === message.author.id && ActFive.some(word => DS.content.startsWith(word)), {
      max: 1,
      time: 60000,
      errors: ['time'],
    })
    .then(() => {
      message.reply(`Please state the level of speed. ${SPDText}`)
      message.channel.awaitMessages(SS => SS.author.id === message.author.id && ActFive.some(word => SS.content.startsWith(word)), {
        max: 1,
        time: 60000,
        errors: ['time'],
      })
      .then(() => {
        message.reply(`Please state the level of attack. ${ATKText}`)
        message.channel.awaitMessages(AS => AS.author.id === message.author.id && ActSix.some(word => AS.content.startsWith(word)), {
          max: 1,
          time: 60000,
          errors: ['time'],
        })
        .then(() => {
          message.reply(`Please state the level of intelligence. ${INTText}`)
          message.channel.awaitMessages(IS => IS.author.id === message.author.id && ActFour.some(word => IS.content.startsWith(word)), {
            max: 1,
            time: 60000,
            errors: ['time'],
          })
          .then(() => {
            message.reply(`**your sparring specifications have been collected!** Good luck!`)
            setTimeout(() => {
              message.reply(`**Expiry!** The construct and ${mach} has been dematerialized.`)
            }, limiter)
          })
          .catch(() => {
            console.error;
            console.log(`${mach} BREAK IS`)
            message.reply(`Reply time expired.`)
          })
        })
        .catch(() => {
          console.error;
          console.log(`${mach} BREAK AS`)
          message.reply(`Reply time expired.`)
        })
      })
      .catch(() => {
        console.error;
        console.log(`${mach} BREAK SS`)
        message.reply(`Reply time expired.`)
      })
    })
    .catch(() => {
      console.error;
      console.log(`${mach} BREAK DS`)
      message.reply(`Reply time expired.`)
    })
  })
  .catch(() => {
    console.error;
    console.log(`${mach} BREAK null`)
    message.reply(`Reply time expired.`)
  })
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
