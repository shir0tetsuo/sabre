const sql = require("sqlite");
sql.open("../score.sqlite");
const settings = require('../settings.json');
const chalk = require ('chalk');
let curren = ":tickets:"
let chatBit = ":eye_in_speech_bubble:"

exports.run = (client, message, params) => {
  if (message.member === null) return;
  const permlvl = client.elevation(message)
  if (permlvl === 0) {
    var barCol = 0x36786A
  } else if (permlvl === 1) {
    var barCol = 0x366394
  } else if (permlvl === 2) {
    var barCol = 0x802D32
  } else if (permlvl === 3) {
    var barCol = 0x992D22
  } else if (permlvl === 4) {
    var barCol = 0x31BF61
  }
  let mess = message
  sql.get(`SELECT * FROM scores WHERE userId = "${mess.author.id}"`).then(row => {
    if (!row) return mess.reply("Your current level is 0.");
    //console.log(mess.author.id, row.level, row.tickets, row.chatBits)
    mess.reply("Calculating!").then(m => m.edit({embed: {
      color: barCol,
      timestamp: new Date(),
      description: `Sabre Levels; v${settings.version}`,
    /*  footer: {
        icon_url: client.user.avatarURL,
        text: client.user.username
      },*/ // Footer was removed: promise rejection from client
      author: {
        name: mess.member.displayName,
        icon_url: mess.author.avatarURL
      },
      fields: [
        {
          name: `:small_orange_diamond:: Level`,
          value: "```" + row.level + "```",
          inline: true
        },
        {
          name: `${curren}: Tickets`,
          value: "```" + row.tickets + "```",
          inline: true
        },
        {
          name: `${chatBit}: Bytes`,
          value: "```" + row.chatBits + "```",
          inline: true
        },
        {
          name: "Ranking for: " + mess.author.tag + "\u200b",
          value: `System returned message in ${m.createdTimestamp - mess.createdTimestamp}ms.`
        }
      ]
    }})) // do something here to make special things have output +=
    let king = ":warning:"
    const sReply = [
      'You\'re an awesome fella.',
      'Thanks for your support!',
      'I appreciate it.'
    ]
    var jobs = [
      'csd','sbi','dsi','ddsi','bmi','ang','ss'
    ]
    if (mess.member.displayName.toLowerCase().indexOf(jobs) !== -1) {
      console.log('Hit')
      mess.react("😎")
    }
    if (mess.author.id === settings.ownerid) {
      mess.reply("is the Main Developer!")
    }
    if (mess.author.id === settings.danid || mess.member.roles.find('name', 'Sabre Donator')) {
      mess.channel.send({embed: {
        color: 0x844F9B,
        author: {
          name: mess.member.displayName,
          icon_color: mess.author.avatarURL
        },
        fields: [
          {
            name: "\u200b",
            value: `**Donator:**\n${sReply[Math.floor(Math.random() * sReply.length)]}`
          }
        ]
      }}).then(message => {
        message.react("⭐");
        message.react("🔶");
        message.react("👍");
        let randomChance = Math.floor(Math.random() * 100)
        if (randomChance <= 33) {
          message.react("🎟");
          sql.get(`SELECT * FROM scores WHERE userId = "${mess.author.id}"`).then(row => {
            let randomTickets = Math.floor(row.tickets/19 + 20)
            sql.run(`UPDATE scores SET tickets = ${row.tickets + randomTickets*1} WHERE userId = "${mess.author.id}"`)
          })
        }
      })
    }
  }).catch(function() {
    console.log(chalk.redBright("Bug at levels"))
  })
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['levels', 'lvl', 'rank'],
  permLevel: 0
};

exports.help = {
  name: 'level',
  description: 'Displays a user\'s Sabre Level.',
  usage: 'level'
};
