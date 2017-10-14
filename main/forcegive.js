const sql = require("sqlite");
sql.open("../score.sqlite");
const settings = require('../settings.json');
const chalk = require ('chalk');
let curren = ":tickets:"
let chatBit = ":eye_in_speech_bubble:"

function uPersonAmb(uid, tb, amount, message, output) {
  //console.log(uid, tb, amount, message.content)
  setTimeout(() => {
    if (tb === "b") {
      sql.get(`SELECT * FROM scores WHERE userId = "${uid}"`).then(row => {
        if (!row) return message.reply(`\`INTERNAL ERROR\` <@${uid}> has no record!`)
        sql.run(`UPDATE scores SET chatBits = "${row.chatBits + amount*1}" WHERE userId = "${uid}"`)
      })
    } else if (tb === "t") {
      sql.get(`SELECT * FROM scores WHERE userId = "${uid}"`).then(row => {
        if (!row) return message.reply(`\`INTERNAL ERROR\` <@${uid}> has no record!`)
        sql.run(`UPDATE scores SET tickets = "${row.tickets + amount*1}" WHERE userId = "${uid}"`)
      })
    } else if (tb === "hq") {
      sql.get(`SELECT * FROM hyperlevels WHERE userId = "${uid}"`).then(hl => {
        if (!hl) return message.reply(`\`INTERNAL ERROR\` <@${uid}> has no record!`)
        sql.run(`UPDATE hyperlevels SET spaceA = "${hl.spaceA*1 + amount*1}" WHERE userId = "${uid}"`)
      })
    } else if (tb === "ht") {
      sql.get(`SELECT * FROM hyperlevels WHERE userId = "${uid}"`).then(hl => {
        if (!hl) return message.reply(`\`INTERNAL ERROR\` <@${uid}> has no record!`)
        sql.run(`UPDATE hyperlevels SET spaceB = "${hl.spaceB*1 + amount*1}" WHERE userId = "${uid}"`)
      })
    }
    message.channel.send(`Successfully updated <@${uid}>'s data with ${amount}${tb}. \`This expires in 20 Seconds.\``).then(m => {
      setTimeout(() => {
        m.delete()
      }, 20000)
    })
  }, 2000)
}

exports.run = (client, message, params) => {
  if (params[0] !== "t" && params[0] !== "b" && params[0] !== "ht" && params[0] !== "hq") {
    return message.reply(`\`ERROR\` See Manual (Missing Currency Argument)`)
  }
  if (params[1] === message.mentions.members.first()) {
    return message.reply(`\`ERROR\` See Manual (Missing Amount Argument)`)
  }
  if (message.mentions.members.first() !== undefined && params[1] !== 0) {
    //console.log(message.mentions.members)
    var users = message.mentions.members.map(m => m.id)
    var displays = message.mentions.members.map(m => `${m.displayName}`).join('\n')
    let output = `Calculating! \`This may take a while.\`\n`
    output += `**Request:** \`${params[1]}${params[0]}\`\n`
    output += `__Users__\n${displays}\n`
    output += `\`This message expires in 10 seconds.\``
    message.channel.send(output).then(m => {
      setTimeout(() => {
        m.delete()
      }, 10000)
    })
      for (var i = 0; i < users.length; i++) {
        uPersonAmb(users[i], params[0], params[1], message, output)
      }
  } else {
    message.reply(`\`ERROR\` See Manual (Missing Correct Properties)`)
  }
};

/*
enabled, guildOnly, aliases, permission level
*/
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['fgive'],
  permLevel: 3
};

/*
name, desc., usage
name is also the command alias
*/
exports.help = {
  name: 'forcegive',
  description: 'Allows administrators to force ticket/byte incrementation.',
  usage: 'forcegive [t/b/ht/hq] [amount] [@users]'
};
