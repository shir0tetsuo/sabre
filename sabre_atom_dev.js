///// file start ///////////////////////////////////////////////////////////////
// Verbose, Client Login and Initialization
////////////////////////////////////////////////////////////////////////////////
// Forewarning: Functions that require external execution are run specifically
// by the developer's system. Custom commands have been created in order to
// handle advanced scripting requests.
////////////////////////////////////////////////////////////////////////////////
console.log("Initialization.")
// Constraints /////////////////////////////////////////////////////////////////
const Discord = require("discord.js"); // Initialize discord wrappers
const client = new Discord.Client(); // New client authorization
// Variable and String Constraints /////////////////////////////////////////////
const config = require("./sabre_init.json")
const keys = require("./token.json")
const rateme = require("./sabre_rateme.json")
const roast = require("./sabre_roast.json")
//const fs = require("fs") // Uncomment to enable filesystem readwrite
// Patch Memory ////////////////////////////////////////////////////////////////
//var sys = require('sys');
let prefix = config.pre
let ddstc = "Developer data sent to console."
let forbidden = "Forbidden Command! "
// Executables /////////////////////////////////////////////////////////////////
var exec = require('child_process').exec;
// System Login ////////////////////////////////////////////////////////////////
client.login(keys.token)
//console.log(config) //verbose configuration
client.on("ready", () => {
  console.log("System Ready! " + prefix + " " + config.v + " " + Date());
  client.user.setGame("With " + client.guilds.size + " Servers.")
  client.user.setStatus("dnd") // online/offline/dnd/invisible
});
////////////////////////////////////////////////////////////////////////////////
// Handlers; client.on("message", (message)) => {...} else if {...} ...);
client.on("message", (message) => {
  //////////////////////////////////////////////////////////////////////////////
  if (!message.content.startsWith(prefix)) {
    return;
  // IMPORTANT. PREVENTS excess RAM/CPU usage. PREVENTS extra background processing.
  //////////////////////////////////////////////////////////////////////////////
  // PING //////////////////////////////////////////////////////////////////////
  } else if (message.content.startsWith(prefix + "ping")) {
    message.channel.send({embed: {
      color: 0x0044FF,
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
          name: ":satellite:",
          value: "```PONG!```",
          inline: true
        },
        {
          name: ":satellite_orbital:",
          value: "```test```",
          inline: true
        }
      ]
    }});
  // Marco /////////////////////////////////////////////////////////////////////
  } else if (message.content.startsWith(prefix + "marco")) {
    message.channel.send("Polo!"); // Dan's Mod
  // ipsummary /////////////////////////////////////////////////////////////////
  } else if (message.content.startsWith(prefix + "ipsummary")) {
    if (message.member.roles.has(config.role.cyberID)) {
      exec("/root/NC/utils/NorthStar/ipbot.sh");
      message.channel.send("An IP Summary has been recorded.");
    } else {
      message.channel.send(forbidden + message.author)
      return;
    }
  // XKS Regex
} else if (message.content.startsWith(prefix + "xks")) {
    if (message.member.roles.has(config.role.cyberID)) {
      const xksregex = message.content.split(/\s+/g);
      if (xksregex[1] !== undefined) {
        exec('/root/NC/NorthStar/xks.sh ' + xksregex[1],
          function(error, stdout, stderr) {
            regex = xksregex[1]
            const embed = new Discord.RichEmbed()
              .setTitle('XKeyScore Regex')
              .setAuthor('firewall.dnet.lab', 'https://www.google.ca/search?q=xkeyscore')
              .setColor('0xFF3D00')
              .setDescription('Searches local database for XKeyScore words.')
              .setFooter('Server Time')
              .setImage('https://i.imgur.com/sUj5UBw.jpg')
              .setThumbnail('https://i.imgur.com/iE39JgF.png')
              .setTimestamp()
              .setURL('https://www.google.ca/search?q=xkeyscore')
            if (stdout === "true") {
              .addField(':large_orange_diamond: Warning!', 'Your regex string ``{regex}`` is known to be a tracked word.')
            } else {
              .addField(':large_blue_diamond: Safe!', 'Your regex string ``{regex}`` was not found in the database.')
            }
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
    // stuff
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
      message.channel.send("Give me a city name, " + message.author + "\nExample: Aylmer,Quebec")
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
  // Developer Commands ////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////
} else if (message.content.startsWith(prefix + "xdev")) {
  const devhandle = message.content.split(/\s+/g);
  let devarg = devhandle[1];
  if (devarg === "mention") {
    message.channel.send("Hello, " + message.mentions.members.first() + "!")
  // dev checkOwnership ////////////////////////////////////////////////////////
  } else if (devarg === "checkOwnership") {
    if(message.author.id !== config.perUser.ownerID) {
      message.author.send("Unauthorized!") // Booyah's Finding
    } else {
      message.author.send("Authorized!")
    }
  // dev testfunction //////////////////////////////////////////////////////////
} else if (devarg === "math") {
  //  exec("/root/NC/utils/math " + devhandle[2] + " " + devhandle[3])
  // mathdata //
    mathdata = exec('math ' + ' ' + devhandle[2] + ' ' + devhandle[3],
    function (error, stdout, stderr) {
      message.channel.send(ddstc)
      console.log('stdout: ' + stdout);
      console.log('stderr: ' + stderr);
    })
  // End mathdata //
  // dev messagedata ///////////////////////////////////////////////////////////
  } else if (devarg === "messagedata"){
    message.author.send(ddstc)
    console.log(message.author)
  // dev announcerole //////////////////////////////////////////////////////////
  } else if (devarg === "announceRole"){
    let modRole = message.guild.roles.find("name", "Admin") // alternatively "string"
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
          value: "**xdev** + checkOwnership, messagedata, announceRole, math, mention"
        }
      ]
    }})
  }
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
    }) // may break
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
      if (rpsmat.ans === "rock") {
        message.channel.send(beatprefix + rpsmat.ans + " " + message.author)
      } else {
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
        value: '**help** - Hello, World!\n**wttr** (city) - Search weather on the Net\n**math** (--help) - Advanced Mathematics\n**botrps** - Play Rock Paper Scissors against the Bot.\n**ping** - Pong!\n**rateme** - Simple fun.\n**marco** - Polo\n**dice** - Role a die.\n**v** - Print version number.'
      },
      {
        name: ':large_orange_diamond:Cyber Operative Only',
        value: '**ipsummary** - Prints top violations from /var/log/auth.log\n**ipkilled** - Prints killed subnets on main Server\n**xks** (string) - Searches local database for spy words.',
        "inline": true
      },
      {
        name: ':large_blue_diamond:Shadow Moderator Only',
        value: '**weather** - Get local weather data any time of day.',
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
  } else if (message.content.startsWith(prefix + "roast")) {
    if (message.mentions.members.first() === undefined) {
      message.channel.send(message.author + ", you dink, you're supposed to @mention someone.")
      return;
    }
    var roastc = roast.strings[Math.floor(Math.random() * roast.strings.length)]
    message.channel.send(message.mentions.members.first() + ", " + roastc.text)
  } //else if (message.content.startsWith)
}); // may break
