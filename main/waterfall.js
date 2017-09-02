const settings = require('../settings.json');
const chalk = require ('chalk');
const sql = require("sqlite");
sql.open("../score.sqlite");
exports.run = (client, message, params) => {
  if (params[0] === undefined) return message.reply("`ERROR` Can't play option-less.")
  if (params[0] === "usage" || params[0] === "help") {
    message.channel.send({embed: {
      color: 0x4D94E6,
      timestamp: new Date(),
      footer: {
        text: "Waterfall Usage"
      },
      author: {
        name: message.member.displayName + " --- Waterfall Card Game Instructions",
        icon_url: message.author.avatarURL
      },
      fields: [
        {
          name: "How the Game Works",
          value: "A set of 5 cards are randomly generated. Your objective is to clear the game's 5 cards."
        },
        {
          name :"Whatnow?",
          value: "You can clear a card and move onto the next by guessing if the next card that will replace the current card will be higher or lower valued."
        },
        {
          name: "What happens if I get it wrong?",
          value: "You have to go back to the beginning and start over."
        },
        {
          name: "What happens if the card is the same value?",
          value: "You continue but are penalized."
        },
        {
          name: "Commands?",
          value: "See " + settings.prefix + "help waterfall"
        }
      ]
    }})
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['wf'],
  permLevel: 1
};

exports.help = {
  name: 'waterfall',
  description: 'Waterfall Game. See wf usage. PermLVL 1.',
  usage: 'wf [new/end/usage/view/high/low]'
};
