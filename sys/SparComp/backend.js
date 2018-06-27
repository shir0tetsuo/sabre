const Discord = require("discord.js")
var exec = require('child_process').exec;

function Access(message, client) {
  let params = message.content.split(' ').slice(1);
  if (params[0] === "who") {
    const tgt = message.mentions.members.first()
    const JoinedID = new Date().getTime() - tgt.joinedAt.getTime() // message.guild.createdAt.getTime();
    const AliveID = new Date().getTime() - tgt.createdAt
    const JIDays = Math.floor(JoinedID/ 1000 / 60 / 60 / 24);
    const AIDays = Math.floor(AliveID / 1000 / 60 / 60 / 24);
    const SCDays = message.guild.createdAt.getTime()
    var Re = ``;
    const PR = tgt.roles.map(role => `${role}`).join(', ')
    Re += `**${JIDays}** Days since Joined Server,\n`
    Re += `\`${SCDays} Days since the Server was Created.\`\n`
    Re += `**${AIDays}** Days since this user joined Discord.\n`
    //personroles = person.roles.map(role => role.name).join(', ')
    message.channel.send({embed: {
      color: 0x1cf09d,
      timestamp: new Date(),
      description: `${tgt.id} ${tgt.tag}`,
      author: {
        name: client.user.username,
        icon_url: client.user.avatarURL
      },
      fields: [
        {
          name: `${Re}`,
          value: `${tgt} has the following roles:\n${PR}`
        }
      ]
    }})
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

module.exports = (message, client) => {
  Access(message, client)
  return;
}
