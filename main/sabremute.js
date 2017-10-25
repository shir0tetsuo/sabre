// ctrl-p = find a file
const sql = require("sqlite");
sql.open("../score.sqlite");
const settings = require('../settings.json');
const chalk = require ('chalk');
let curren = ":tickets:"
let chatBit = ":eye_in_speech_bubble:"
const ssword = require("../sys/shadowshadow.json") // server-side


const rarray = [
  "Hmm. Let me think about this.",
  "Hold the phone.",
  "Calculating...",
  "I'll see what I can do."
]

function Rand(data) {
  return data[Math.floor(Math.random() * data.length)]
}

function brain(client, message, params, person, muRole) {
  message.channel.send(`${Rand(rarray)}`)
  setTimeout(() => {
    sql.get(`SELECT * FROM warning WHERE userId = "${person.id}"`).then(w => {
      var verdict = '';
      verdict += `I am evaluating your request to mute ${person} for "${params.slice(1).join(' ')}".\n`
      if (!w || w.times <= 2) {
        return message.reply(`${verdict}Has this person been warned?`)
      } else {
        let muChance = Math.floor(Math.random() * 100);
        if (muChance >= 41) {
          verdict += `**${person.displayName}, for your crimes against humanity and bot-kind, I hereby sentence you to the Mute-Zone!**`
          message.channel.send(verdict)
          console.log(verdict)
          let personroles = person.roles.map(role => role.name).join(', ')
          var shadow = ssword.strings[Math.floor(Math.random() * ssword.strings.length)]
          var shadowb = ssword.strings[Math.floor(Math.random() * ssword.strings.length)]
          message.channel.send(`Sabre found the defendant **${person.user.username}#${person.user.discriminator}** (${person.displayName}) guilty of\n${params.slice(1).join(' ')} (${message.member.displayName} ${message.author.tag})\n\`\`\`markdown\n.\n${shadow.text} ${person.displayName} Was silenced by Sabre. ${shadowb.text}\n.\`\`\``).then(function (message) {
            message.react("☢")
            message.react("🤐")
          })
          message.author.send(`Don't forget to log. ${person.user.username}#${person.user.discriminator} ${message.content} (${personroles})`)
          person.setRoles([muRole]).catch(console.error)
        } else {
          sql.run(`UPDATE warning SET times = "${w.times*1 + 1}" WHERE userId = "${person.id}"`)
          verdict += `**This user has been warned.**\nCarry on.`
          message.channel.send(verdict)
          console.log(verdict)
        }


      }


    })
  }, 5000)
}

exports.run = (client, message, params) => {
  console.log(`${message.author.tag} ${message.channel.name} ${message.guild.name} OPER: mu ${message.content}`)
  if (message.mentions.members.first() === undefined) {
    return message.reply(`\`ERROR\` See Manual`)
  }
  let muRole_i = message.guild.roles.find("name", "Muted")
  //console.log("Step One", muRole_i)
  if (!muRole_i || muRole_i === undefined) muRole_i = null
  let muRole_ii = message.guild.roles.find("name", "Bad Boy")
  //console.log("Step Two", muRole_ii)
  if (!muRole_ii || muRole_ii === undefined) muRole_ii = null
  if (muRole_i === null && muRole_ii === null) {
    //console.log("Step Three", muRole_i, muRole_ii)
    return message.reply(`\`ERROR\` I couldn't find the roles __Muted__ or __Bad Boy__.`)
  } else {
    const person = message.mentions.members.first();
    if (person === undefined) {
      return message.reply(`\`ERROR\` (\`INTERNAL ERROR\`)`)
    } else {
      if (muRole_i !== null && muRole_i !== undefined) {
        brain(client, message, params, person, muRole_i)
      } else if (muRole_ii !== null && muRole_ii !== undefined) {
        brain(client, message, params, person, muRole_ii)
      }
    }
  }
//  if(message.mentions.members.first().roles.some(r=>["Dev", "Mod", "Server Staff", "Proficient"].includes(r.name)) ) {
  // has one of the roles
//} else {
  // has none of the roles
//}
//  if (message.mentions.members.first() !== undefined && danceRole !== undefined && danceRole !== null) {
};

/*
enabled, guildOnly, aliases, permission level
*/
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['mu'],
  permLevel: 3
};

/*
name, desc., usage
name is also the command alias
*/
exports.help = {
  name: 'sabremute',
  description: 'Invokes Sabre\'s mathematics to see if they\'re being bad.',
  usage: 'sabremute [@user] (reason)'
};
