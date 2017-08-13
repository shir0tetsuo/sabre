///// file start ///////////////////////////////////////////////////////////////
// Verbose, Client Login and Initialization
// Forewarning: Functions that require external execution are run specifically
// by the developer's system. Custom commands have been created in order to
// handle advanced scripting requests.
////////////////////////////////////////////////////////////////////////////////
console.log("Initialization.")
// Constraints /////////////////////////////////////////////////////////////////
const Discord = require("discord.js"); // Initialize discord wrappers
const client = new Discord.Client(); // New client authorization
// Variable and String Constraints /////////////////////////////////////////////
const config = require("./sabre_init.json") // INIT., Basic Configuration
const keys = require("./token.json") // Secret Keys
const rateme = require("./sabre_rateme.json") // Game
const roast = require("./sabre_roast.json") // Game
const jokes = require("./sabre_jokes.json") // Game
const help = require("./sabre_helpfile.json") // Core help file
// Patch Memory ////////////////////////////////////////////////////////////////
//var sys = require('sys');
////////////////////////////////////////////////////////////////////////////////
// Usage Defined Strings ///////////////////////////////////////////////////////
let prefix = config.pre
let botname = "Sabre"
let footname = "Server Time"
let systemname = "firewall.davnet.lab"
let ddstc = "Developer data sent to console."
let forbidden = "Forbidden Command! "
let talkedRecently = new Set();
////////////////////////////////////////////////////////////////////////////////
// Executables /////////////////////////////////////////////////////////////////
var exec = require('child_process').exec;
//const fs = require("fs") // Uncomment to enable filesystem readwrite
// System Login ////////////////////////////////////////////////////////////////
client.login(keys.token)
////////////////////////////////////////////////////////////////////////////////
// Check if system is ready. ///////////////////////////////////////////////////
client.on("ready", () => {
  console.log("System Ready! PREFIX: " + prefix + " SOFTWAREVERSION: " + config.v);
  console.log("INIT: " + Date())
  console.log(systemname, botname, client.guilds.size + " Servers Active.")
  client.user.setGame("With " + client.guilds.size + " Servers, v" + config.v)
  client.user.setStatus("dnd") // online/offline/dnd/invisible
  // STABLE
});
// Guild Join Handler //////////////////////////////////////////////////////////
client.on("guildMemberAdd", (member) => {
  let davnet_guild = member.guild.channels.get(config.chan.securitybot);
  let alaska_guild = member.guild.channels.get(config.chan.alaska_classified);
  if (davnet_guild === undefined) {
    var right_guild = config.chan.alaska_classified
  } else if (alaska_guild === undefined) {
    var right_guild = config.chan.securitybot
  } // Public bot would need default channels
  // Would become member.guild.defaultChannel.send()
  console.log(member.user.tag + " Joined the server " + right_guild)
  member.guild.channels.get(right_guild).send({embed: {
    color: 0xA3F700,
    timestamp: new Date(),
    footer: {
      text: client.user.username + ", Server Time"
    },
    fields: [
      { //member.user.username
        name: member.user.tag,
        value: "Joined the server."
      }
    ]
  }})
})
// Guild Part Handler //////////////////////////////////////////////////////////
client.on("guildMemberRemove", (member) => {
  let davnet_guild = member.guild.channels.get(config.chan.securitybot);
  let alaska_guild = member.guild.channels.get(config.chan.alaska_classified);
  if (davnet_guild === undefined) {
    var right_guild = config.chan.alaska_classified
  } else if (alaska_guild === undefined) {
    var right_guild = config.chan.securitybot
  } // Public bot would need default channels
  console.log(member.user.tag + " Parted the server " + right_guild)
  member.guild.channels.get(right_guild).send({embed: {
    color: 0xA7A7A5,
    timestamp: new Date(),
    footer: {
      text: client.user.username + ", Server Time"
    },
    fields: [
      {
        name: member.user.tag,
        value: "Left the server."
      }
    ]
  }})
})
////////////////////////////////////////////////////////////////////////////////
// Handlers; client.on("message", (message)) => {...} else if {...} ...);
// This is where the prefixed commands begin.
////////////////////////////////////////////////////////////////////////////////
//
client.on("message", (message) => {
  //////////////////////////////////////////////////////////////////////////////
  if (message.content.startsWith(prefix) && !message.author.bot) {
    // talkedRecently event, if message.author.id exists in set return.
    if (talkedRecently.has(message.author.id)) {
      console.log(message.author.id, message.author.tag, "is being limtied.")
      message.author.send("Slow down! I'm not The Flash")
      return;
    } else {
      talkedRecently.add(message.author.id);
      setTimeout(() => {
        talkedRecently.delete(message.author.id);
      }, 2500); // 2.5 seconds
    }
  }
  if (!message.content.startsWith(prefix) || message.author.bot) { // This is a proper OR Operator.
    return;
  // IMPORTANT. PREVENTS excess RAM/CPU usage. PREVENTS extra background processing.
  // The above line shouldn't change.
  //////////////////////////////////////////////////////////////////////////////
  // sabrestatus ///////////////////////////////////////////////////////////////
  } else if (message.content.startsWith(prefix + "sabrestatus") && message.member.roles.has(config.role.modID)) {
    const sabrestatus = message.content.split(/\s+/g);
    if (sabrestatus[1] === "game") {
      client.user.setGame(message.content.substring(17,128))
      message.channel.send("Playing status updated.")
      return;
    } else if (sabrestatus[1] === "reset") {
      client.user.setGame("With " + client.guilds.size + " Servers, v" + config.v)
      client.user.setStatus("dnd")
      message.channel.send("System reset.")
      return;
    } else if (!sabrestatus[1] || sabrestatus[1] === undefined) {
      message.channel.send("Can't set it to nothing.")
      return;
    } else if (sabrestatus[1] === "online" || sabrestatus[1] === "dnd" || sabrestatus[1] === "invisible" || sabrestatus[1] ==="idle") {
      client.user.setStatus(sabrestatus[1])
      message.channel.send("Status has been set to " + sabrestatus[1])
    } else {
      message.channel.send("The argument was not understood. Acceptable parameters: ``online, dnd, invisible, idle, game, reset``")
    }
  // Joke //////////////////////////////////////////////////////////////////////
  } else if (message.content.startsWith(prefix + "joke")) {
    var joke = jokes.strings[Math.floor(Math.random() * jokes.strings.length)]
    message.channel.send("Okay, okay. Here's a joke. " + joke.text)
  // PING //////////////////////////////////////////////////////////////////////
  } else if (message.content.startsWith(prefix + "ping")) {
    message.channel.send("Calculating!").then(m => m.edit({embed: {
      color: 0xA7A7A5,
      timestamp: new Date(),
      footer: {
        icon_url: client.user.avatarURL,
        text: "Server Time"
      },
      author: {
        name: client.user.username,
        icon_url: client.user.avatarURL
      },
      fields: [
        {
          name: ":satellite_orbital: Pong!",
          value: "```markdown\n[!]: Round Trip```",
          inline: true
        },
        {
          name: ":satellite: __Latency__",
          value: "```\n" + (m.createdTimestamp - message.createdTimestamp) + "ms.```",
          inline: true
        }
      ]
    }}))
    //console.log(m.createdTimestamp, message.createdTimestamp)
  // Marco /////////////////////////////////////////////////////////////////////
  } else if (message.content.startsWith(prefix + "marco")) {
    message.channel.send("Polo!"); // Dan's Mod
  // ipstats ///////////////////////////////////////////////////////////////////
  } else if (message.content.startsWith(prefix + "ipstats") && message.member.roles.has(config.role.cyberID)){
    exec("/root/NC/utils/NorthStar/ipsabre.sh",
      function(error, stdout, stderr) {
        message.channel.send({embed: {
          color: 0xFF3D00,
          timestamp: new Date(),
          footer: {
            icon_url: client.user.avatarURL,
            text: "Server Time"
          },
          author: {
            name: client.user.username,
            icon_url: client.user.avatarURL
          },
          fields: [
            {
              name: "STRATUS 1 FIREWALL.DNET.LAB",
              value: stdout
            }
          ]
        }})
      })
  // ipsummary /////////////////////////////////////////////////////////////////
  } else if (message.content.startsWith(prefix + "ipsummary")) {
    if (message.member.roles.has(config.role.cyberID)) {
      exec("/root/NC/utils/NorthStar/ipbot.sh");
      message.channel.send("An IP Summary has been recorded.");
    } else {
      message.channel.send(forbidden + message.author)
      return;
    }
  // XKS Regex /////////////////////////////////////////////////////////////////
} else if (message.content.startsWith(prefix + "xks")) {
    if (message.member.roles.has(config.role.cyberID)) {
      const xksregex = message.content.split(/\s+/g);
      if (xksregex[1] !== undefined) {
        exec('/root/NC/utils/NorthStar/xks.sh ' + xksregex[1],
          function(error, stdout, stderr) {
            //let regex = xksregex[1]
            if (stdout === "true\n") {
              var regval = ":large_orange_diamond: String was FOUND!"
            } else if (stdout === "false\n") {
              var regval = ":large_blue_diamond: String was NOT FOUND!"
            }
            //console.log(regval, xksregex[1], stdout)
            const embed = new Discord.RichEmbed()
              .setTitle('XKeyScore Regex')
              .setAuthor('firewall.dnet.lab')
              .setColor('0xFF3D00')
              .setDescription('Searches local database for XKeyScore words.')
              .setFooter('Server Time')
              //.setImage('https://i.imgur.com/sUj5UBw.jpg')
              .setThumbnail('https://i.imgur.com/iE39JgF.png')
              .setTimestamp()
              .setURL('https://duckduckgo.com/?q=xkeyscore')
              .addField('Here is what the monkeys could dig up.', '\u200b')
              .addField(regval, '```' + xksregex[1] + '```')
              //.addField('\u200b', '\u200b')
              //.addfield('You searched for:', '```{regex}```')
              message.channel.send({ embed });
          })
      } else {
        message.channel.send(message.author + " A string is required.")
      }
    } else {
      message.channel.send(forbidden + message.author)
      return;
    }
  // ipkilled //////////////////////////////////////////////////////////////////
  } else if (message.content.startsWith(prefix + "ipkilled")) {
    if (message.member.roles.has(config.role.cyberID)) {
      exec("/root/NC/utils/NorthStar/ipkilled.sh",
      function (error, stdout, stderr) {
        message.channel.send({embed: {
          color: 0xFF3D00,
          author: {
            name: client.user.username,
            icon_url: client.user.avatarURL
          },
          fields: [
            {
              name: "Terminated subnets blocked by System",
              value: '```' + stdout + '```'
            }
          ],
          timestamp: new Date(),
          footer: {
            icon_url: client.user.avatarURL,
            text: "STRATUS 1 FIREWALL.DNET.LAB, Server Time"
          }
        }})}) // Confusing As Hell! Thank god for Atom
    } else {
      message.channel.send(forbidden + message.author)
      return;
    }
  // wttr //////////////////////////////////////////////////////////////////////
  } else if (message.content.startsWith(prefix + "wttr")){
    const locale = message.content.split(/\s+/g);
    if (locale[1] !== undefined) {
      exec('/root/NC/utils/NorthStar/wttr.in.sh ' + locale[1],
      function(error, stdout, stderr) {
        message.channel.send({embed: {
          color: 0x1979FF,
          author: {
            name: client.user.username,
            icon_url: client.user.avatarURL
          },
          title: 'wttr.in - Console-Like Weather Data',
          url: 'http://wttr.in/',
          description: "You searched for: " + locale[1],
          fields: [{
            name: ':loudspeaker::satellite_orbital: Hows this?',
            value: '```' + stdout + '```'
          }]
        }})
      })
    } else {
      message.channel.send("Give me a city name, " + message.author + "!\nExample: Halifax,Nova")
      return;
    }
  // weather (bot) /////////////////////////////////////////////////////////////
  } else if (message.content.startsWith(prefix + "weather")) {
    if (message.member.roles.has(config.role.modID)) {
      exec("/root/NC/utils/NorthStar/weatherbot.sh");
      message.channel.send("The weather has been updated.");
    } else {
      return;
    }
  // rateme ////////////////////////////////////////////////////////////////////
  } else if (message.content.startsWith(prefix + "rateme")) {
    umath = Math.random()
    if (umath > .05) {
      var rate = rateme.strings[Math.floor(Math.random() * rateme.strings.length)]
      message.channel.send({embed: {
        color: 13498899,
        timestamp: new Date(),
        footer: {
          text: "Server Time"
        },
        author: {
          name: "Sabre",
          icon_url: client.user.avatarURL
        },
        fields: [
          {
            name: "Sabre says",
            value: "``" + rate.text + "``"
          }
        ]
      }})
      console.log("Verbose: umath is equal-to " + umath)
    } else { message.channel.send("Fish out of water!") // Ray's Mod
      console.log("Verbose: umath is equal-to " + umath)} // 5 percent chance
  // dice //////////////////////////////////////////////////////////////////////
  } else if (message.content.startsWith(prefix + "dice")) {
    var die = [ { int: "One" }, { int: "Two" }, { int: "Three" }, { int: "Four" }, { int: "Five" }, { int: "Six" } ];
    var die = die[Math.floor(Math.random() * die.length)];
    message.channel.send("Cha-Ching! You rolled a " + die.int + "!")
  //////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////
  // Developer Commands //////////////////////////// !!! ///////////////////////
  //////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////
  //  && message.member.roles.has(config.role.sabredevID)
} else if (message.content.startsWith(prefix + "xdev")) {
  const devhandle = message.content.split(/\s+/g);
  let devarg = devhandle[1];
  // developer links ///////////////////////////////////////////////////////////
  if (devarg === "links"){
    message.channel.send("``GITHUB:`` https://github.com/shir0tetsuo/sabre - ``TRELLO:`` https://trello.com/b/7UjAWlS5/sabre-development")
  // dev parse test parameters /////////////////////////////////////////////////
  } else if (devarg === "bigparse") {
    message.author.send("Strings: " + devhandle)
  // dev channel ID spawner ////////////////////////////////////////////////////
  } else if (devarg === "chanID") {
    message.guild.channels.find("name", "security-bot") // Doesn't work accurately
    // This is replaced with Developer Mode in Discord
    console.log(message.channel)
    message.author.send(ddstc)
  // dev mention test //////////////////////////////////////////////////////////
  } else if (devarg === "mention") {
    message.channel.send("Hello, " + message.mentions.members.first() + "!")
  // dev checkOwnership ////////////////////////////////////////////////////////
  } else if (devarg === "checkOwnership") {
    if(message.author.id !== config.perUser.ownerID) {
      message.author.send("Unauthorized!") // Booyah's Finding
    } else {
      message.author.send("Authorized!")
    }
  // dev testfunction //////////////////////////////////////////////////////////
} else if (devarg === "sendSec") {
  message.guild.channels.find("id", config.chan.securitybot).send("Hello, World!")
  // dev messagedata ///////////////////////////////////////////////////////////
  } else if (devarg === "messagedata"){
    message.author.send(ddstc)
    console.log(message.author)
  // dev announcerole //////////////////////////////////////////////////////////
  } else if (devarg === "announceRole"){
    let modRole = message.guild.roles.find("name", "Sabre Developer") // alternatively "string"
    console.log(modRole)
  } else { // Developer Help Command Menu //////////////////////////////////////
    message.author.send({embed: {
      color: 0xFF0000,
      author: {
        name: client.user.username,
        icon_url: client.user.avatarURL
      },
      fields: [
        {
          name: ":radioactive: Developer Test Commands",
          value: "**xdev** + checkOwnership, messagedata, announceRole, sendSec, mention, bigparse, chanID, links"
        }
      ]
    }})
  }
  //////////////////////////////////////////////////////////////////////////////
  // END OF FILE Developer Menu ////////////////////////////////////////////////
  // math //////////////////////////////////////////////////////////////////////
  } else if (message.content.startsWith(prefix + "math")) {
    const matts = message.content.split(/\s+/g);
    // Math2 is required to remove special formatting
    // Let the math program handle all arguments
    exec('math2 ' + matts[1] + ' ' + matts[2],
      function (error, stdout, stderr) { // May change to spam channel
        message.channel.send({embed: {
          color: 0xFFFF00,
          author: {
            name: client.user.username,
            icon_url: client.user.avatarURL
          },
          fields: [
            {
              name: "Output",
              value: '```' + stdout + '```'
            },
            {
              name: "Errors",
              value: '```' + stderr + '```'
            }
          ],
          timestamp: new Date(),
          footer: {
            icon_url: client.user.avatarURL,
            text: 'Mathematics Program, Server Time'
          }
        }})
    })
  // checkmod //////////////////////////////////////////////////////////////////
  } else if (message.content.startsWith(prefix + "checkmod")) {
    if(message.member.roles.has(config.role.modID)) {
      message.channel.send("Shadow Moderator, confirmed.")
    } else {
      message.channel.send("Shadow Moderator, you are not.")
    }
  // bot rock paper scissors ///////////////////////////////////////////////////
  } else if (message.content.startsWith(prefix + "botrps")) {
    var rpsmat = [ { ans: "rock" }, { ans: "paper" }, { ans: "scissors" } ] // These are the choices the bot can make
    var rpsmat = rpsmat[Math.floor(Math.random() * rpsmat.length)]; // rpsmat.ans
    const rpssplit = message.content.split(/\s+/g); // Separate strings and don't fall apart / break
    let rpsmsg = rpssplit[1]; // The second string in the content is the analysis
    console.log("botrps Player-System: " + message.author.tag + " " + rpsmsg + " " + rpsmat.ans) // Verbose
    var beatprefix = "Ha! I beat you with " // bot wins
    var defeatprefix = "Damn! My answer was " // bot loses
    if (rpsmsg === rpsmat.ans) { // If comparison is the same, return
      message.channel.send("Damn! " + rpsmat.ans + " was my answer too, " + message.author + "!")
    } else if (rpsmsg === "rock") { // answer cannot be the same, reduces coding needed
      if (rpsmat.ans === "paper") { // bot wins
        message.channel.send(beatprefix + rpsmat.ans + " " + message.author)
      } else { // bot loses
        message.channel.send(defeatprefix + rpsmat.ans + " " + message.author)
      }
    } else if (rpsmsg === "paper") {
      if (rpsmat.ans === "scissors") { // bot wins
        message.channel.send(beatprefix + rpsmat.ans + " " + message.author)
      } else { // bot loses
        message.channel.send(defeatprefix + rpsmat.ans + " " + message.author)
      }
    } else if (rpsmsg === "scissors") {
      if (rpsmat.ans === "rock") { // bot wins
        message.channel.send(beatprefix + rpsmat.ans + " " + message.author)
      } else { // bot loses
        message.channel.send(defeatprefix + rpsmat.ans + " " + message.author)
      }
    } else {
      message.channel.send("Sorry, " + message.author + ", your argument should be ``rock``, ``paper``, or ``scissors``.")
    } // bot rock paper scissors ends Here
  // Dump Message data /////////////////////////////////////////////////////////
  } else if (message.content.startsWith(prefix + "messagedata")) {
    //console.log(message.content);
    console.log(message)
    message.channel.send(ddstc)
  // Print version.
  } else if (message.content.startsWith(prefix + "v")) {
    message.channel.send("Version " + config.v);
  //////////////////////////////////////////////////////////////////////////////
  // Help Menu
  //////////////////////////////////////////////////////////////////////////////
  } else if (message.content.startsWith(prefix + "help")) {
  message.channel.send({embed: {
    color: 0xFFC400,
    author: {
      name: client.user.username,
      icon_url: client.user.avatarURL
    },
    title: 'Based on the Discord Javascript wrappers.', // may break
    url: 'https://discord.js.org',
    description: 'Prefix: ' + prefix + ', Help Page ' + config.v, // may break
    fields: [
      {
        name: ':mega:Common Commands',
        value: '**help** - Hello, World!\n**joke** - Random joke\n**wttr** (city) - Search weather on the Net\n**math** (--help) - Advanced Mathematics\n**botrps** - Play Rock Paper Scissors against the Bot.\n**ping** - Pong!\n**rateme** - Simple fun.\n**marco** - Polo\n**dice** - Role a die.\n**roast** (@person) - Your favorite command.\n**v** - Print version number.'
      },
      {
        name: ':large_orange_diamond:Cyber Operative Only',
        value: '**ipstats** - Statistics on Attacks\n**ipsummary** - Prints top violations from /var/log/auth.log\n**ipkilled** - Prints killed subnets on main Server\n**xks** (string) - Searches local database for spy words.',
        "inline": true
      },
      {
        name: ':large_blue_diamond:Shadow Moderator Only',
        value: '**sabrestatus** - Set status for sabre.\n**weather** - Get local weather data any time of day.\n**sabrestatus** (online, dnd, invisible) - Sets Sabres online status.',
        "inline": true
      },
      { // Need to add !dev
        name: ':radioactive:Test Commands',
        value: '**devteam** - Developer Team Contributions.\n**messagedata** - Sends developer information to console.\n**announcerole** - Developer Test Command.\n**checkmod** - Developer Test Command.\n**checkownership** - Developer Test Command.\n**xdev** - Developers Command Set'
      },
      {
        name: 'More',
        value: 'Project Sabre runs on the ``STRATUS 1 FIREWALL.DNET.LAB`` Server.\nDon\'t forget to append the prefix.'
      }
    ],
    timestamp: new Date(),
    footer: {
      icon_url: client.user.avatarURL,
      text: 'Server Time'
    }
  }}); // end message.channel.send
  // end of help
  //////////////////////////////////////////////////////////////////////////////
  // devteam
  //////////////////////////////////////////////////////////////////////////////
    } else if (message.content.startsWith(prefix + "devteam")) {
      message.channel.send({embed: {
        color: 13498899,
        timestamp: new Date(),
        footer: {
          text: "#bot-development, Server Time"
        },
        author: {
          name: "Sabre Developers",
          icon_url: client.user.avatarURL
        },
        fields: [
          {
            name: ":bulb: Concepting",
            value: "```ShadowSword,\nDr Booyah,\nDan,\nRaymond,\nNick,\nEmma```",
            inline: true
          },
          {
            name: ":rocket: Function Testing",
            value: "```ShadowSword,\nDr Booyah,\nDan,\nRaymond,\nNick,\nMimystar```",
            inline: true
          },
          {
            name: ":scroll: Programming",
            value: "```ShadowSword,\nDr Booyah,\nNick```",
            inline: true
          },
          {
            name: "Questions?",
            value: "Message me at shadowsword#0179"
          }
        ]
      }}) // end devteam
    ////////////////////////////////////////////////////////////////////////////
  // ROAST /////////////////////////////////////////////////////////////////////
  } else if (message.content.startsWith(prefix + "roast")) {
    if (message.mentions.members.first() === undefined) {
      message.channel.send(message.author + ", you dink, you're supposed to @mention someone.")
      return;
    }
    var roastc = roast.strings[Math.floor(Math.random() * roast.strings.length)]
    message.channel.send(message.mentions.members.first() + ", " + roastc.text)
  } //else if (message.content.startsWith)
}); // may break
