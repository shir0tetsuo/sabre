const sql = require("sqlite");
sql.open("../score.sqlite");
const settings = require('../settings.json');
const chalk = require ('chalk');
let curren = ":tickets:"
let chatBit = ":eye_in_speech_bubble:"

function uPersonAmb(uid, tb, amount, message) {
  console.log(uid, tb, amount, message.content)
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
  }
}

exports.run = (client, message, params) => {
  if (params[0] !== "t" && params[0] !== "b") {
    return message.reply(`\`ERROR\` See Manual (Missing Currency Argument)`)
  }
  if (params[1] === message.mentions.members.first()) {
    return message.reply(`\`ERROR\` See Manual (Missing Amount Argument)`)
  }
  if (message.mentions.members.first() !== undefined && params[1] !== 0) {
    let users = message.mentions.users.map(m => m.id)
    let displays = message.mentions.users.map(m => m.displayName).join('\n')
    message.channel.send(`Calculating! \`This may take a while.\``)
    for (var i = 0; i < users.length; i++) { // users[i]
      setTimeout(() => {
        console.log(users[i], params[0], params[1], message.content)
        uPersonAmb(users[i], params[0], params[1], message)
      }, 2000)
    }
    message.channel.send(`System successfully updated data (\`${params[1]}${params[0]}\`) for the following users;\n${displays}`)
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
  usage: 'forcegive [t/b] [amount] [@users]'
};
