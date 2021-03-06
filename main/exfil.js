// ctrl-p = find a file
const sql = require("sqlite");
sql.open("../score.sqlite");
const settings = require('../settings.json');
const chalk = require ('chalk');
let curren = ":tickets:"
let chatBit = ":eye_in_speech_bubble:"

// "id" / settings.x-id
const Authorized = [
  settings.ownerid,
  settings.starid,
  settings.drbid
]

function Cryptographic(xlen) {
  if (!xlen) var xlen = 1
    var charset = "0123456789 XY+-Oo.eE=/Z",
        retVal = "";
    for (var i = 0, n = charset.length; i < xlen; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}
function PC(xlen) {
  if (!xlen) var xlen = 1
    var charset = "0123456789ABCDEF",
        retVal = "";
    for (var i = 0, n = charset.length; i < xlen; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}

exports.run = (client, message, params) => {
  //if (message.guild.id !== settings.davnetguild) return message.reply(`\`Access Denied\` This is a DAVNET command.`);
  if (!message.mentions.members.first() || message.mentions.members.first() === undefined || message.mentions.members.first() === null) return message.reply(`\`ERROR\` No Mention.`)
  //console.log(`${message.author.tag} ${message.channel.name} ${message.guild.name} OPER: exfil ${message.content}`)
  person = message.mentions.members.first();
  referendum = Cryptographic(18);
  passcode = PC(5);
  const inter = 120000;
  var MU = message.guild.roles.find("name", "Muted")
  if (!MU || MU === undefined) {
    message.guild.createRole().then(role => {
      role.edit({
                  name: "Muted",
                  color: 0x454647,
                  mentionable: false
      })
    }).then(() => {
      MU = message.guild.roles.find("name", "Muted")
      message.channel.send(`\`Role Created: Muted\``)
    })
  }//return message.reply(`\`FATAL\` Cannot find \`Muted\` role.`);
  var personroles = person.roles.map(role => role.name).join(`, `)
  const secbotChan = message.guild.channels.find('name', 'security-bot');
  if (!secbotChan || secbotChan === undefined) {
    message.guild.createChannel('security-bot', 'text').then(ch => {
      ch.overwritePermissions(message.guild.roles.find("name", "Sabre"), {
        READ_MESSAGES: true,
        SEND_MESSAGES: true,
        READ_MESSAGE_HISTORY: true,
        MENTION_EVERYONE: true,
        ADD_REACTIONS: true,
        MANAGE_ROLES_OR_PERMISSIONS: true,
        ATTACH_FILES: true
      })
      ch.overwritePermissions(message.guild.id, {
        READ_MESSAGES: false,
        READ_MESSAGE_HISTORY: false,
        SEND_MESSAGES: false
      }).then(() => {
        message.channel.send(`\`Channel Created: security-bot\``)
        secbotChan = message.guild.channels.find('name', 'security-bot')
      })
    })
  }
    const permlvl = client.elevation(message)
    var ExfilMessage = `:no_pedestrians:\n**\`\`\`diff\n`
    ExfilMessage += `- Authorization Required -\n`
    ExfilMessage += `- ////////////////////// -\n\n`
    ExfilMessage += `-      SYSTEM READY      -\n`
    ExfilMessage += `- ////////////////////// -\`\`\`**\`\`\`md\n`
    ExfilMessage += `[#]: ${referendum}\n`
    ExfilMessage += `[U]: ${person.user.tag} (${person.displayName})\n`
    ExfilMessage += `[R]: ${message.content.split(` `).slice(2).join(` `).substring(0, 300)}\`\`\``

    message.channel.send(`${ExfilMessage}`).then(() => {
      ExfilMessage += `\`\`\`md\n[A]: ${passcode}\n[C]: ${message.channel.name}, ${message.guild.name}\n[T]: ${new Date()}\n[!]: ${message.author.tag} (${message.member.displayName})\n[P]: ${permlvl}\`\`\``
      ExfilMessage += `\`Action Required: Event expires in ${inter/1000}SEC.\``
      for (i = 0; i < Authorized.length; i++) {
        client.users.get(Authorized[i]).send(`${ExfilMessage}`)
      }
      message.channel.awaitMessages(response => response.content.startsWith(passcode), {
        max: 1,
        time: inter,
        errors: ['time']
      })
      .then((collected) => {
        message.channel.send(`**\`\`\`diff\n+ AUTHENTICATED\n+ ${referendum}\n- COMMENCING ELIMINATION OF ILLEGAL RESIDENCE\n-- ${person.user.tag} (${person.displayName})\`\`\`**`).then(() => {
          if (secbotChan !== null && secbotChan !== undefined) {
            secbotChan.send(`${ExfilMessage}\`\`\`diff\n+ Mute-Zoned.\n- ${personroles}\`\`\``)
          } else {
            message.channel.send(`\`${referendum} (${personroles})\``)
          }
          person.setRoles([MU]).catch(console.error)
        })
      })
      .catch(() => {
        message.channel.send(`\`\`\`diff\n- AUTHENTICATION FAILURE\n- ${referendum}\n- ${person.user.tag} (${person.displayName})\n- No action was taken.\`\`\``)
      })
    })
    //ServerAdmin = client.users.get(settings.ownerid)
    //ServerAdmin.send(`${passcode}`).catch(console.error)

};

/*
enabled, guildOnly, aliases, permission level
*/
exports.conf = {
  enabled: false,
  guildOnly: false,
  aliases: ['exfil', 'exf'],
  permLevel: 0
};

/*
name, desc., usage
name is also the command alias
*/
exports.help = {
  name: 'exfiliate',
  description: 'Authentication-required Mutehammer.',
  usage: 'exfiliate [user] (reason)\n\n[#] :: Unique Pattern\n[U] :: Mentioned User\n[R] :: Reason\n\n[A] :: Authentication Key\n[C] :: Channel Information\n[T] :: Timestamp\n[!] :: User running Command\n[P] :: Execution Permission Level\n'
};
