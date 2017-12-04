// ctrl-p = find a file
const sql = require("sqlite");
sql.open("../score.sqlite");
const settings = require('../settings.json');
const chalk = require ('chalk');
let curren = ":tickets:"
let chatBit = ":eye_in_speech_bubble:"

function Cryptographic(xlen) {
  if (!xlen) var xlen = 1
    var charset = "0123456789 XY+-Oo.eE=/",
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
  if (message.guild.id !== settings.davnetguild) return message.reply(`\`Access Denied\` This is a DAVNET command.`);
  if (!message.mentions.members.first() || message.mentions.members.first() === undefined || message.mentions.members.first() === null) return message.reply(`\`ERROR\` No Mention.`)
  //console.log(`${message.author.tag} ${message.channel.name} ${message.guild.name} OPER: exfil ${message.content}`)
  person = message.mentions.members.first();
  referendum = Cryptographic(19);
  passcode = PC(5);
    var ExfilToken = ``;
    var ExfilMessage = `:no_pedestrians: <@!${settings.ownerid}>\n\`\`\`diff\n`;
    ExfilMessage += `- Warning!\`\`\``
    ExfilMessage += `__\`\`\`diff\n`
    ExfilMessage += `- AUTHORIZATION REQUIREMENT UNMET -\`\`\`__\`\`\`md\n`
    ExfilMessage += `[!]: ACTION REQUIRED!\n`
    ExfilMessage += `[#]: REFERENCE ID:\n\n`
    ExfilMessage += `* ${referendum}\n\n`
    ExfilMessage += `[U]: ${person.tag} ${person.displayName}\n`
    ExfilMessage += `[R]: ${message.content.split(` `).slice(2).join(` `)}\`\`\``
    ServerAdmin = client.users.get(settings.ownerid)
    ServerAdmin.send(`${passcode}`).catch(console.error)
    message.channel.send(`${ExfilMessage}`)
};

/*
enabled, guildOnly, aliases, permission level
*/
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['exfil', 'exf'],
  permLevel: 3
};

/*
name, desc., usage
name is also the command alias
*/
exports.help = {
  name: 'exfiliate',
  description: 'Authentication-required Banhammer.',
  usage: 'exfiliate [user] (reason)'
};
