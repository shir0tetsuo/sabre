const sql = require("sqlite");
sql.open("../score.sqlite");
var exec = require('child_process').exec;
const settings = require('../settings.json');
const chalk = require ('chalk');
let curren = ":tickets:"
let chatBit = ":eye_in_speech_bubble:"

exports.run = (client, message, params) => {
  if (message.author.id === settings.ownerid) {
    if (params[0] === "a2link") {
      if (params[1] === undefined) {
        var keyword = "help"
      } else {
        var keyword = params[1]
      }
      exec(`echo "http://$(curl icanhazip.com)/${keyword}"`,
        function(error, stdout, stderr) {
          message.author.send(stdout)
        })
    }
    if (params[0] === "ssh") {
      if (params[1] === undefined) {
        return message.reply("Nothing to evaluate!")
      } else {
        exec(`${params.slice(1).join(' ')}`,
          function(error, stdout, stderr) {
            message.reply("Evaluating.")
            if (stdout !== null && stdout !== undefined) {
              message.channel.send(stdout.substring(0,1024))
            }
            if (stderr !== null && stderr !== undefined) {
              message.channel.send(stderr.substring(0,1024))
            }
            if (error !== null && error !== undefined) {
              message.channel.send(error.substring(0,1024))
            }
          })
      }
    }
  } else {
    message.reply("`ERROR` You are not the Owner! `This action has been logged.`")
    console.log(chalk.redBright("WARNING"), new Date())
    console.log(chalk.redBright(message.member.displayName, message.content), message.guild.name, message.channel.name)
  }
};

/*
enabled, guildOnly, aliases, permission level
*/
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['sectool', 'ctool'],
  permLevel: 4
};

/*
name, desc., usage
name is also the command alias
*/
exports.help = {
  name: 'sectools',
  description: 'Security tools suite. OWNER ONLY!',
  usage: 'sectools [a2link (keyword)]'
};
