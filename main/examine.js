const sql = require("sqlite");
sql.open("../score.sqlite");
const settings = require('../settings.json');
const chalk = require ('chalk');
exports.run = (client, message, params) => {
  if (message.mentions.members.first() === undefined) return message.reply("No User Mentioned!")
  let person = message.mentions.members.first();
  sql.get(`SELECT * FROM scores WHERE userId = "${person.id}"`).then(row => {
    message.author.send(`${person}: Lv ${row.level}, Tk ${row.tickets}, B ${row.chatBits}`)
  })
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['inspect', 'exam', 'insp'],
  permLevel: 2
};

exports.help = {
  name: 'examine',
  description: 'Displays a Users Sabre Level Data. PermLVL 2.',
  usage: 'examine [@user]'
};
