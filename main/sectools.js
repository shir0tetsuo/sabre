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
              }, 10000)
            })
              if (stderr === undefined || stderr === null || !stderr) {
                var stderr = "System returned no error."
              }
              if (stdout === undefined || stdout === null || !stdout) {
                var stdout = "System returned no output."
              }

                message.channel.send(`\`ACCESS GRANTED. SYSTEM LOGGED IN.\``).then(m => {
                  var expiry = new Date().getTime()
                  expiry += 30000
                  var x = setInterval(function() {
                    var now = new Date().getTime();
                    var distance = expiry - now;
                    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
                    const embed = new Discord.RichEmbed()
                      .setTitle(`COMMAND WAS JUST RUN! Self-Destructing in: ${seconds} s`)
                      .setAuthor(`Sabre ran a Command: ${params.join(' ')}`, client.user.avatarURL)
                      .setColor(0xCF4F36)
                      .setDescription(`:radioactive::warning: Reply from firewall.dnet.lab`)
                      .setFooter(`${seconds} s`, client.user.avatarURL)
                      .addField('OUT:', `\`\`\`${stdout.substring(0, 1000)}\`\`\``)
                      .addField('OUT:', `\`\`\`${stdout.substring(1000, 2000)}\`\`\``)
                      .addField('OUT:', `\`\`\`${stdout.substring(2000, 3000)}\`\`\``)
                      .addField('OUT:', `\`\`\`${stdout.substring(3000, 4000)}\`\`\``)
                      .addField('OUT:', `\`\`\`${stdout.substring(4000, 5000)}\`\`\``)
                      .addField('OUT:', `\`\`\`${stdout.substring(5000, 6000)}\`\`\``)
                      .addField('OUT:', `\`\`\`${stdout.substring(6000, 7000)}\`\`\``)
                      .addField('OUT:', `\`\`\`${stdout.substring(7000, 8000)}\`\`\``)
                      .addField('OUT:', `\`\`\`${stdout.substring(8000, 9000)}\`\`\``)
                      .addField('OUT:', `\`\`\`${stdout.substring(9000, 10000)}\`\`\``)
                      .addField('OUT:', `\`\`\`${stdout.substring(10000, 11000)}\`\`\``)
                      .addField('OUT:', `\`\`\`${stdout.substring(11000, 12000)}\`\`\``)
                      .addField('OUT:', `\`\`\`${stdout.substring(12000, 13000)}\`\`\``)
                      .addField('OUT:', `\`\`\`${stdout.substring(13000, 14000)}\`\`\``)
                      .addField('OUT:', `\`\`\`${stdout.substring(14000, 15000)}\`\`\``)
                      .addField('OUT:', `\`\`\`${stdout.substring(15000, 16000)}\`\`\``)
                      .addField('OUT:', `\`\`\`${stdout.substring(16000, 17000)}\`\`\``)
                      .addField('OUT:', `\`\`\`${stdout.substring(17000, 18000)}\`\`\``)
                      .addField('OUT:', `\`\`\`${stdout.substring(18000, 19000)}\`\`\``)
                      .addField('OUT:', `\`\`\`${stdout.substring(19000, 20000)}\`\`\``)
                      .addField('ERR:', `\`\`\`${stderr.substring(0,1000)}\`\`\``)
                      .addField('ERR:', `\`\`\`${stderr.substring(1000, 2000)}\`\`\``)
                      .setTimestamp()
                    m.edit({ embed })
                    if (distance < 0) {
                      clearInterval(x);
                      m.delete()
                    }
                  }, 2000)
                })


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
