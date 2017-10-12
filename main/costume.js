const sql = require("sqlite");
sql.open("../score.sqlite");
const settings = require('../settings.json');
const chalk = require ('chalk');
let curren = ":tickets:"
let chatBit = ":eye_in_speech_bubble:"

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
    /*
      The following is test data.
    */
    const fsn = require('fs-nextra');
    const snek = require('snekfetch');
    const getAchievement = async (text, person) => {
      const plate = await fsn.readFile('./main/sabreCard/testcard.png');
      const png = person.replace(/\.gif.+/g, '.png');
      const { body } = await snek.get(png);
      return new Canvas(320, 64)
        .addImage(plate, 0, 0, 320, 64)
        .addImage(body, 16, 16, 32, 32, { type: 'round', radius: 16 })
        .restore()
        //.setTextFont('12pt Minecraftia')
        .setColor('#FFFFFF')
        .addText(text, 60, 58)
        .toBuffer();
    };
    const person = (message.mentions.users.first() || message.author).displayAvatarURL;
    const text = "TEST"
    const result = getAchievement(text, person);
    message.channel.send({ files: [{ attachment: result, name: 'achievementGet.png' }] });
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
  usage: 'costume\nNew Costume :: costume new [desc (description) / nick (nickname) / avatar (avatar URL)]'
};
