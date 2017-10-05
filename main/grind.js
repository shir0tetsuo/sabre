const sql = require("sqlite");
sql.open("../score.sqlite");
const settings = require('../settings.json');
const chalk = require ('chalk');
let curren = ":tickets:"
let chatBit = ":eye_in_speech_bubble:"

function Rand(data) {
  // where data is the array
  return data[Math.floor(Math.random() * data.length)]
}
////////////////////////////////////////////////////////////////////////////////
// exports.run
////////////////////////////////////////////////////////////////////////////////

let noGrind = new Set();

exports.run = (client, message, params) => {
  if (noGrind.has(message.author.id)) {
    message.reply(`No grind for you! Gotta wait.`)
  } else {
    noGrind.add(message.author.id);
    setTimeout(() => {
      noGrind.delete(message.author.id)
    }, 30000)
    message.channel.send(`The level grind is real!\nType \`grind\` to add some stuff.`)
    .then(() => {
      message.channel.awaitMessages(response => response.content === 'grind', {
        max: 1,
        time: 10000,
        errors: ['time'],
      })
      .then((collected) => {
        sql.get(`SELECT * FROM scores WHERE userId = "${message.author.id}"`).then(row => {
          var grinded = row.level*750
          if (grinded === 0) var grind = 150
          const collectedU = collected.first().author
          message.channel.send(`${collectedU} collected dat grind! There was ${grinded}${curren}`)
          setTimeout(() => {
            sql.get(`SELECT * FROM scores WHERE userId = "${collectedU.id}"`).then(cur => {
              sql.run(`UPDATE scores SET tickets = "${cur.tickets + grinded*1}" WHERE userId = "${collectedU.id}"`)
            })
          }, 2000)
        })
      })
      .catch(() => {
        message.channel.send(`Too late, the oppertunity passed.`)
      })
  })
};

/*
enabled, guildOnly, aliases, permission level
*/
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['levelgrind'],
  permLevel: 1
};

/*
name, desc., usage
name is also the command alias
*/
exports.help = {
  name: 'grind',
  description: 'The level grind is real. Do it before someone else does.',
  usage: 'grind'
};
