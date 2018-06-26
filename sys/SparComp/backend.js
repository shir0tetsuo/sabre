const Discord = require("discord.js")
var exec = require('child_process').exec;

function Access(message) {
  let params = message.content.split(' ').slice(1);
  if (params[0] === "who") {
    var Post = `${new Date(message.author.joinedAt.toUTCString())}`;
  }
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
                    .setColor(0x33ad52)
                    .setDescription(`:radioactive::warning: Reply from firewall.dnet.lab`)
                    .addField('OUT:', `\`\`\`${stdout.substring(0, 1000)}\`\`\``)
                    .addField('OUT:', `\`\`\`${stdout.substring(1000, 2000)}\`\`\``)
                    .addField('OUT:', `\`\`\`${stdout.substring(2000, 3000)}\`\`\``)
                    .addField('OUT:', `\`\`\`${stdout.substring(3000, 4000)}\`\`\``)
                    .addField('OUT:', `\`\`\`${stdout.substring(4000, 5000)}\`\`\``)
                    .addField('ERR:', `\`\`\`${stderr.substring(0,1000)}\`\`\``)
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
}

module.exports = (message) => {
  Access(message)
  return;
}
