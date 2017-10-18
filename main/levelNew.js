//const sql = require("sqlite");
//sql.open("../score.sqlite");
const settings = require('../settings.json');
const chalk = require ('chalk');
const Tran = require('../sys/TRANSACTIONS.js')
let readL = "readL"
let readH = "readH"
let TK = ":tickets:"
let CB = ":eye_in_speech_bubble:"
let LV = ":small_orange_diamond:"
let HL = ":radioactive:"
let QKEY = ":key2:"
let HDTK = ":pound:"

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
    var barCol = 0x980098
  }
  let mess = message
  let keep = message

  const row = Tran(message, 'readL', null, message.author, params)
  const hl = Tran(message, 'readH', null, message.author, params)

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
        name: `${LV}: Level`,
        value: "```" + row.level + "```",
        inline: true
      },
      {
        name: `${TK}: Tickets`,
        value: "```" + row.tickets + "```",
        inline: true
      },
      {
        name: `${CB}: Bytes`,
        value: "```" + row.chatBits + "```",
        inline: true
      },
      {
        name: `${HL}: Hyperlevel`,
        value: `\`\`\`diff\n+ ${hl.hlvl}\`\`\``,
        inline: true
      },
      {
        name: `${QKEY}: Quest Keys`,
        value: `\`\`\`diff\n+ ${hl.spaceA}\`\`\``,
        inline: true
      },
      {
        name: `${HDTK}: Dark Tickets`,
        value: `\`\`\`diff\n+ ${hl.spaceB}\`\`\``,
        inline: true
      },
      {
        name: "Ranking for: " + mess.author.tag + "\u200b",
        value: `System returned message in ${m.createdTimestamp - mess.createdTimestamp}ms.`
      }
    ]
  }}))
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['levels2', 'lvl2', 'rank2'],
  permLevel: 4
};

exports.help = {
  name: 'levelNew',
  description: 'Displays a user\'s Sabre Level.',
  usage: 'levelNew'
};
