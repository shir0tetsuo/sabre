// ctrl-p = find a file
const sql = require("sqlite");
sql.open("../score.sqlite");
const settings = require('../settings.json');
const chalk = require ('chalk');
let curren = ":tickets:"
let chatBit = ":eye_in_speech_bubble:"
const Tran = require('../sys/TRANSACTIONS.js')

exports.run = (client, message, params) => {
  sql.get(`SELECT * FROM hyperlevels WHERE userId = "${message.author.id}"`).then(hl => {
    if (!hl) {
      return message.reply(`\`ERROR\` HyperLevel requirement not met`)
    }
    // Set hyperlevel requirement here (hl.hlvl >= int)
    if (hl.hlvl !== 0 && hl.spaceA >= 2) {
      var person = message.mentions.members.first();
      if (!person || person === undefined || person === null) {
        message.channel.send(`OOOOOH! WOOOOAAAAAAAH! HELLOOOO! (-2 :pound:) ${message.author}!\n\`next\``)
        Tran(message, "hdtk", -2)
        message.channel.awaitMessages(response => response.author.id === message.author.id), {
          max: 1,
          time: 30000,
          errors: ['time']
        }
        .then(collected => {
          const msg = collected.first();
          const input = msg.content.toLowerCase();
          // init
          msg.reply(`TRICK OR TREAT! LET'S SEE.. HMM.. AHH! YES!\n\`1500000 Sabre Tickets!\``)
          Tran(message, "tk", 1500000)
        })
        .catch(() => {
          console.error;
          message.channel.send(`**${message.author.username}** wasn't able to respond.`);
        })
      } else {
        Tran(message, "hdtk", 2, person)
        Tran(message, "hdtk", -2)
        message.channel.send(`${person} was given 2 HYPERTICKETS!`)
      }
    } else {
      return message.reply(`\`ERROR\` You need 2 Dark Tickets.`)
    }
  })
};

/*
enabled, guildOnly, aliases, permission level
*/
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['spk', 'spook'],
  permLevel: 0
};

/*
name, desc., usage
name is also the command alias
*/
exports.help = {
  name: 'spooky',
  description: '(HL1)',
  usage: 'spooky [@user]'
};
