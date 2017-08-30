const sql = require("sqlite");
sql.open("../score.sqlite");
const settings = require('../settings.json');
const chalk = require ('chalk');
let curren = ":tickets:"
let chatBit = ":eye_in_speech_bubble:"

function scoreDisplay(mess) {

}
exports.run = (client, message, params) => {
  if (message.member === null) return;
  let permlvl = 0;
  let basic_alaska = message.guild.roles.find('name', settings.basicroleALASKA);
  let basic_davnet = message.guild.roles.find('name', settings.basicroleDAVNET);
  if (basic_alaska && message.member.roles.has(basic_alaska.id)) permlvl = 1;
  if (basic_davnet && message.member.roles.has(basic_davnet.id)) permlvl = 1;
  let mod_role = message.guild.roles.find('name', settings.modrolename);
  let mod_davnet = message.guild.roles.find('name', settings.modrolenameDAVNET);
  if (mod_role && message.member.roles.has(mod_role.id)) permlvl = 2;
  if (mod_davnet && message.member.roles.has(mod_davnet.id)) permlvl = 2;
  let admin_role = message.guild.roles.find('name', settings.adminrolename);
  let admin_davnet = message.guild.roles.find('name', settings.adminrolenameDAVNET);
  if (admin_role && message.member.roles.has(admin_role.id)) permlvl = 3;
  if (admin_davnet && message.member.roles.has(admin_davnet.id)) permlvl = 3;
  if (message.author.id === settings.ownerid) permlvl = 4;
  if (message.author.id === settings.davidid) permlvl = 4;
  if (message.author.id === settings.nickid) permlvl = 4;
  if (message.author.id === settings.danid) permlvl = 4;
  if (permlvl === 0) {
    var barCol = 0x36786A
  } else if (permlvl === 1) {
    var barCol = 0x366394
  } else if (permlvl === 2) {
    var barCol = 0x802D32
  } else if (permlvl === 3) {
    var barCol = 0x992D22
  } else if (permlvl === 4) {
    var barCol = 0x00FF00
  }
  let mess = message
  sql.get(`SELECT * FROM scores WHERE userId = "${mess.author.id}"`).then(row => {
    if (!row) return mess.reply("Your current level is 0.");
    //console.log(mess.author.id, row.level, row.tickets, row.chatBits)
    mess.reply("Calculating!").then(m => m.edit({embed: {
      color: barCol,
      timestamp: new Date(),
      description: `Sabre Levels; v${settings.version}`,
    /*  footer: {
        icon_url: client.user.avatarURL,
        text: client.user.username
      },*/ // Footer was removed: promise rejection from client
      author: {
        name: mess.member.displayName,
        icon_url: mess.author.avatarURL
      },
      fields: [
        {
          name: `:small_orange_diamond:: Level`,
          value: "```" + row.level + "```",
          inline: true
        },
        {
          name: `${curren}: Tickets`,
          value: "```" + row.tickets + "```",
          inline: true
        },
        {
          name: `${chatBit}: Bytes`,
          value: "```" + row.chatBits + "```",
          inline: true
        },
        {
          name: "Ranking for: " + mess.author.tag + "\u200b",
          value: `System returned message in ${m.createdTimestamp - mess.createdTimestamp}ms.`
        }
      ]
    }}))
    if (mess.author.id === settings.ownerid) {
      mess.reply("is the Main Developer!")
    }
  }).catch(function() {
    console.log(chalk.redBright("Bug at levels"))
  })
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['levels', 'lvl'],
  permLevel: 1
};

exports.help = {
  name: 'level',
  description: 'Displays a user\'s Sabre Level. PermLVL 1.',
  usage: 'level'
};
