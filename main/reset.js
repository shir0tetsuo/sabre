const sql = require("sqlite");
sql.open("../score.sqlite");
var exec = require('child_process').exec;
const settings = require('../settings.json');
const chalk = require ('chalk');
let curren = ":tickets:"
let chatBit = ":eye_in_speech_bubble:"

exports.run = (client, message, params) => {
  if (params[0] !== "dewit") {
    return message.reply(`\`FATAL ERROR\` This is a dangerous command! \`dewit\``)
  } else {
    if (message.author.id !== settings.ownerid) {
      return message.reply(`\`FATAL ERROR\` You are not the owner! This action has been logged.`)
      console.log(`${message.guild.name} ${message.channel.name} ${message.author.id} ${message.member.displayName} ran reset!`)
    } else {
      exec(`cp ../scores.sqlite ../scores_${new Date().getTime()}_bak.sqlite`,
        function(error, stdout, stderr) {
          message.reply(`\`DATABASE COPIED AND BACKED UP\`\n${error} ${stdout} ${stderr}`)
        })
        .then(() => {
          sql.run(`DELETE FROM ${params[1]}`)
          message.reply(`\`WARNING\` The database ${params[1]} has been erased!`)
        })
    }
  }
};

/*
enabled, guildOnly, aliases, permission level
*/
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['rst'],
  permLevel: 4
};

/*
name, desc., usage
name is also the command alias
*/
exports.help = {
  name: 'reset',
  description: 'Fully resets a table in the database and backs up existing data. OWNER ONLY!',
  usage: 'reset dewit [database]'
};
