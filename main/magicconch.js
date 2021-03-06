const sql = require("sqlite");
sql.open("../score.sqlite");
const settings = require('../settings.json');
const chalk = require ('chalk');
let curren = ":tickets:"
let chatBit = ":eye_in_speech_bubble:"
function Rand(data) {
  // where data is the array
  return data[Math.floor(Math.random() * data.length)]
}
const answers = [
  'Maybe someday.',
  'Nothing.',
  'Neither.',
  'I don\'t think so.',
  'No.',
  'Yes.',
  'Maybe.',
  'Try asking again.'
]

exports.run = (client, message, params) => {
  if (message.content.toLowerCase().includes('nuk')) {
    message.channel.send({embed: {
      color: 0xd742b2,
      timestamp: new Date(),
      description: `${message.member.displayName} Asked: ${params.join(' ')}\nConch says: Yes.`
    }})
    return;
  }
  message.channel.send({embed: {
    color: 0xd742b2,
    timestamp: new Date(),
    description: `${message.member.displayName} Asked: ${params.join(' ')}\nConch says: ${Rand(answers)}`
  }})
};

/*
enabled, guildOnly, aliases, permission level
*/
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['conch'],
  permLevel: 0
};

/*
name, desc., usage
name is also the command alias
*/
exports.help = {
  name: 'magicconch',
  description: 'Ask a Question for the Magic Conch.',
  usage: 'magicconch [question]'
};
