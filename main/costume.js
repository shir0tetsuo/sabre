const sql = require("sqlite");
sql.open("../score.sqlite");
const settings = require('../settings.json');
const chalk = require ('chalk');
let curren = ":tickets:"
let chatBit = ":eye_in_speech_bubble:"

function costumeTable(message) {
  sql.run(`CREATE TABLE IF NOT EXISTS costume (userId TEXT, oNick TEXT, nNick TEXT, avURL TEXT, desc TEXT)`).then(() => {
    let nil = "NULL"
    sql.run(`INSERT INTO costume (userId, oNick, nNick, avURL, desc) VALUES (?, ?, ?, ?, ?)`, [message.author.id, message.member.displayName, nil, nil, nil])
  })
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
      sql.get(`SELECT * FROM costume WHERE userId = "${message.author.id}"`).then(c => {
        if (!c) {
          costumeTable(message);
        }
        if (params.slice(2).length > 128) {
          return message.reply(`\`ERROR\` Your description can only be 128 characters in length.`)
        } else {
          sql.run(`UPDATE costume SET desc = "${params.slice(2)}" WHERE userId = "${message.author.id}"`)
          return message.reply(`\`SUCCESS\` Description appended.\n"${params.slice(2)}"`)
        }
      })
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

        // displayName = oNick/nNick
        var uid = c.userId,
          origNick = c.oNick,
          setNick = c.nNick,
          avURL = c.avURL,
          cDescription = c.desc;

        if (origNick === "NULL" || setNick === "NULL" || avURL === "NULL" || cDescription === "NULL") {
          return message.reply(`\`ERROR\` Missing Configuration! See manual.`)

        } else {
          message.channel.send(`${uid} ${origNick} ${setNick} ${avURL} ${cDescription}`)
          // MUNGE ALL DATA
        }
        // put a catch to create a db or table on each i/o
      }).catch(() => {
        console.error;
        console.log(chalk.redBright(`Database Created for costume`))
        costumeTable(message)
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
