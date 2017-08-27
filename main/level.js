const sql = require("sqlite");
sql.open("./score.sqlite");
const settings = require('../settings.json');
const chalk = require ('chalk');
let curren = ":tickets:"
let chatBit = ":eye_in_speech_bubble:"
function scoreDisplay(mess) {
  sql.get(`SELECT * FROM scores WHERE userId = "${mess.author.id}"`).then(row => {
    if (!row) return mess.reply("Your current level is 0.");
    console.log(mess.author.id, row.level, row.tickets, row.chatBits)
    mess.reply("Calculating!").then(m => m.edit({embed: {
      color: 0xFFC000,
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
    }}))
    if (mess.author.id === settings.ownerid) {
      mess.reply("Hello, World!")
    }
  }).catch(function() {
    console.log(chalk.redBright("Bug at levels"))
  })
}
exports.run = (client, message, params) => {
  if (message.member === null) return;
  scoreDisplay(message)
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['levels', 'lvl'],
  permLevel: 1
};

exports.help = {
  name: 'level',
  description: 'Displays a user\'s Sabre Level. PermLVL 1.',
  usage: 'level'
};
