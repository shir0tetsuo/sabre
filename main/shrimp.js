const sql = require("sqlite");
sql.open("../score.sqlite");
const settings = require('../settings.json');
const chalk = require ('chalk');
let curren = ":tickets:"
let chatBit = ":eye_in_speech_bubble:"

function Rand(data) {
  return data[Math.floor(Math.random() * data.length)]
}

const cooktype = [
  'barbecue\'d',
  'boiled',
  'broiled',
  'baked',
  'sautee\'d'
]
const returned = [
  'Shrimp-Kabobs!',
  'Shrimp Creole!',
  'Shrimp Gumbo!',
  'Pan Fried Shrimp!',
  'Deep Fried Shrimp!',
  'Stir-Fried Shrimp!',
  'Pineapple Shrimp!',
  'Lemon Shrimp!',
  'Coconut Shrimp!',
  'Pepper Shrimp!',
  'Shrimp Soup!',
  'Shrimp Stew!',
  'Shrimp Salad!',
  'Ordinary Shrimp!'
]

exports.run = (client, message, params) => {
  message.channel.send(`${message.author} ${Rand(cooktype)} dat Shrimp. Made some ${Rand(returned)}`)
};

/*
enabled, guildOnly, aliases, permission level
*/
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['shrmp'],
  permLevel: 0
};

/*
name, desc., usage
name is also the command alias
*/
exports.help = {
  name: 'shrimp',
  description: 'Make different kinds of Shrimp.',
  usage: 'shrimp'
};
