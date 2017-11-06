// ctrl-p = find a file
const sql = require("sqlite");
sql.open("../score.sqlite");
const settings = require('../settings.json');
const chalk = require ('chalk');
let curren = ":tickets:"
let chatBit = ":eye_in_speech_bubble:"

exports.run = (client, message, params) => {
  sql.get(`SELECT * FROM hyperlevels WHERE userId = "${message.author.id}"`).then(hl => {
    if (!hl) return message.reply(`\`ERROR\` Cannot find hyperlevel data.`)
    var AvailableKeys = '';
    var AvailableDark = '';
    const Keys = hl.spaceA*1
    const Dark = hl.spaceB*1
    if (Keys >= 20) {
      AvailableKeys += `20 :key2: \`3,000,000 Sabre Tickets\`\n`
    }
    if (Keys >= 10) {
      AvailableKeys += `10 :key2: \`1,250,000 Sabre Tickets\`\n`
    }
    if (Keys >= 5) {
      AvailableKeys += `5 :key2: \`500,000 Sabre Tickets\`\n`
      AvailableKeys += `5 :key2: \`6 Dark Tickets\`\n`
    }
    if (Keys >= 1) {
      AvailableKeys += `1 :key2: \`90,000 Sabre Tickets\`\n`
    }
    if (Keys === 0) {
      AvailableKeys += `You don't have any keys.\n`
    }
    if (Dark >= 20) {
      AvailableDark += `20 :pound: \`20 Quest Keys\`\n`
      AvailableDark += `20 :pound: \`Quest Trophy\``
    }
    if (Dark >= 10) {
      AvailableDark += `10 :pound: \`9 Quest Keys\`\n`
    }
    if (Dark >= 5) {
      AvailableDark += `5 :pound: \`3 Quest Keys\`\n`
    }
    if (Dark === 0) {
      AvailableDark += `You don't have any dark tickets.\n`
    }
    message.channel.send(`${AvailableKeys}${AvailableDark}`)
    // trophies will be obtained by killing quest bosses.
    // Last boss -> LastBoss
    // Trophy -> if (boss) exists lastboss -> trophy
  })
};

/*
enabled, guildOnly, aliases, permission level
*/
exports.conf = {
  enabled: false,
  guildOnly: false,
  aliases: ['dshop', 'hshop'],
  permLevel: 1
};

/*
name, desc., usage
name is also the command alias
*/
exports.help = {
  name: 'darkshop',
  description: 'Trade tickets, keys, and obtain trophies. (HL1)',
  usage: 'darkshop'
};
