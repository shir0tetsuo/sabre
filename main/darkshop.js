// ctrl-p = find a file
const sql = require("sqlite");
sql.open("../score.sqlite");
const settings = require('../settings.json');
const chalk = require ('chalk');
const Tran = require ('../sys/TRANSACTIONS.js')
let curren = ":tickets:"
let chatBit = ":eye_in_speech_bubble:"

exports.run = (client, message, params) => {
  sql.get(`SELECT * FROM hyperlevels WHERE userId = "${message.author.id}"`).then(hl => {
    if (!hl) return message.reply(`\`ERROR\` Cannot find hyperlevel data.`)
    var AvailableKeys = '';
    var AvailableDark = '';
    const Keys = hl.spaceA*1
    const Dark = hl.spaceB*1
    pch = params[0]
    if (pch !== null && pch !== undefined) {
      if (Keys >= 20 && pch.toLowerCase() === '20k0') {
        Tran(message, "tk", 3000000)
        Tran(message, "qkey", -20)
        message.reply(`SUCCESS! 20 Quest Keys :key2: were used. Gained 3 Million Sabre Tickets :tickets:!`)
      }
    } else {
      if (Keys >= 20) {
        AvailableKeys += `\`20\` :key2: \`3,000,000 Sabre Tickets\` (20k0)\n`
      }
      if (Keys >= 10) {
        AvailableKeys += `\`10\` :key2: \`1,250,000 Sabre Tickets\` (10k0)\n`
      }
      if (Keys >= 5) {
        AvailableKeys += `\`05\` :key2: \`500,000 Sabre Tickets\` (5k0)\n`
        AvailableKeys += `\`05\` :key2: \`6 Dark Tickets\` (5k1)\n`
      }
      if (Keys >= 1) {
        AvailableKeys += `\`01\` :key2: \`90,000 Sabre Tickets\` (1k0)\n`
      }
      if (Keys === 0) {
        AvailableKeys += `You don't have any keys.\n`
      }
      if (Dark >= 20) {
        AvailableDark += `\`20\` :pound: \`20 Quest Keys\` (20t0)\n`
        AvailableDark += `\`20\` :pound: \`Quest Trophy\` (20t1)\n`
      }
      if (Dark >= 10) {
        AvailableDark += `\`10\` :pound: \`9 Quest Keys\` (10t0)\n`
      }
      if (Dark >= 5) {
        AvailableDark += `\`05\` :pound: \`3 Quest Keys\` (5t0)\n`
      }
      if (Dark === 0) {
        AvailableDark += `You don't have any dark tickets.\n`
      }
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
