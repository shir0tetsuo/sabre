const sql = require("sqlite");
sql.open("../score.sqlite");
const Discord = require ("discord.js");
var exec = require('child_process').exec;
const settings = require('../settings.json');
const chalk = require ('chalk');
let curren = ":tickets:"
let chatBit = ":eye_in_speech_bubble:"

exports.run = (client, message, params) => {
  if (message.author.id === settings.ownerid) {
    if (params[0] === undefined) return message.reply("`ERROR` See Manual!")
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
    } /*
    if (params[0] === "ssh") {
      if (params[1] === undefined) {
        return message.reply("Nothing to evaluate!")
      } else {
        exec(`${params.slice(1).join(' ')}`,
          function(error, stdout, stderr) {
            message.reply("Evaluating.")
            if (stdout !== null && stdout !== undefined) {
              message.channel.send(`\`\`\`${stdout.substring(0,1014)}\`\`\``)
            }
            if (stderr !== null && stderr !== undefined) {
              message.channel.send(`\`\`\`${stderr.substring(0,1014)}\`\`\``)
            }
          /*  if (error !== null && error !== undefined) {
              message.channel.send(`\`\`\`${error.substring(0,1014)}\`\`\``)
            }
          })
      }
    } */
    if (params[0] === "sshx") {
      if (params[1] === undefined) {
        return message.reply("Nothing to evaluate!")
      } else {
      /*  message.reply(`\`X Mode : Evaluation will self-delete in 10 seconds.\``).then(m => {
          setTimeout(() => {
            m.delete()
          })
        }) */

        exec(`${params.slice(1).join(' ')}`,
          function(error, stdout, stderr) {
            message.reply("Evaluating.").then(m => {
              setTimeout(() => {
                m.delete()
              })
            })
            if (stdout !== null && stdout !== undefined) {
              var seconds = 15
              if (!stderr || stderr === null || stderr === undefined) {
                var stderr = "System returned no error."
              }
              const embed = new Discord.RichEmbed()
                .setTitle('COMMAND WAS JUST RUN!')
                .setAuthor(`Sabre ran a Command: ${params.join(' ')}`, client.user.avatarURL)
                .setColor(0xCF4F36)
                .setDescription(`:radioactive::warning: Reply from firewall.dnet.lab`)
                .setFooter(`${seconds} s`, client.user.avatarURL)
                .addField('OUT:', `\`\`\`${stdout.substring(0, 1000)}\`\`\``)
                .addField('OUT:', `\`\`\`${stdout.substring(1000, 2000)}\`\`\``)
                .addField('ERR:', `\`\`\`${stderr.substring(0,1000)}\`\`\``)
                .addField('ERR:', `\`\`\`${stderr.substring(1000, 2000)}\`\`\``)
                .setTimestamp()
                message.channel.send({ embed }).then(m => {
                  var expiry = new Date().getTime()
                  expiry += 15000
                  var x = setInterval(function() {
                    var now = new Date().getTime();
                    var distance = expiry - now;
                    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
                    console.log(seconds)
                    m.edit({ embed })
                    if (distance < 0) {
                      clearInterval(x);
                      m.delete()
                    }
                  }, 2000)
                })
            }


          /*  if (error !== null && error !== undefined) {
              message.channel.send(`\`\`\`${error.substring(0,1014)}\`\`\``)
            } */
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
  usage: 'sectools [a2link (keyword) / ssh (command) / sshx (command)]'
};
