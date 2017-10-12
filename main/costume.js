const sql = require("sqlite");
sql.open("../score.sqlite");
const settings = require('../settings.json');
const chalk = require('chalk');
let curren = ":tickets:"
let chatBit = ":eye_in_speech_bubble:"
const Discord = require ("discord.js"); // discord client

function costumeTable(message) {
  message.reply(`\`WARN: Database Creation\``)
  sql.run(`CREATE TABLE IF NOT EXISTS costume (userId TEXT, oNick TEXT, nNick TEXT, avURL TEXT, desc TEXT)`).then(() => {
    let nil = "NULL"
    sql.run(`INSERT INTO costume (userId, oNick, nNick, avURL, desc) VALUES (?, ?, ?, ?, ?)`, [message.author.id, message.member.displayName, nil, nil, nil])
  })
}

function mungeC(message, c) {
  var uid = c.userId,
    origNick = c.oNick,
    setNick = c.nNick,
    avURL = c.avURL,
    cDescription = c.desc;
    if (origNick === "NULL" || setNick === "NULL" || avURL === "NULL" || cDescription === "NULL") {
      return message.reply(`\`ERROR\` Insufficient Configuration!`)
    } else {
      const embed = new Discord.RichEmbed()
        .setTitle(`${origNick}'s Costume __(**${setNick}**)__`)
        .setColor(0x0aaa79)
        .setAuthor(`${message.member.displayName}, Here's`)
        .setThumbnail(`${avURL}`)
        .setTimestamp()
        .addField('Description', `${cDescription}`)
      message.channel.send({ embed });
    }
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
    ////////////////////////////////////////////////////////////////////////////
    // New Description
    if (params[0] === 'new' && params[1] === 'desc') {
      sql.get(`SELECT * FROM costume WHERE userId = "${message.author.id}"`).then(c => {
        if (!c) {
          costumeTable(message);
        }
        if (params.slice(2).join(' ').length > 128) {
          return message.reply(`\`ERROR\` Your description can only be 128 characters in length.`)
        } else {
          sql.run(`UPDATE costume SET desc = "${params.slice(2).join(' ')}" WHERE userId = "${message.author.id}"`)
          return message.reply(`\`SUCCESS\` Description appended.\n"${params.slice(2).join(' ')}"`)
        }
      }).catch(() => {
        console.error;
        console.log(chalk.redBright(`Database Created for costume`))
        costumeTable(message)
      })
      //////////////////////////////////////////////////////////////////////////
      // Set/Revert Nickname
    } else if (params[0] === 'revert' || params[0] === 'set') {
      sql.get(`SELECT * FROM costume WHERE userId = "${message.author.id}"`).then(c => {
        if (!c) {
          costumeTable(message);
        }
        if (params[0] === 'set') {
          // Make Sabre set nickname from data and ADD NEW NICKNAME
          message.author.setNickname(`${c.nNick}`);
          message.reply(`Done!`)
        } else if (params[0] === 'revert') {
          message.author.setNickname(`${c.oNick}`);
          message.reply(`Done!`)
        }
      }).catch(() => {
        console.error;
        console.log(chalk.redBright(`Database Created for costume`))
        costumeTable(message)
      })
      //////////////////////////////////////////////////////////////////////////
      // NEW Nickname
    } else if (params[0] === 'new' && params[1] === 'nick') {
      sql.get(`SELECT * FROM costume WHERE userId = "${message.author.id}"`).then(c => {
        if (!c) {
          costumeTable(message);
        }
        if (params.slice(2).join(' ').length > 15) {
          message.reply(`\`ERROR\` Cannot be over 15 characters in length.`)
        } else {
          sql.run(`UPDATE costume SET oNick = "${message.member.displayName}" WHERE userId = "${message.author.id}"`)
          sql.run(`UPDATE costume SET nNick = "${params.slice(2).join(' ')}" WHERE userId = "${message.author.id}"`)
          message.reply(`\`SUCCESS\` Nickname data appended (${params.slice(2).join(' ')})`)
        }
      }).catch(() => {
        console.error;
        console.log(chalk.redBright(`Database Created for costume`))
        costumeTable(message)
      })
    } else if (params[0] === 'new' && params[1] === 'avatar') {
      sql.get(`SELECT * FROM costume WHERE userId = "${message.author.id}"`).then(c => {
        if (!c) {
          costumeTable(message)
        }
        sql.run(`UPDATE costume SET avURL = "${params.slice(2).join('%20')}" WHERE userId = "${message.author.id}"`)
        message.reply(`\`SUCCESS\` Avatar set to ${params.slice(2).join('%20')}`)
      })
    } else if (params[0] === 'view') {
      if (message.mentions.members.first() !== undefined) {
        var person = message.mentions.members.first()
        sql.get(`SELECT * FROM costume WHERE userId = "${person.id}"`).then(c => {
          if (!c) {
            return message.reply(`\`ERROR\` This user isn't festive (costume missing!)`)
          } else {
            mungeC(message, c)
          }
        }).catch(() => {
          console.error;
          console.log(chalk.redBright(`Database Created for costume`))
          costumeTable(message)
        })
      } else {
        return message.reply(`\`ERROR\` No user specified!`)
      }

    } else {
      // Print existing data, check if all variables are set
      sql.get(`SELECT * FROM costume WHERE userId = "${message.author.id}"`).then(c => {
        if (!c) {
          return message.reply(`\`ERROR\` Did you run the configurations first?`)
        } else {
          mungeC(message, c)
        }

        // displayName = oNick/nNick

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
