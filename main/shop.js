const settings = require('../settings.json');
const chalk = require ('chalk');
const Discord = require ("discord.js");
const sql = require("sqlite");
sql.open("../score.sqlite");
let curren = ":tickets:"
let chatBit = ":eye_in_speech_bubble:"

function scoreDownTicket(mess, xval) {
  if (!xval) var xval = 1
  console.log("Lowering ticket score by", xval*1, mess.author.id)
  sql.get(`SELECT * FROM scores WHERE userId = "${mess.author.id}"`).then(row => {
    if (row.tickets*1 >= xval*1) {
      sql.run(`UPDATE scores SET tickets = ${row.tickets - xval*1} WHERE userId = ${mess.author.id}`)
    } else {
      sql.run(`UPDATE scores SET tickets = 0 WHERE userId = "${mess.author.id}"`)
    }
  })
}
function scoreUpTicket(mess, xval) {
  if (!xval) var xval = 1
  sql.get(`SELECT * FROM scores WHERE userId = "${mess.author.id}"`).then(row => {
    sql.run(`UPDATE scores SET tickets = ${row.tickets + xval*1} WHERE userId = ${mess.author.id}`)
  })
}
function scoreUpLevel(mess, xval) {
  if (!xval) var xval = 1
  sql.get(`SELECT * FROM scores WHERE userId = "${mess.author.id}"`).then(row => {
    sql.run(`UPDATE scores SET level = ${row.level + xval*1} WHERE userId = ${mess.author.id}`)
  })
}
function scoreDownBits(mess, xval) {
  if (!xval) var xval = 1
  console.log("Lowering byte score by", xval*1, mess.author.id)
  sql.get(`SELECT * FROM scores WHERE userId = "${mess.author.id}"`).then(row => {
    if (row.chatBits*1 >= xval*1) {
      sql.run(`UPDATE scores SET chatBits = ${row.chatBits - xval*1} WHERE userId = ${mess.author.id}`)
    } else {
      sql.run(`UPDATE scores SET chatBits = 0 WHERE userId = ${mess.author.id}`)
    }
  })
}
function scoreUpBits(mess, xval) {
  if (!xval) var xval = 1
  sql.get(`SELECT * FROM scores WHERE userId = "${mess.author.id}"`).then(row => {
    sql.run(`UPDATE scores SET chatBits = ${row.chatBits + xval*1} WHERE userId = ${mess.author.id}`)
  })
}

exports.run = (client, message, params) => {
  sql.get(`SELECT * FROM scores WHERE userId = "${message.author.id}"`).then(row => {
    // define static
    /*let eticketmsg = "Error"
    let ebytemsg = "Error"
    let levelshop = "Error"
    let items = "\u200b"
    let shopcmds = "\u200b"*/
    var lvrequirement = row.level*1 * 50 + 250
    var cbrequirement = row.level*1 * 128 + 1024
    // if parameters = 0 - display level shop
    if (params[0] === undefined) {
      // parse tickets
      if (row.tickets >= lvrequirement) {
        var eticketmsg = ":unlock: You have enough tickets to buy a level!"
      } else {
        var eticketmsg = ":lock: ~~You don't have enough tickets!~~"
      }
      // parse bytes
      if (row.chatBits >= cbrequirement) {
        var ebytemsg = ":unlock: You have enough bytes to buy a level!"
      } else {
        var ebytemsg = ":lock: ~~You don't have enough bytes!~~"
      }
      if (row.level === 0) {
        var levelshop = ":lock: You need to buy a level first."
        var shopcmds = "\u200b"
      } else if (row.level > 5) {
        var levelshop = ":unlock: You can now examine the Item Shop!"
        var shopcmds = `Trade ${chatBit} for ${curren} \`${settings.prefix}shop trade [t/b]\`\n`
        shopcmds += `See available items with \`\`${settings.prefix} shop items\`\` ((COMING SOON))`
      } else {
        var levelshop = ":unlock: You can now examine the Item Shop!"
        var shopcmds = "See available items with ``" + settings.prefix + "shop items`` ((COMING SOON!))"
      }
      const embed = new Discord.RichEmbed()
        .setTitle(':left_luggage: Sabre Level Shop!')
        .setAuthor(message.member.displayName)
        .setColor(0x7386FF)
        .setDescription(`Level: ${row.level}, ${curren}: ${row.tickets}, ${chatBit}: ${row.chatBits}`)
        .setFooter(`Sabre Shop Menu`)
        .setTimestamp()
        .setThumbnail('https://i.imgur.com/8ZBnvSt.png')
        .addField(`:large_orange_diamond: Level Price: __**${lvrequirement}${curren}**__ or __**${cbrequirement}${chatBit}**__`, `${eticketmsg}\n${ebytemsg}`)
        .addField(`\u200b`, `\u200b`)
        .addField(`${levelshop}`, `${shopcmds}`)
      message.author.send({ embed });
    // Level Buying Integration
    } else if (params[0] === "buy" && params[1] === "level") {
      if (params[2] === "ticket" || params[2] === "tickets" || params[2] === "t") { // ticket level purchase handler
        if (row.tickets >= lvrequirement) {
          message.channel.send({embed: {
            color: 0x3FFF6D,
            timestamp: new Date(),
            footer: {
              text: "Level Up!"
            },
            author: {
              name: message.member.displayName,
              icon_url: message.author.avatarURL
            },
            fields: [
              {
                name: "Cha-Ching!",
                value: `${lvrequirement}${curren} was used. ${message.member.displayName} Levelled Up!`
              },
              {
                name: "\u200b",
                value: `You are now level ${row.level*1 + 1}! Congradulations!`
              }
            ]
          }})
          scoreUpLevel(message, 1)
          scoreDownTicket(message, lvrequirement)
        } else {
          message.reply("`ERROR` You don't have enough " + curren)
        }
      } else if (params[2] === "byte" || params[2] === "bytes" || params[2] === "b") { // byte level purchase handler
        if (row.chatBits >= lvrequirement) {
          message.channel.send({embed: {
            color: 0x3FFF6D,
            timestamp: new Date(),
            footer: {
              text: "Level Up!"
            },
            author: {
              name: message.member.displayName,
              icon_url: message.author.avatarURL
            },
            fields: [
              {
                name: "Cha-Ching!",
                value: `${cbrequirement}${chatBit} was used. ${message.member.displayName} Levelled Up!`
              },
              {
                name: "\u200b",
                value: `You are now level ${row.level*1 + 1}! Congradulations!`
              }
            ]
          }})
          scoreUpLevel(message, 1)
          scoreDownBits(message, cbrequirement)
        } else {
          message.reply("`ERROR` You don't have enough " + chatBit)
        }
      } else {
        message.reply("`ERROR` The request was not understood! See manual")
      }
    } else if (params[0] === "trade") {
      if (params[1] === "b") {
        if (row.level >= 5 && row.chatBits >= 512) {
          setTimeout(() => {
            scoreUpTicket(message, 125)
            scoreDownBits(message, 512)
            message.reply(`Success! 512 ${chatBit} was traded for 125 ${curren}`)
          }, 2000)
        } else {
          message.reply(`Sorry! You don't have 512 ${chatBit} or you aren't level 5 or higher.`)
        }
      } else if (params[1] === "t") {
        if (row.level >= 5 && row.tickets >= 125) {
          setTimeout(() => {
            scoreDownTicket(message, 125)
            scoreUpBits(message, 512)
            message.reply(`Success! 125 ${curren} was traded for 512 ${chatBit}`)
          }, 2000)
        } else {
          message.reply(`Sorry! You don't have 125 ${curren} or you aren't level 5 or higher.`)
        }
      }
    }// end Level Buying Integration




  })
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['sshop', 'shop'],
  permLevel: 0
};

exports.help = {
  name: 'sabreshop',
  description: 'Displays the Sabre Shop and available items.',
  usage: 'Examine Level Shop: shop\nBuy a Level :: shop buy level [t/b/tickets/bytes]\nExamine Item Shop :: shop items\nBuy Item :: shop buy item <number> <slot 1-6> [t/b/tickets/bytes]\nTrade :: shop trade [t/b]\nTrade Requirement (Level) :: 8\nTrade Requirement :: 125 Tickets or 512 Bytes'
};
