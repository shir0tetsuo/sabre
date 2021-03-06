var BKDef = `\n`;
BKDef += `:one: The ${mach} spawns **3 Barriers.**\n`
BKDef += `:two: The ${mach} spawns **10 Barriers.**\n`
BKDef += `:three: The ${mach} spawns **20 Barriers.**\n`
BKDef += `:four: The ${mach} spawns **50 Barriers.**\n`
BKDef += `:five: The ${mach} spawns **100 Barriers.**\n`
BKDef += `:six: The ${mach} spawns **200 Barriers.**\n`
BKDef += `\`\`\`md\n[!]: All these barriers are Class III.\nThe level of difficulty increases with each barrier and attempts to match the user's strength.\`\`\``

var RTe = "Reply time expired."
var mach = "Autonomous Sparring Mechanism"

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

module.exports = (message) =>  {
  InvokeBreakPractice(message)
  return;
}
