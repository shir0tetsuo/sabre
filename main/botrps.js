const settings = require('../settings.json');
const chalk = require ('chalk');
exports.run = (client, message, params) => {
  var rpsmat = [ { ans: "rock" }, { ans: "paper" }, { ans: "scissors" } ];
  var rpsmat = rpsmat[Math.floor(Math.random() * rpsmat.length)];
  if (params[0] === null) return message.reply("Need `rock / paper / scissors`!");
  let rpsinput = params[0]
  let botwin = "Ha! I won against you with "
  let botlose = "Ouch! I lost because I had "
  if (rpsinput === "rock" || rpsinput === "paper" || rpsinput === "scissors") {
    if (rpsinput === rpsmat.ans) {
      message.reply(rpsmat.ans + " was also my answer!")
    } else if (rpsinput === "rock" && rpsmat.ans === "paper") {
      message.reply(botwin + rpsmat.ans)
    } else if (rpsinput === "rock" && rpsmat.ans === "scissors") {
      message.reply(botlose + rpsmat.ans)
    } else if (rpsinput === "paper" && rpsmat.ans === "rock") {
      message.reply(botlose + rpsmat.ans)
    } else if (rpsinput === "paper" && rpsmat.ans === "scissors") {
      message.reply(botwin + rpsmat.ans)
    } else if (rpsinput === "scissors" && rpsmat.ans === "paper") {
      message.reply(botlose + rpsmat.ans)
    } else if (rpsinput === "scissors" && rpsmat.ans === "rock") {
      message.reply(botwin + rpsmat.ans)
    }
  } else {
    message.reply("The argument was not understood!")
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['rps'],
  permLevel: 1
};

exports.help = {
  name: 'botrps',
  description: 'Play Rock Paper Scissors against the Bot. PermLVL 1.',
  usage: 'botrps <rock/paper/scissors>'
};
