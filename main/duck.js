const sql = require("sqlite");
sql.open("../score.sqlite");
const settings = require('../settings.json');
const chalk = require ('chalk');
let curren = ":tickets:"
let chatBit = ":eye_in_speech_bubble:"
let noDuck = new Set();
function scoreUpTicket(mess, xval) {
  if (!xval) var xval = 1
  sql.get(`SELECT * FROM scores WHERE userId = "${mess.author.id}"`).then(row => {
    sql.run(`UPDATE scores SET tickets = ${row.tickets + xval*1} WHERE userId = ${mess.author.id}`)
  })
}

exports.run = (client, message, params) => {
  if (noDuck.has(message.author.id)) {
    message.reply(`\`You must wait at least 10 seconds before releasing another duck!\``)
  } else {
    noDuck.add(message.author.id);
    setTimeout(() => {
      noDuck.delete(message.author.id)
    }, 10000)
    var startDate = new Date().getTime()
    message.channel.send('A random duck was released. `Typing quack will shoot the duck.`')
  .then(() => {
    message.channel.awaitMessages(response => response.content === 'quack', {
      max: 1,
      time: 60000,
      errors: ['time'],
    })
    .then((collected) => {
        //message.channel.send(`The collected message was: ${collected.first().content}`);
        var subDate = new Date().getTime()
        message.channel.send(`${collected.first().author} exploded the duck ${message.author} released. It took ${(subDate - startDate) / 1000} Seconds.`)
      })
      .catch(() => {
        var active = `${message.guild.members.filter(m => m.presence.status == 'online').size}`
        var winfloor = (active * 1) + 1
        message.channel.send(`The duck got away. ${message.author} gained ${winfloor}${curren}.`);
        scoreUpTicket(message, winfloor)
      });
  });

  }
};

/*
enabled, guildOnly, aliases, permission level
IMPLEMENT HOW MANY PEOPLE ARE CURRENTLY ONLINE INTO THE CALCULATIONS VIA STATS AS REFERENCE
DONE

MAKE A TIMER SO PEOPLE CAN'T USE THIS COMMAND EVERY FIVE BLOODY SECONDS
DONE

Randomized responses for releasing and exploding ducks
*/
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['quack'],
  permLevel: 0
};

/*
name, desc., usage
name is also the command alias
*/
exports.help = {
  name: 'duck',
  description: 'Releases a random duck.',
  usage: 'duck\nA duck is released :: If by 60 seconds pass and nobody types quack the person who released the duck gets tickets.'
};
