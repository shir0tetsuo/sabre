const Discord = require("discord.js")
var exec = require('child_process').exec;

function Access(message, client) {
  let params = message.content.split(' ').slice(1);
  if (params[0] === "who") {
    const tgt = message.mentions.members.first()
    if (tgt === null || tgt === undefined) return;
    const JoinedID = new Date().getTime() - tgt.joinedAt.getTime() // message.guild.createdAt.getTime();
    const AIDays = tgt.user.createdAt
    const SCID = new Date().getTime() - message.guild.createdAt.getTime()
    const JIDays = Math.floor(JoinedID/ 1000 / 60 / 60 / 24);
    //const AIDays = Math.floor(AliveID / 1000 / 60 / 60 / 24);
    const SCDays = Math.floor(SCID / 1000 / 60 / 60 / 24);
    var Re = `\u200b`;
    const PR = tgt.roles.map(role => `${role}`).join(', ')
    var RR = `**${JIDays}** Days since joined Server.\n\`(${SCDays} Days since Server Creation.)\`\n`
    RR += `\n__Account Created:__\n**${AIDays}**\n`
    RR += `\n\n`
    RR += `:wave: **\`${message.guild.members.filter(m => m.presence.status === 'online').size} / ${message.guild.memberCount}\`** Online\n`
    RR += `:spy: **\`${message.guild.members.filter(m => m.presence.status === 'offline').size} / ${message.guild.memberCount}\`** Offline\n`
    RR += `:red_circle: **\`${message.guild.members.filter(m => m.presence.status === 'dnd').size} / ${message.guild.memberCount}\`** Busy\n`
    RR += `:dark_sunglasses: **\`${message.guild.members.filter(m => m.presence.status === 'idle').size} / ${message.guild.memberCount}\`** Idle\n`
    //personroles = person.roles.map(role => role.name).join(', ')
    message.channel.send({embed: {
      color: 0x1cf09d,
      timestamp: new Date(),
      author: {
        name: client.user.username,
        icon_url: client.user.avatarURL
      },
      fields: [
        {
          name: `${Re}`,
          value: `${RR}\n__${tgt} \`${tgt.id}\` has the following roles:__\n${PR}`
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
