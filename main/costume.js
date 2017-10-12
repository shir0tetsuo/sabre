const sql = require("sqlite");
sql.open("../score.sqlite");
const settings = require('../settings.json');
const chalk = require ('chalk');
let curren = ":tickets:"
let chatBit = ":eye_in_speech_bubble:"

function costumeTable(message, uid) {

}

exports.run = (client, message, params) => {
  var now = new Date();
    var milli = now.getMilliseconds(),
    sec = now.getSeconds(),
    min = now.getMinutes(),
    hou = now.getHours(),
    mo = now.getMonth(),
    dy = now.getDate(),
    yr = now.getFullYear();
  if (mo == 9) {
    // RUN
    if (params[0] === 'new' && params[1] === 'desc') {

    } else if (params[0] === 'revert' || params[0] === 'set') {

    } else if (params[0] === 'new' && params[1] === 'nick') {

    } else if (params[0] === 'new' && params[1] === 'avatar') {

    } else if (params[0] === 'view') {

    } else {
      // Print existing data, check if all variables are set
      sql.get(`SELECT * FROM costume WHERE userId = "${message.author.id}"`).then(c => {
        if (!c) {
          return message.reply(`\`ERROR\` Did you run the configurations first?`)
        }
        let uid = message.author.id
        let origin
      })
    }
  } else {
    message.reply(`Halloween's over, my guy`)
  }
};

/*
enabled, guildOnly, aliases, permission level
*/
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['hc'],
  permLevel: 0
};

/*
name, desc., usage
name is also the command alias
*/
exports.help = {
  name: 'costume',
  description: 'Create and display Halloween Costumes.',
  usage: 'costume\nNew Costume :: costume new [desc (description) / nick (nickname) / avatar (avatar URL)]\nSee Costume :: costume view [@user]\nSet/Reset Nickname :: costume [revert/set]'
};
