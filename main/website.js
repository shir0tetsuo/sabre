const sql = require("sqlite");
sql.open("../score.sqlite");
var exec = require('child_process').exec;
const settings = require('../settings.json');
const chalk = require ('chalk');
let curren = ":tickets:"
let chatBit = ":eye_in_speech_bubble:"

exports.run = (client, message, params) => {
  const permlvl = client.elevation(message)
  if (permlvl >= 4 && params[0] === "commit") {
    exec(`../www/cpsite.s`,
      function(error, stdout, stderr) {
        message.author.send(stdout)
        console.log(error)
      })
  } else {
    exec(`echo "http://$(curl icanhazip.com)/sabre"`,
      function(error, stdout, stderr) {
        message.author.send(stdout)
      })
  }
};

/*
enabled, guildOnly, aliases, permission level
*/
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['sabreweb', 'www', 'webpage', 'web'],
  permLevel: 1
};

/*
name, desc., usage
name is also the command alias
*/
exports.help = {
  name: 'website',
  description: 'Sabre\'s official webpage.',
  usage: 'website\nCommit Changes to Web Server :: website commit'
};
