const sql = require("sqlite");
sql.open("../score.sqlite");
const settings = require('../settings.json');
const chalk = require ('chalk');
let curren = ":tickets:"
let chatBit = ":eye_in_speech_bubble:"
let noProps = new Set();

exports.run = (client, message, params) => {
  sql.get(`SELECT * FROM scores WHERE userId = "${message.author.id}"`).then(row => {
    if (!row) return message.reply(`\`FATAL-ERROR\``)
    if (row.level >= 15) {
      if (message.mentions.members.first() === undefined) {
        message.reply(`\`ERROR\` You must mention users!`)
      }
      if (noProps.has(message.author.id)) {
        message.reply(`\`ERROR\` You can only run this command every 30 seconds!`)
        return;
      } else {
        setTimeout(() => {
          noProps.add(message.author.id)
        }, 30000)
        let increment = 0
        let users = message.mentions.members.map(m => `:right_facing_fist: ${m}`) // join after, for now keep as array
        for (var i = 0; i < users.length; i++) {
          ++increment
        }
        message.channel.send(`:right_facing_fist: :left_facing_fist:\n__Some users were fistbumped__\n${users.join('\n')}\n\nType \`bump\` to respond!`)
        .then(() => {
          message.channel.awaitMessages(response => response.content === 'bump', { // incomplete!
            max: increment,
            time: 30000,
            errors: ['time']
          })
        })
        .then((collected) => {
          message.channel.send(`${message.author} :left_facing_fist:`)
        })
        .catch(() => {
          message.channel.send(`...${message.author} was left hanging!`)
        })
      }
    } else {
      message.reply(`\`ERROR\` You aren't level 15 or higher!`)
      return;
    }
  })
};

/*
enabled, guildOnly, aliases, permission level
*/
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['prop'],
  permLevel: 0
};

/*
name, desc., usage
name is also the command alias
*/
exports.help = {
  name: 'props',
  description: 'Give props to @users.',
  usage: 'props [@users]\nLevel Requirement: 15'
};
