const sql = require("sqlite");
sql.open("../score.sqlite");
const settings = require('../settings.json');
const chalk = require ('chalk');
let curren = ":tickets:"
let chatBit = ":eye_in_speech_bubble:"
let noDuck = new Set();
const springSeason = [
  'Exploded the Wild Turkey',
  'Chopped up the Wild Turkey',
  'Roasted the Wild Turkey',
  'Sautee\'d the Wild Turkey',
  'Grilled the Wild Turkey',
  'BBQ\'d the Wild Turkey',
  'Slapped tons of sauce on the Turkey',
  'Munched on some Turkey'
]
const duckSeason = [
  'exploded the duck',
  'quack quack smacked that duck',
  'made the duck quack',
  'popped a cap in the duck',
  'made the duck disappear',
  'slapped that duck',
  'ran over the duck',
  'put the duck in lava',
  'punched the duck in the face',
  'bit clean through the duck\'s neck',
  'drowned the duck'
]
const HalloweenA = [
  'Look out!',
  'Oh jeez!',
  'Yikes!',
  'Holy Smokes, Batman!',
  'Look, Morty!',
  'o_O,',
  'Cool!',
  'Huh?',
  'Spooky!',
  'Haha!',
]
const HalloweenB = [
  'Jack-O-Lantern!',
  'Wild Turkey!',
  'Unattended Candy Jar!',
  'Sabre Costume!',
  'Walkey-Talkey!',
  'Cat!',
  'Wand of Wizardry!',
  'Ghost...',
  'Shadow!',
  'Ticket Jar!',
  'Doctor Pepper!',
  'Peach Fuzz!',
  'Pom Poms!',
  'Alaskan ID Card!',
  'Portable Light!',
  'Cellphone!',
  'Adult Drink!',
  'KitKat!',
  'Snickers!',
  'Skittles!',
  'Fizzy Drink!',
  'Candy!',
  'Candy Bag!',
  'Staff of Power!',
  'Fairy-Catching Net!',
  'Book of Shadows!',
  'Sword of Lightning!',
  'Gameboy Advanced!',
  'Pizza!',
  'Ouija Board!'
]
const HalloweenC = [
  'decides to throw it into David\'s Netherworld. Ain\'t that Dandy?',
  'uses their mystical powers to make it explode. It will not be missed!',
  'invokes mathematical monkeys to turn it into code. The answer is Pi.',
  'threw it into a pit of lava, yelling \'My Precioussssss!\'',
  'made some slight modifications with a Light Saber.',
  'called upon the ghosts to take it far away!',
  'hit it with a bow and arrow. It spontaneously combusts!',
  'threw salt on it. Wasn\'t very effective!',
  'got too scared to continue.'
]
function Rand(data) {
  // where data is the array
  return data[Math.floor(Math.random() * data.length)]
}
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
        var now = new Date();
        var milli = now.getMilliseconds(),
        sec = now.getSeconds(),
        min = now.getMinutes(),
        hou = now.getHours(),
        mo = now.getMonth(),
        dy = now.getDate(),
        yr = now.getFullYear();
        //message.channel.send(`The collected message was: ${collected.first().content}`);
        var subDate = new Date().getTime()
        // Check date -> provide response
        if (mo <= 3) {
          message.channel.send(`${collected.first().author} ${Rand(springSeason)} ${message.author} released. It took ${(subDate - startDate / 1000)} Seconds.`)
        } else if (mo <= 7) {
          message.channel.send(`${collected.first().author} ${Rand(duckSeason)} ${message.author} released. It took ${(subDate - startDate) / 1000} Seconds.`)
        } else if (mo <= 8) {
          message.channel.send(`${collected.first().author} ${Rand(HalloweenA)} It's ${message.author}'s ${HalloweenB} ${collected.first().author} ${HalloweenC}`)
        } else {
          message.channel.send(`Something for Christmas goes here. Snowmen and such.`)
        }
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
