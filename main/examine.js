const sql = require("sqlite");
sql.open("../score.sqlite");
const settings = require('../settings.json');
const chalk = require ('chalk');
exports.run = (client, message, params) => {
  if (message.mentions.members.first() === undefined) return message.reply("No User Mentioned!")
  let person = message.mentions.members.first();
  let output = '';
  const millisJoined = new Date().getTime() - person.joinedAt.getTime();
  const daysJoined = Math.floor(millisJoined / 1000 / 60 / 60 / 24);
  sql.get(`SELECT * FROM scores WHERE userId = "${person.id}"`).then(row => {
    output += `${person}: Lv ${row.level}, Tk ${row.tickets}, B ${row.chatBits}\n`
    output += `User joined ${daysJoined} Days Ago (${message.guild.name}).\n`
    //message.author.send(`${person}: Lv ${row.level}, Tk ${row.tickets}, B ${row.chatBits}`)
  })
  sql.get(`SELECT * FROM warning WHERE userId = "${person.id}"`).then(row => {
    if (!row) {
      //message.author.send("This user has never received a warning.")
      output += `This user has never received a warning.\n`
    } else {
      //message.author.send(`Date Warned: ${row.date} - User has ${row.times} warnings.`)
      output += `Date Warned: ${row.date} - User has ${row.times} warnings tallied.`
    }
  })
  message.author.send(output)
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['inspect', 'exam', 'insp'],
  permLevel: 2
};

exports.help = {
  name: 'examine',
  description: 'Displays a Users Sabre Level Data / Warning Counter.',
  usage: 'examine [@user]'
};
