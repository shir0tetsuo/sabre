const sql = require("sqlite");
sql.open("../score.sqlite");
const settings = require('../settings.json');
const chalk = require ('chalk');
exports.run = (client, message, params) => {
  if (message.mentions.members.first() === undefined) return message.reply("No User Mentioned!")
  var string = '';
  let person = message.mentions.members.first();
  //let output = '';
  const millisJoined = new Date().getTime() - person.joinedAt.getTime();
  const daysJoined = Math.floor(millisJoined / 1000 / 60 / 60 / 24);
  sql.get(`SELECT * FROM scores WHERE userId = "${person.id}"`).then(row => {
    //output += `${person}: Lv ${row.level}, Tk ${row.tickets}, B ${row.chatBits}\n`
    //output += `User joined ${daysJoined} Days Ago (${message.guild.name}).\n`
    string += `${person}: Lv ${row.level}, Tk ${row.tickets}, B ${row.chatBits}\nUser joined: ${daysJoined} Days Ago (${message.guild.name})\n`
  })
  sql.get(`SELECT * FROM hyperlevels WHERE userId = "${person.id}"`).then(row => {
    if (!row) {
      string += `This user does not have a hyperlevel.\n`
    } else {
      string += `HLVL: ${row.hlvl}, HQKY: ${row.spaceA}, HDTK: ${row.spaceB}.\n`
    }
  })
  sql.get(`SELECT * FROM warning WHERE userId = "${person.id}"`).then(row => {
    if (!row) {
      string += "This user has never received a warning.\n"
      //output += `This user has never received a warning.\n`
    } else {
      string += `Date Warned: ${row.date} - User has ${row.times} warnings.\n`
      //output += `Date Warned: ${row.date} - User has ${row.times} warnings tallied.`
    }
  })
  message.author.send(string)
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
