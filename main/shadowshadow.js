const settings = require('../settings.json');
const chalk = require ('chalk');
const ssword = require("../sys/shadowshadow.json")

exports.run = (client, message, params) => {
  if (!params[0]) return; //oops is a toggle
  if (message.guild.id !== settings.alaskaguild) return message.reply("This is an Alaska Only Command!")

  if (params[0] === "notmeproblem" || params[0] === "mute" || params[0] === "david" || params[0] === "nick" || params[0] === "echo") { // oops removed
    let person = message.mentions.members.first();
    if (person === undefined) return message.reply("`ERROR` No User Mentioned")
    // Line above defines person
    // Everything else below
    //setRoles or addRole
    var shadow = ssword.strings[Math.floor(Math.random() * ssword.strings.length)]
    var shadowb = ssword.strings[Math.floor(Math.random() * ssword.strings.length)]

    if (params[0] === "notmeproblem") {
      let davidsplace = message.guild.roles.find("name", "David's netherworld")
      message.reply("Summoned the power of the Shadow Sword on Tag: " + person + ", `Access Granted` ```markdown\n.\n" + shadow.text + " " + person.displayName + " Was sent far, far away. " + shadowb.text + "\n.\n.```").then(function (message) {
        message.react("☢")
        message.react("☣")
      })
      person.setRoles([davidsplace]).catch(console.error)

    } else if (params[0] === "mute") {
      message.reply("Summoned the power of the Shadow Sword on Tag: " + person + ", `Access Granted` ```markdown\n.\n" + shadow.text + " " + person.displayName + " Was silenced. " + shadowb.text + "\n.\n```").then(function (message) {
        message.react("🤐")
        message.react("🌃")
      })
      let badboy = message.guild.roles.find('name', 'Bad Boy')
      let muted = message.guild.roles.find('name', 'Muted')
      let grounded = message.guild.roles.find('name', 'Grounded')
      member.setRoles([badboy, muted, grounded]).catch(console.error)

    } else if (params[0] === "echo") {
      message.reply(person.roles.map(role => role.name))
      console.log(person.roles)
      //message.reply("Role data was forwarded to console!")

    } else if (params[0] === "david") {
      message.channel.send(`<@!${settings.davidid}> Your presence is required!`)

    } else if (params[0] === "nick") {
      message.channel.send(`<@!${settings.nickid}> Your presence is required!`)
    }

  } else return message.reply("`ERROR` The command was not understood!")
  console.log(new Date())
  console.log(chalk.greenBright(message.member.displayName), chalk.yellow(message.content), chalk.blueBright(message.guild.name, message.channel.name));
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['Shadowshadow', 'ss'],
  permLevel: 4
};

exports.help = {
  name: 'shadowshadow',
  description: 'Bringing down the Hammer of Justice since 1994. PermLVL 4.',
  usage: 'shadowshadow [mute/notmeproblem/echo/david/nick] [@user] :: notmeproblem = david\'s netherworld :: echo sends role data to console :: names summon user'
};
