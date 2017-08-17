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
let speedingTicket = new Set();
// Point System Related
let curren = ":tickets:"
let chatBit = ":eye_in_speech_bubble:"
////////////////////////////////////////////////////////////////////////////////
// Executables /////////////////////////////////////////////////////////////////
var exec = require('child_process').exec;
// Require sqlite and database
const sql = require("sqlite");
sql.open("./score.sqlite");
// 0.3.4.0 Notes: Shop for Level System (ASYNC/AWAIT), Check for Roles,
// add a "Message Counter" system BUT LIMIT IT!
// System Login ////////////////////////////////////////////////////////////////
client.login(keys.token)
////////////////////////////////////////////////////////////////////////////////
// Check if system is ready. ///////////////////////////////////////////////////
client.on("ready", () => {
  console.log("System Ready! PREFIX: " + prefix + " SOFTWAREVERSION: " + config.v);
  console.log("INIT: " + Date())
  console.log(systemname, botname, client.guilds.size + " Servers Active.")
  //client.user.setGame("With " + client.guilds.size + " Servers, v" + config.v)
  // Above no longer works as of Aug 16 Discord update
  client.user.setPresence({ game: { name: `With ${client.guilds.size} Servers. v${config.v}`, type: 0}})
  client.user.setStatus("dnd") // online/offline/dnd/invisible
});

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
// Function Test Zone
////////////////////////////////////////////////////////////////////////////////
// Let everything else do the comparisons.
// userId, tickets, level, chatBits
// uniq1
function checkEntry(mess) { // Convert message into mess
  sql.get(`SELECT * FROM scores WHERE userId ="${mess.author.id}"`).then(row => {
    if (!row) {
      sql.run("INSERT INTO scores (userId, tickets, level, chatBits) VALUES (?, ?, ?, ?)", [mess.author.id, 1, 0, 1]);
    } /*else { // Increment chatBits
      sql.run(`UPDATE scores SET chatBits = ${row.chatBits + 1} WHERE userId = ${mess.author.id}`);
    }*/
  }).catch(() => { // Error message generates new table instead
    console.error;
    console.log("The system recovered from an error.")
    sql.run("CREATE TABLE IF NOT EXISTS scores (userId TEXT, tickets INTEGER, level INTEGER, chatBits INTEGER)").then(() => {
      sql.run("INSERT INTO scores (userId, tickets, level, chatBits) VALUES (?, ?, ?, ?)", [mess.author.id, 1, 0, 1]);
    })
  })
}
////////////////////////////////////////////////////////////////////////////////
function checkTicket(mess, xval) {
  if (!xval) var xval = 1
  sql.get(`SELECT * FROM scores WHERE userId = "${mess.author.id}"`).then(row => {
    sql.run(`UPDATE scores SET tickets = ${row.tickets + xval} WHERE userId = ${mess.author.id}`)
  })
}
function uncheckTicket(mess, xval) {
  if (!xval) var xval = 1
  sql.get(`SELECT * FROM scores WHERE userId = "${mess.author.id}"`).then(row => {
    sql.run(`UPDATE scores SET tickets = ${row.tickets - xval} WHERE userId = ${mess.author.id}`)
  })
}
////////////////////////////////////////////////////////////////////////////////
function checkLevel(mess, xval) {
  if (!xval) var xval = 1
  sql.get(`SELECT * FROM scores WHERE userId = "${mess.author.id}"`).then(row => {
    sql.run(`UPDATE scores SET level = ${row.level + xval} WHERE userId = ${mess.author.id}`)
  })
}
////////////////////////////////////////////////////////////////////////////////
function checkBits(mess, xval) {
  if (!xval) var xval = 1
  sql.get(`SELECT * FROM scores WHERE userId = "${mess.author.id}"`).then(row => {
    sql.run(`UPDATE scores SET chatBits = ${row.chatBits + xval} WHERE userId = ${mess.author.id}`)
  })
}
// uniq2
////////////////////////////////////////////////////////////////////////////////
function readLevel(mess) {
  sql.get(`SELECT * FROM scores WHERE userId = "${mess.author.id}"`).then(row => {
    if (!row) return mess.reply("Your current level is 0.");
    mess.reply("Calculating!").then(m => m.edit({embed: {
      color: 0xFFC000,
      timestamp: new Date(),
      description: `${botname} v${config.v}`,
      footer: {
        icon_url: client.user.avatarURL,
        text: client.user.username
      },
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
    }})) // end m edit message
    // Achievements and Other Weird Things
    // May make obsolete with sqlite
    // uniq3
    if (mess.author.id === config.perUser.Tony3492) {
      mess.reply("has an achievement for being the first to reach Level 2 in Beta!")
    }
    if (mess.member.roles.has(config.role.alaska_botdev)) {
      mess.reply("Is a Developer!")
    }
    if (mess.member.roles.has(config.achievement.alaska_amba_participant)) {
      mess.reply("Was a **``CLASSIFIED``**!").then(function (mess) {
        mess.react("🥇")
        mess.react("😤")
        mess.react("🕶")
        mess.react("🐹")
        mess.react("🌚")
        mess.react("🎲")
      }).catch(function() {
        console.log("Bug at uu3")
      }); // end catch
    } // end AMBA achievement
  })
}

// POINT SYSTEM ////////////////////////////////////////////////////////////////
client.on("message", message => {
  // Return Conditions: Bot and Cooldown
  if (message.author.bot) return;
  if (talkedRecently.has(message.author.id)) return;
  // Return Conditions: DM or Null Object
  if (message.channel.type === "dm") return;
  if (message.member === null) return; // Should catch nulls
  checkEntry(message);
  checkBits(message);
  // Commands with users that do not have a prefix or with nolvlup are disabled
  if (!message.content.startsWith(prefix)) return;
  if (message.member.roles.has(config.role.alaska_oops_nolvlup)) return;
  ///////////////////////
  // Add Tickets
  checkTicket(message, 1);
  if (message.content.startsWith(prefix + "level")) {
    readLevel(message);
  }
}); // end client message

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
// Guild Join Handler //////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
client.on("guildMemberAdd", (member) => {
  let davnet_guild = member.guild.channels.get(config.chan.securitybot);
  let alaska_guild = member.guild.channels.get(config.chan.alaska_classified);
  if (davnet_guild === undefined) {
    var right_guild = config.chan.alaska_classified
  } else if (alaska_guild === undefined) {
    var right_guild = config.chan.securitybot
  } // Public bot would need default channels
  // Would become member.guild.defaultChannel.send()
  console.log(member.user.tag + " Joined the server " + right_guild + message.server.name)
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
  console.log(member.user.tag + " Parted the server " + right_guild + message.server.name)
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
      if (speedingTicket.has(message.author.id)) {
        checkEntry(message);
        uncheckTicket(message, 2);
        console.log(message.author.id, message.author.tag, "has been given a speeding ticket.")
        console.log(message.author.tag, "was deducted for spamming", message.channel.name, "in", message.server.name)
        message.author.send("You have been given a Speeding Ticket! You have been deducted 2" + curren)
      }
      console.log(message.author.id, message.author.tag, "is being limtied.")
      message.author.send("Slow down! I'm not The Flash.")
      speedingTicket.add(message.author.id);
      setTimeout(() => {
        speedingTicket.delete(message.author.id);
      }, 8000); // 8 Seconds
      return;
    } else {
      talkedRecently.add(message.author.id);
      setTimeout(() => {
        talkedRecently.delete(message.author.id);
      }, 3000); // changed to 3 seconds
    }
  }
  if (message.channel.type === "dm") return;
  if (message.member === null) return; // Should catch nulls
  if (!message.content.startsWith(prefix) || message.author.bot) { // This is a proper OR Operator.
    return;
  // IMPORTANT. PREVENTS excess RAM/CPU usage. PREVENTS extra background processing.
  // The above lines shouldn't change.
  //////////////////////////////////////////////////////////////////////////////
  // sabrestatus ///////////////////////////////////////////////////////////////
  // Sabre is unable to detect which channel the text is being sent to, at the moment.
  } else if (message.content.startsWith(prefix + "sabrestatus")) { // No choice but to nest roles
    if (message.member.roles.has(config.role.modID) || message.member.roles.has(config.role.alaska_botdev)) {
      const sabrestatus = message.content.split(/\s+/g);
      if (sabrestatus[1] === "game") {
        client.user.setPresence({ game: { name: `${message.content.substring(18,128)}`, type: 0}})
        message.channel.send("Playing status updated.")
        return;
      } else if (sabrestatus[1] === "reset") {
        client.user.setPresence({ game: { name: `With ${client.guilds.size} Servers. v${config.v}`, type: 0}})
        client.user.setStatus("dnd")
        message.channel.send("System reset.")
        return;
      } else if (!sabrestatus[1] || sabrestatus[1] === undefined) {
        message.channel.send("Can't set it to nothing.")
        return;
      } else if (sabrestatus[1] === "online" || sabrestatus[1] === "dnd" || sabrestatus[1] === "invisible" || sabrestatus[1] ==="idle") {
        client.user.setStatus(sabrestatus[1])
        message.channel.send("Status has been set to " + sabrestatus[1])
        return;
      } else {
        message.channel.send("The argument was not understood. Acceptable parameters: ``online, dnd, invisible, idle, game, reset``");
        return;
      }
    } else {
      message.channel.send(forbidden);
      return;
    }

  } else if (message.content.startsWith(prefix + "giveticket")){

  // Joke //////////////////////////////////////////////////////////////////////
  } else if (message.content.startsWith(prefix + "joke")) {
    if (message.guild.id === config.guild.ALASKA && !message.member.roles.has(config.role.alaska_upperctzn)) {
      message.channel.send(forbidden + "This is an Upper Class Citizen command.")
    } else {
      var joke = jokes.strings[Math.floor(Math.random() * jokes.strings.length)]
      message.channel.send("Okay okay. Here's a joke. " + joke.text)
    }
  // PING //////////////////////////////////////////////////////////////////////

    //console.log(m.createdTimestamp, message.createdTimestamp)
  // Marco /////////////////////////////////////////////////////////////////////
  } else if (message.content.startsWith(prefix + "marco")) {
    if (message.guild.id === config.guild.ALASKA) {
      check_ctz = message.member.roles.has(config.role.alaska_citizen)
      if (!check_ctz) {
        message.channel.send(forbidden)
        return;
      }
    }
    message.channel.send("Polo!"); // Dan's Mod
  // ipstats ///////////////////////////////////////////////////////////////////

  // XKS Regex /////////////////////////////////////////////////////////////////

  // wttr //////////////////////////////////////////////////////////////////////

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
    if (message.guild.id === config.guild.ALASKA && !message.member.roles.has(config.role.alaska_citizen)) {
      message.channel.send(forbidden)
      return;
    }
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
    if (message.guild.id === config.guild.ALASKA && !message.member.roles.has(config.role.alaska_citizen)) {
      message.channel.send(forbidden)
      return;
    }
    const diceroll = message.content.split(/\s+/g);
    if (diceroll[1] === "12" || diceroll[1] === "twelve") {
      var die = [ { int: 1 }, { int: 2 }, { int: 3 }, { int: 4 }, { int: 5 }, { int: 6 }, { int: 7 }, { int: 8 }, { int: 9 }, { int: 10 }, { int: 11 }, { int: 12 } ];
      var die = die[Math.floor(Math.random() * die.length)];
          message.channel.send("Cha-Ching! You rolled a " + die.int + "!")
          if (die.int === 12) {
            message.reply("You have earned 5 " + curren + " for scoring high!")
            checkTicket(message, 5)
          }
          return;
    }
    if (diceroll[1] === "10" || diceroll[1] === "ten") {
      var die = [ { int: 1 }, { int: 2 }, { int: 3 }, { int: 4 }, { int: 5 }, { int: 6 }, { int: 7 }, { int: 8 }, { int: 9 }, { int: 10 } ];
      var die = die[Math.floor(Math.random() * die.length)];
          message.channel.send("Cha-Ching! You rolled a " + die.int + "!")
          return;
    } else if (diceroll[1] === "6" || diceroll[1] === "six" || !diceroll[1] ){
      var die = [ { int: 1 }, { int: 2 }, { int: 3 }, { int: 4 }, { int: 5 }, { int: 6 } ];
      var die = die[Math.floor(Math.random() * die.length)];
          message.channel.send("Cha-Ching! You rolled a " + die.int + "!")
          return;
    } else {
      message.reply("You can choose between ``6``, ``10``, and ``12`` sided Dice! Do ``" + prefix + "dice 10`` or ``" + prefix + "dice twelve``!")
    }
    return;
  //////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////
  // Developer Commands //////////////////////////// !!! ///////////////////////
  //////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////
} else if (message.content.startsWith(prefix + "xdev")) {
  if (message.member.roles.has(config.role.sabredevID) || message.member.roles.has(config.role.alaska_botdev)) {
    const devhandle = message.content.split(/\s+/g);
    let devarg = devhandle[1];
    if (devarg === "printGuildID") {
      console.log(message.guild.id) // Working
    // developer links ///////////////////////////////////////////////////////////
    } else if (devarg === "links"){
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
  } else if (devarg === "announceRole"){ // whats going on
      let modRole = message.guild.roles.find("name", "Sabre Achievement 1") // alternatively "string"
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
  } else {
    message.channel.send(forbidden);
    return;
  }

  //////////////////////////////////////////////////////////////////////////////
  // END OF FILE Developer Menu ////////////////////////////////////////////////
  // math //////////////////////////////////////////////////////////////////////

  // checkmod //////////////////////////////////////////////////////////////////
  } else if (message.content.startsWith(prefix + "checkmod")) {
    if(message.member.roles.has(config.role.modID)) {
      message.channel.send("Shadow Moderator, confirmed.")
    } else {
      message.channel.send("Shadow Moderator, you are not.")
    }
  // bot rock paper scissors ///////////////////////////////////////////////////
  } else if (message.content.startsWith(prefix + "botrps")) {
    if (message.guild.id === config.guild.ALASKA && !message.member.roles.has(config.role.alaska_citizen)) {
      message.channel.send(forbidden)
      return;
    }
    var rpsmat = [ { ans: "rock" }, { ans: "paper" }, { ans: "scissors" } ] // These are the choices the bot can make
    var rpsmat = rpsmat[Math.floor(Math.random() * rpsmat.length)]; // rpsmat.ans
    const rpssplit = message.content.split(/\s+/g); // Separate strings and don't fall apart / break
    let rpsmsg = rpssplit[1]; // The second string in the content is the analysis
    console.log("botrps Player-System: " + message.author.tag + " " + rpsmsg + " " + rpsmat.ans) // Verbose
    var beatprefix = "Ha! I beat you with " // bot wins
    var defeatprefix = "Nooo! My answer was " // bot loses
    var gainrpsticket = " You've earned 2 " + curren
    if (rpsmsg === rpsmat.ans) { // If comparison is the same, return
      message.channel.send("Damn! " + rpsmat.ans + " was my answer too, " + message.author + "!")
    } else if (rpsmsg === "rock") { // answer cannot be the same, reduces coding needed
      if (rpsmat.ans === "paper") { // bot wins
        message.channel.send(beatprefix + rpsmat.ans + " " + message.author)
      } else { // bot loses
        message.channel.send(defeatprefix + rpsmat.ans + " " + message.author + gainrpsticket)
        checkTicket(message, 2)
      }
    } else if (rpsmsg === "paper") {
      if (rpsmat.ans === "scissors") { // bot wins
        message.channel.send(beatprefix + rpsmat.ans + " " + message.author)
      } else { // bot loses
        message.channel.send(defeatprefix + rpsmat.ans + " " + message.author + gainrpsticket)
        checkTicket(message, 2)
      }
    } else if (rpsmsg === "scissors") {
      if (rpsmat.ans === "rock") { // bot wins
        message.channel.send(beatprefix + rpsmat.ans + " " + message.author)
      } else { // bot loses
        message.channel.send(defeatprefix + rpsmat.ans + " " + message.author + gainrpsticket)
        checkTicket(message, 2)
      }
    } else {
      message.channel.send("Sorry, " + message.author + ", your argument should be ``rock``, ``paper``, or ``scissors``.")
    } // bot rock paper scissors ends Here
  // Dump Message data /////////////////////////////////////////////////////////
  } else if (message.content.startsWith(prefix + "messagedata")) {
    if (message.guild.id === config.guild.ALASKA && !message.member.roles.has(config.role.alaska_botdev)) {
      message.channel.send(forbidden)
      return;
    }
    //console.log(message.content);
    console.log(message)
    message.channel.send(ddstc)
  // Print version.
  } else if (message.content.startsWith(prefix + "v")) {
    if (message.guild.id === config.guild.ALASKA && !message.member.roles.has(config.role.alaska_citizen)) {
      message.channel.send(forbidden)
      return;
    }
    message.channel.send("Version " + config.v);
  //////////////////////////////////////////////////////////////////////////////
  // Help Menu
  //////////////////////////////////////////////////////////////////////////////
} else if (message.content.startsWith(prefix + "help")) { // uniq0
    if (message.guild.id === config.guild.ALASKA) {
      if (message.member.roles.has(config.role.alaska_botdev)) {
        message.author.send({embed: {
          color: 0xFF3D00,
          fields: [
            {
              name: "Developer Commands",
              value: "xdev, checkOwnership, messagedata, announceRole, ~~sendSec~~, mention, bigparse, chanID, ~~links~~"
            },
            {
              name: "Special Developer Commands",
              value: "sabrestatus, messagedata"
            }
          ]
        }})
      }
      message.author.send({embed: {
        color: 0xFFC400,
        author: {
          name: client.user.username,
          icon_url: client.user.avatarURL
        },
        title: "A Project by ShadowSword, Based on the Discord NodeJS Wrappers",
        url: 'https://discord.js.org',
        description: 'Prefix: ``' + prefix + '``, Help Page ' + config.v,
        fields: [
          {
            name: "Upper Class Citizen Commands",
            value: "**joke** - Collection of jokes.\n**roast** - Poke fun at people."
          },
          {
            name: "Citizen of Alaska Commands",
            value: "**help** - Hello, World\n**botrps** (rock/paper/scissors) - Play Rock Paper Scissors against the Bot\n**rateme** - I'll tell you what a beautiful person you are.\n**marco** - Polo!\n**dice** - Roll a 6, 10, or 12 sided Die.\n**v** - Display version.\n**devteam** - A list of contributors for Sabre Development."
          },
          {
            name: "Other Commands",
            value: "**level** - Check your Level!"
          },
          {
            name: "More Coming Soon",
            value: "This Week: Waterfall Card Game, Level Shop, Announcement System, Summoning of the Shadow Sword, Purge System, Vote System, Spam Mitigation, Mute System"
          }
        ],
        timestamp: new Date(),
        footer: {
          icon_url: client.user.avatarURL,
          text: "Primary Development by shadowsword#0179"
        }
      }});

    } else {
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
            value: '**weather** - Get local weather data any time of day.\n**sabrestatus** (online, dnd, invisible) - Sets Sabres online status.',
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
      }});

    }
 // end message.channel.send
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
            value: "```ShadowSword,\nDr Booyah,\nDan,\nRaymond,\nNick,\nMimystar,\nEmma```",
            inline: true
          },
          {
            name: ":rocket: Function Testing",
            value: "```ShadowSword,\nDr Booyah,\nDan,\nRaymond,\nNick,\nMimystar```" + "and Alaska Discord",
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
    if (message.guild.id === config.guild.ALASKA && !message.member.roles.has(config.role.alaska_upperctzn)) {
      message.channel.send(forbidden)
      return;
    }
    if (message.mentions.members.first() === undefined) {
      message.channel.send(message.author + ", you dink, you're supposed to @mention someone.")
      return;
    }
    var roastc = roast.strings[Math.floor(Math.random() * roast.strings.length)]
    message.channel.send(message.mentions.members.first() + ", " + roastc.text)
  } //else if (message.content.startsWith)
}); // may break
