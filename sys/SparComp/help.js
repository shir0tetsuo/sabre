const Discord = require ("discord.js"); // discord client

var asmv = "1.7.0b" // Version Number
var prefix = "?spar"

var opts = ``;
opts += `${prefix}         :: Displays this page.\n`
opts += `${prefix} count   :: Tag a user with this to begin a sparring countdown.\n`
opts += `${prefix} heal    :: Invokes bot to send forth 4 healing Ki balls.\n`
opts += `${prefix} barrier :: Invokes bot to send forth Class III Barrier.\n`
opts += `${prefix} breaker :: Barrier-Breaking Practice.\n`
opts += `${prefix} stats   :: See how many times you invoked sparring practice.\n`
opts += `${prefix} pdt     :: Pocket Dimension tools.`

var HLPText = ``;
HLPText += `:one: If oblitherated before the time limit expires, another entity will spawn into existence and continue.\n`
HLPText += `:two: This bot will never hit critically that permanently damages the invoker.\n`
HLPText += `:three: If the invoker is unable to continue, the bot will cease to be despite the remaining limit.\n`
HLPText += `:four: Upon the expiry of the time limit, the entity will completely dematerialize, and a healing Ki ball is sent to the invoker.\n`
HLPText += `:five: If for some reason service is interrupted, such as a server restart, expiry conditions will apply.\n`
HLPText += `:six: A temporary circular-platform construct is materialized below the contestants during the match.\n`
HLPText += `:seven: The construct is passively repaired as time goes on.\n`
HLPText += `:eight: **Typing \`stop\` will command it to cease action before the timer expires.**\n`

module.exports = (message) =>  {
  message.channel.send({embed: {
    color: 0x52dd19,
    timestamp: new Date(),
    description: `SparCompanion (v${asmv}) Help Page`,
    author: {
      name: message.member.displayName,
      icon_url: message.author.avatarURL
    },
    fields: [
      {
        name: `What is SparCompanion?`,
        value: `SparCompanion is an Autonomous Sparring Mechanism.\n*Sparring by definition is to make the motions of boxing without landing heavy blows, as a form of training.*\nAn invoking user may use this to train upon several different aspects by using their ES (Energy System). `,
        inline: false
      },
      {
        name: `ASM Usage`,
        value: `**__Warning__**\nThe main usage of this bot is **intended for individuals knowledged in how to move their Astral / Spirit / Soul / ES Body.**\nTagging this bot will make the system respond with a series of questions pretaining to the difficulty of the training. Once each question is responded, **A magickally automated entity will come forth for such training.**\n**Questions:** Time Limit, Defense, Speed, Attack, Intelligence.`,
        inline: false
      },
      {
        name: `Absolute Conditions`,
        value: `${HLPText}`,
        inline: false
      },
      {
        name: `Help`,
        value: `\`\`\`asciidoc\n${opts}\`\`\``,
        inline: false
      }
    ]
  }})
}
