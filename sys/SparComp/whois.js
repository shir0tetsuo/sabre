const Discord = require("discord.js")

function Who(message, client) {
  const tgt = message.mentions.members.first()
  if (tgt === null || tgt === undefined) return message.reply(`No mention was detected.`);
  const JoinedID = new Date().getTime() - tgt.joinedAt.getTime() // message.guild.createdAt.getTime();
  const AIDays = tgt.user.createdAt
  const SCID = new Date().getTime() - message.guild.createdAt.getTime()
  const JIDays = Math.floor(JoinedID / 1000 / 60 / 60 / 24);
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
  message.channel.send({
    embed: {
      color: 0x1cf09d,
      timestamp: new Date(),
      author: {
        name: client.user.username,
        icon_url: client.user.avatarURL
      },
      fields: [{
        name: `${Re}`,
        value: `${RR}\n__${tgt} \`${tgt.id}\` has the following roles:__\n${PR}`
      }]
    }
  })
}

module.exports = (message, client) => {
  Who(message, client)
  return;
}
