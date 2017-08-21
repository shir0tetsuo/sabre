///// file start ///////////////////////////////////////////////////////////////
// Verbose, Client Login and Initialization
// Forewarning: Functions that require external execution are run specifically
// by the developer's system. Custom commands have been created in order to
// handle advanced scripting requests.
// Chalk
const chalk = require ("chalk");
const chalk_err = chalk.bold.red;
const chalk_inf = chalk.bgBlue;
const chalk_dat = chalk.green;
// Chalk-Animation
const chalkAnimation = require('chalk-animation');
////////////////////////////////////////////////////////////////////////////////
console.log(chalk.bold.red("Initialization."))
// Constraints /////////////////////////////////////////////////////////////////
const Discord = require("discord.js"); // Initialize discord wrappers
const client = new Discord.Client(); // New client authorization
// Variable and String Constraints /////////////////////////////////////////////
const config = require("./sabre_init.json") // INIT., Basic Configuration
const keys = require("./token.json") // Secret Keys
const rateme = require("./sabre_rateme.json") // Game
const roast = require("./sabre_roast.json") // Game
const jokes = require("./sabre_jokes.json") // Game
const uhoh = require("./shadowshadow.json")
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
let rewardWord = new Set();
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
  console.log(chalk_inf("System Ready! PREFIX: " + prefix + " SOFTWAREVERSION: " + config.v));
  console.log(chalk_dat("INIT: " + Date()));
  console.log(chalk_dat(systemname, botname, client.guilds.size + " Servers Active."));
  // Above no longer works as of Aug 16 Discord update
  // May modify default settings to disinclude server size
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
function scoreInit(mess) { // Convert message into mess
  sql.get(`SELECT * FROM scores WHERE userId ="${mess.author.id}"`).then(row => {
    if (!row) {
      sql.run("INSERT INTO scores (userId, tickets, level, chatBits) VALUES (?, ?, ?, ?)", [mess.author.id, 1, 0, 1]);
    } /*else { // Increment chatBits
      sql.run(`UPDATE scores SET chatBits = ${row.chatBits + 1} WHERE userId = ${mess.author.id}`);
    }*/
  }).catch(() => { // Error message generates new table instead
    console.error;
    console.log(chalk_err("The system recovered from an error."))
    sql.run("CREATE TABLE IF NOT EXISTS scores (userId TEXT, tickets INTEGER, level INTEGER, chatBits INTEGER)").then(() => {
      sql.run("INSERT INTO scores (userId, tickets, level, chatBits) VALUES (?, ?, ?, ?)", [mess.author.id, 1, 0, 1]);
    })
  })
}
////////////////////////////////////////////////////////////////////////////////
function shopInit(mess) {
  sql.get(`SELECT * FROM shopitem WHERE userId ="${mess.author.id}"`).then(row => {
    if (!row) {
      sql.run("INSERT INTO shopitem (userId, itemA, itemB, itemC, itemD, itemE, itemF) VALUES (?, ?, ?, ?, ?, ?, ?)", [mess.author.id, 0, 0, 0, 0, 0, 0]);
    }
  }).catch(() => { // Error message generates new table instead
    console.error;
    console.log(chalk_err("The system recovered from an error."))
    sql.run("CREATE TABLE IF NOT EXISTS shopitem (userId TEXT, itemA TEXT, itemB TEXT, itemC TEXT, itemD TEXT, itemE TEXT, itemF TEXT)").then(() => {
      sql.run("INSERT INTO scores (userId, itemA, itemB, itemC, itemD, itemE, itemF) VALUES (?, ?, ?, ?, ?, ?, ?)", [mess.author.id, 0, 0, 0, 0, 0, 0]);
    })
  })
}
function shopItemBuy(mess, item, slot) {
  // slots
  if (slot === "1") {
    var alp = "A";
  } else if (slot === "2") {
    var alp = "B";
  } else if (slot === "3") {
    var alp = "C";
  } else if (slot === "4") {
    var alp = "D";
  } else if (slot === "5") {
    var alp = "E";
  } else if (slot === "6") {
    var alp = "F";
  } else {
    mess.reply("Invalid Slot!")
    return;
  } // items
  if (item === "2131") {
    mess.reply("This is free! Yay free stuff. :soccer:")
  } else {
    mess.reply("Item not found!")
    return;
  }
  sql.get(`SELECT * FROM shopitem WHERE userId = "${mess.author.id}"`).then(row => {
    sql.run(`UPDATE shopitem SET item${alp} = "${item}" WHERE userId = "${mess.author.id}"`)
    mess.reply("Item " + item + " was purchased for slot " + slot)
  })
}
////////////////////////////////////////////////////////////////////////////////
function scoreInitByID(mess) { // Convert message into mess
  sql.get(`SELECT * FROM scores WHERE userId ="${mess}"`).then(row => {
    if (!row) {
      sql.run("INSERT INTO scores (userId, tickets, level, chatBits) VALUES (?, ?, ?, ?)", [mess, 1, 0, 1]);
    }
  }).catch(() => { // Error message generates new table instead
    console.error;
    console.log(chalk_err("The system recovered from an error."))
    sql.run("CREATE TABLE IF NOT EXISTS scores (userId TEXT, tickets INTEGER, level INTEGER, chatBits INTEGER)").then(() => {
      sql.run("INSERT INTO scores (userId, tickets, level, chatBits) VALUES (?, ?, ?, ?)", [mess, 1, 0, 1]);
    })
  })
}
////////////////////////////////////////////////////////////////////////////////
function scoreUpTicket(mess, xval) {
  if (!xval) var xval = 1
  sql.get(`SELECT * FROM scores WHERE userId = "${mess.author.id}"`).then(row => {
    sql.run(`UPDATE scores SET tickets = ${row.tickets + xval*1} WHERE userId = ${mess.author.id}`)
  })
}
function scoreDownTicket(mess, xval) {
  if (!xval) var xval = 1
  console.log("Lowering ticket score by", xval*1, mess.author.id)
  sql.get(`SELECT * FROM scores WHERE userId = "${mess.author.id}"`).then(row => {
    if (row.tickets*1 >= xval*1) {
      sql.run(`UPDATE scores SET tickets = ${row.tickets - xval*1} WHERE userId = ${mess.author.id}`)
    } else {
      sql.run(`UPDATE scores SET tickets = 0 WHERE userId = "${mess.author.id}"`)
    }
  })
}
////////////////////////////////////////////////////////////////////////////////
function scoreUpLevel(mess, xval) {
  if (!xval) var xval = 1
  sql.get(`SELECT * FROM scores WHERE userId = "${mess.author.id}"`).then(row => {
    sql.run(`UPDATE scores SET level = ${row.level + xval*1} WHERE userId = ${mess.author.id}`)
  })
}
////////////////////////////////////////////////////////////////////////////////
function scoreUpBits(mess, xval) {
  if (!xval) var xval = 1
  sql.get(`SELECT * FROM scores WHERE userId = "${mess.author.id}"`).then(row => {
    sql.run(`UPDATE scores SET chatBits = ${row.chatBits + xval*1} WHERE userId = ${mess.author.id}`)
  })
}
function scoreDownBits(mess, xval) {
  if (!xval) var xval = 1
  console.log("Lowering byte score by", xval*1, mess.author.id)
  sql.get(`SELECT * FROM scores WHERE userId = "${mess.author.id}"`).then(row => {
    if (row.chatBits*1 >= xval*1) {
      sql.run(`UPDATE scores SET chatBits = ${row.chatBits - xval*1} WHERE userId = ${mess.author.id}`)
    } else {
      sql.run(`UPDATE scores SET chatBits = 0 WHERE userId = ${mess.author.id}`)
    }
  })
}
// uniq2
////////////////////////////////////////////////////////////////////////////////
function scoreDisplay(mess) {
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
        console.log(chalk_err("Bug at uu3"))
      }); // end catch
    } // end AMBA achievement
  })
}
////////////////////////////////////////////////////////////////////////////////
//uniq8
function scanKeyword(mess) {
  const summon_night = ["?night", "?Night", "?NIGHT"]
  const rewarded = ["CLASSIFIED", "classified", "Classified"]
  const banned = ["fineprint", "FINEPRINT", "Fineprint", "AMBA", "amba", "Amba", "BOMB", "bomb", "Bomb", "terrorist", "Terrorist", "TERRORIST", "Special Projects", "special projects", "noctua", "NOCTUA", "Noctua", "sapphire", "SAPPHIRE", "Sapphire", "project python", "Project Python", "project Python", "PYTHON", "nemesis", "Nemesis", "NEMESIS", "Sentinel", "sentinel", "SENTINEL", "project pyramid", "project Pyramid", "PYRAMID"]
  const au = mess
  if (summon_night.some(word => mess.content.includes(word))) {
    // May add function to message phone?
    mess.channel.send(`<@!${config.perUser.ownerID}>`)
    console.log(chalk.yellowBright("Your presence is required in", mess.guild.name, mess.channel.name))
    console.log(chalk.yellowBright(mess.member.displayName, ":", mess.content))
  }
  if (banned.some(word => mess.content.includes(word)) && mess.guild.id === config.guild.ALASKA) {
    mess.delete()
    console.log(au.member.displayName, " said the following.", au.guild.name, au.channel.name)
    console.log(chalk_err(au.content))
    scoreDownBits(au, 21)
    au.channel.send("``CLASSIFIED`` " + au.author + " 20" + chatBit + " redacted")
    return;
  }
  if (rewarded.some(word => mess.content.includes(word)) && mess.guild.id === config.guild.ALASKA) {
    mess.react("🌠")
    if (rewardWord.has(mess.author.id)) return;
    rewardWord.add(mess.author.id);
    setTimeout(() => {
      rewardWord.delete(mess.author.id);
    }, 600000) // 10 Minutes
    scoreUpTicket(mess, 5)
    mess.author.send("You have been rewarded 5" + curren + " for using CLASSIFIED instead of a sensitive word!")
  }
}
////////////////////////////////////////////////////////////////////////////////
function ShadowsWord(mess, type) {

  //<Message>.channel.send(`${responses[Math.floor(Math.random() * responses.length)]}`);
  //////////////////////////////////////////////////////////////////////////////
  if (mess.author.id === config.perUser.ownerID || mess.author.id === config.perUser.Jona || mess.author.id === config.perUser.Nick) {
    mess.reply("``Access Granted`` User ID was recognized")
  } else {
    mess.reply("``Access Denied`` User ID is invalid")
    return;
  }
    if (mess.mentions.members.first() === undefined){
    mess.reply("``Access Denied`` No users mentioned")
  } else { //uniq10
    let member = mess.mentions.members.first()
    var cool = uhoh.strings[Math.floor(Math.random() * uhoh.strings.length)]
    var secondcool = uhoh.strings[Math.floor(Math.random() * uhoh.strings.length)]
    if (type === "oops") {
      mess.reply("Summoned the power of the ShadowSword on Tag: " + member + ", ``Access Granted`` ```markdown\n.\n" + cool.text + " " + member.displayName + " is in trouble! " + secondcool.text + "\n.\n.```").then(function (mess) {
        mess.react("🚷")
        mess.react("🎟")
      })
      let oopsrole = mess.guild.roles.get(config.role.alaska_oops_nolvlup);
      member.addRole(oopsrole).catch(console.error)
    } else if (type === "notmeproblem") {
      mess.reply("summoned the power of the ShadowSword on Tag: " + member + ", ``Access Granted`` ```markdown\n.\n" + cool.text + " " + member.displayName + " Was sent far, far away. " + secondcool.text + "\n.\n.```").then(function (mess) {
       mess.react("☢")
       mess.react("☣")
     })
      let davidsnether = mess.guild.roles.get(config.role.alaska_davidsnetherworld);
      member.setRoles([davidsnether]).catch(console.error)
    } else if (type === "mute") {
      mess.reply("summoned the power of the ShadowSword on Tag: " + member + ", ``Access Granted`` ```markdown\n.\n" + cool.text + " " + member.displayName + " Was muted. " + secondcool.text + "\n.\n.```" ).then(function (mess) {
        mess.react("🤐")
        mess.react("🌃")
      })
      let badboy = mess.guild.roles.find('name', 'Bad Boy')
      let muted = mess.guild.roles.find('name', 'Muted')
      let grounded = mess.guild.roles.find('name', 'Grounded')
      member.setRoles([badboy, muted, grounded]).catch(console.error)
    } else if (type === "echo") {
      console.log(member.roles)
    } else if (type === "purge") {
      console.log("To Purge Messages")
    } else if (type === "ctrl-z") {
      console.log("To Un-Do OOPS")
    } else {
      mess.reply("``Available Commands: oops, notmeproblem, mute, echo + @user``");
    }
  }
}

// POINT SYSTEM ////////////////////////////////////////////////////////////////
client.on("message", message => {
  // Return Conditions: Bot and Cooldown
  if (message.author.bot) return;
  if (talkedRecently.has(message.author.id)) return;
  // Return Conditions: DM or Null Object
  if (message.channel.type === "dm") return;
  if (message.member === null) return; // Should catch nulls
  scoreInit(message);
  scoreUpBits(message);
  scanKeyword(message);
  // Commands with users that do not have a prefix or with nolvlup are disabled
  if (!message.content.startsWith(prefix)) return;
  if (message.member.roles.has(config.role.alaska_oops_nolvlup)) return;
  ///////////////////////
  // Add Tickets
  scoreUpTicket(message, 1);
  if (message.content.startsWith(prefix + "level")) {
    scoreDisplay(message);
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
  console.log(chalk_dat(member.user.tag + " Joined the server " + member.guild.name))
  member.guild.channels.get(right_guild).send({embed: {
    color: 0xA3F700,
    timestamp: new Date(),
    footer: {
      text: client.user.username + ", Server Time"
    },
    fields: [
      { //member.user.username
        name: member.user.tag + " (" + member.displayName + ")",
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
  console.log(chalk.inverse(member.user.tag + " Parted the server " + member.guild.name))
  member.guild.channels.get(right_guild).send({embed: {
    color: 0xA7A7A5,
    timestamp: new Date(),
    footer: {
      text: client.user.username + ", Server Time"
    },
    fields: [
      {
        name: member.user.tag + " (" + member.displayName + ")",
        value: "Left the server."
      }
    ]
  }})
})
////////////////////////////////////////////////////////////////////////////////
// Handlers; client.on("message", (message)) => {...} else if {...} ...);
// This is where the prefixed commands begin.
////////////////////////////////////////////////////////////////////////////////
// This is the main cage.
//
client.on("message", (message) => {
  //////////////////////////////////////////////////////////////////////////////
  if (message.content.startsWith(prefix) && !message.author.bot) {
    // talkedRecently event, if message.author.id exists in set return.
    if (talkedRecently.has(message.author.id)) {
      if (speedingTicket.has(message.author.id)) {
        scoreInit(message);
        scoreDownTicket(message, 2);
        console.log(chalk_err(message.author.tag, "was given a speeding ticket in", message.guild.name, message.channel.name))
        message.author.send("You have been given a Speeding Ticket! You have been deducted 2" + curren)
      }
      console.log(chalk.yellow(message.author.id, message.author.tag, "is being limtied."))
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
  //////////////////////////////////////////////////////////////////////////////
  // uniq4
  } else if (message.content.startsWith(prefix + "giveTicket")){
    const data = message.content.split(/\s+/g);
    let mentionedu = message.mentions.members.first()
    if (mentionedu === undefined) {
      message.reply("You must specify a @user! ``" + prefix + "giveTicket @user (ammount)``")
      return;
    }
    let remote = mentionedu.id
    if (data[2] === undefined) {
      message.reply("You must specify an amount to send! ``" + prefix + "giveTicket @user (ammount)``")
      return;
    }
    if (mentionedu.id === message.author.id) {
      message.reply("You can't send tickets to yourself!")
      return;
    }
    scoreInit(message)
    scoreInitByID(remote)
    let amount = data[2]
    sql.get(`SELECT * FROM scores WHERE userId = "${message.author.id}"`).then(row => {
      if (amount <= row.tickets) {
        let newamount = row.tickets*1 - amount*1 // deduct amount from tickets
        sql.run(`UPDATE scores SET tickets = ${newamount} WHERE userId = ${message.author.id}`)
        sql.get(`SELECT * FROM scores WHERE userId = "${remote}"`).then(next => {
          let givenamount = next.tickets*1 + amount*1
          sql.run(`UPDATE scores SET tickets = ${givenamount} WHERE userId = ${remote}`)
        })
        message.reply(`${amount}${curren} was sent to ${mentionedu}, you have ${newamount}${curren} left!`)
        return;
      } else {
        message.reply("You don't have enough!")
        return;
      }
    })
  //////////////////////////////////////////////////////////////////////////////
  // uniq6 Level Shop //////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////
  } else if (message.content.startsWith(prefix + "sshop")){
    const sshop = message.content.split(/\s+/g);
    /////////// MAIN SHOP CONTENT //////////////////////////////////////////////
    scoreInit(message);
    let eticketmsg = "Error"
    let ebytemsg = "Error"
    let levelshop = "Error"
    let items = "\u200b"
    let shopcmds = "\u200b"
    if (sshop[1] === undefined) {
      sql.get(`SELECT * FROM scores WHERE userId = "${message.author.id}"`).then(row => {
        // level up math
        var lvrequirement = row.level*1 * 50 + 250
        var cbrequirement = row.level*1 * 128 + 1024
        if (row.tickets >= lvrequirement) {
          var eticketmsg = ":unlock: You have enough tickets to buy a level! ``" + prefix + "sshop buy level tickets``"
        } else {
          var eticketmsg = ":lock: ~~You don't have enough tickets!~~"
        }
        if (row.chatBits >= cbrequirement) {
          var ebytemsg = ":unlock: You have enough bytes to buy a level! ``" + prefix + "sshop buy level bytes``"
        } else {
          var ebytemsg = ":lock: ~~You don't have enough bytes!~~"
        }
        if (row.level === 0) {
          var levelshop = ":lock: You need to buy a level first!"
          var shopcmds = "\u200b"
        }
        //uniq11
        if (row.level >= 1) {
          var levelshop = "**Lv 1** - Item 2131 - Adds :soccer: to your messages.\n**Lv 5** - Item 1133 - Coming Soon"
          var shopcmds = "``" + prefix + "sshop buy item (itemnumber) (slot1-6)``\n``" + prefix + "sshop sell item (slot1-6)``\n``" + prefix + "sshop items``"
        }
        const embed = new Discord.RichEmbed()
            .setTitle(':left_luggage: Sabre Level Shop!')
            .setAuthor(message.member.displayName)
            .setColor(0x7386FF)
            .setDescription(`Level: ${row.level}, ${curren}: ${row.tickets}, ${chatBit}: ${row.chatBits}`)
            .setFooter(`Sabre Shop Menu`)
            .setTimestamp()
            .setThumbnail('https://i.imgur.com/8ZBnvSt.png')
            .addField(`:large_orange_diamond: Level Price: __**${lvrequirement}${curren}**__ or __**${cbrequirement}${chatBit}**__`, `${eticketmsg}\n${ebytemsg}`)
            .addField('\u200b', '\u200b')
            .addField(`Level ${row.level} Shop`, `${levelshop}`)
            .addField(`Other things to do`, `${shopcmds}`)
        message.author.send({ embed });
      }); // end row data definition
    } // end Sabre Shop help page
    ////////////////////////////////////////////////////////////////////////////
    ///////// PURCHASE FOR LEVELS HANDLERS /////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////
    if (sshop[1] === "buy" && sshop[2] === "level" && sshop[3] === "tickets") {
      scoreInit(message);
      sql.get(`SELECT * FROM scores WHERE userId = "${message.author.id}"`).then(row => {
        var lvrequirement = row.level*1 * 50 + 250
        var cbrequirement = row.level*1 * 128 + 1024
        if (row.tickets >= lvrequirement) {
          message.channel.send({embed: {
            color: 0x3FFF6D,
            timestamp: new Date(),
            footer: {
              text: "Level Up!"
            },
            author: {
              name: message.member.displayName,
              icon_url: message.author.avatarURL
            },
            fields: [
              {
                name: "Cha-Ching!",
                value: `${lvrequirement}${curren} was used. ${message.member.displayName} Levelled Up!`
              },
              {
                name: "\u200b",
                value: `You are now Level ${row.level*1 + 1}! Congradulations!`
              }
            ]
          }})
          scoreUpLevel(message, 1)
          scoreDownTicket(message, lvrequirement)
          console.log(chalk.bgMagenta(message.member.displayName, "levelled up using tickets"))
        } else {
          message.reply("You don't have enough " + curren + "!")
        }
      }) // end buy level tickets / row transfer
    ////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////// BUY WITH BYTES //////////////////////////
    } else if (sshop[1] === "buy" && sshop[2] === "level" && sshop[3] === "bytes") {
      scoreInit(message);
      sql.get(`SELECT * FROM scores WHERE userId = "${message.author.id}"`).then(row => {
        var lvrequirement = row.level*1 * 50 + 250
        var cbrequirement = row.level*1 * 128 + 1024
        if (row.chatBits >= cbrequirement) {
          message.channel.send({embed: {
            color: 0x3FFF6D,
            timestamp: new Date(),
            footer: {
              text: "Level Up!"
            },
            author: {
              name: message.member.displayName,
              icon_url: message.author.avatarURL
            },
            fields: [
              {
                name: "Cha-Ching!",
                value: `${cbrequirement}${chatBit} was used. ${message.member.displayName} Levelled Up!`
              },
              {
                name: "\u200b",
                value: `You are now Level ${row.level*1 + 1}! Congradulations!`
              }
            ]
          }})
          scoreUpLevel(message, 1)
          scoreDownBits(message, cbrequirement)
          console.log(chalk.bgMagenta(message.member.displayName, "levelled up using Bytes"))
        } else {
          message.reply("You don't have enough " + chatBit + "!")
        }
      }) // end row data transfer
    } else if (sshop[1] === "buy" && sshop[2] === "item" && sshop[3] !== 0 && sshop[4] !== 0 && sshop[4]*1 <= 6) {
      shopInit(message);
      shopItemBuy(message, sshop[3], sshop[4]);
    } // end buying
  /// MAKE IT RAIN /////////////////////////////////////////////////////////////
  } else if (message.content.startsWith(prefix + "makeitrain")) {
    scoreInit(message);
    if (message.mentions.members.first() === undefined) {
      message.reply("You need to @mention someone!")
      return;
    }
    if (message.mentions.members.first().id === message.author.id) {
      message.reply("You can't use this on yourself!")
      return;
    }
    var winner = Math.random()
    console.log(chalk.bgMagenta(message.author.tag, "put tickets into the pile. Floor:", Math.floor(winner*100)))
    if (winner < 0.03) { // was 0.03
      console.log(chalk_dat("Somebody won the jackpot!", message.guild.name, message.channel.name))
      sql.get(`SELECT * FROM makeitjacky WHERE place = "here"`).then(jackpot => {
        message.channel.send(message.mentions.members.first() + " Won a pile of " + jackpot.tickets + curren + "!!!!!!!!!!!")
        sql.get(`SELECT * FROM scores WHERE userId = "${message.mentions.members.first().id}"`).then(row => {
          sql.run(`UPDATE scores SET tickets = ${row.tickets*1 + jackpot.tickets} WHERE userId = ${message.mentions.members.first().id}`)
        })
      }).then(row => {
        sql.run(`UPDATE makeitjacky SET tickets = 100 WHERE place = "here"`)
      })

    } else {
      sql.get(`SELECT * FROM scores WHERE userId = "${message.author.id}"`).then(row => {
        if (row.tickets >= 5) {
          sql.get(`SELECT * FROM makeitjacky WHERE place = "here"`).then(jackpot => {
            var pile = jackpot.tickets*1 + 5
              message.reply("put 5" + curren + " into the prize pile. The pile is " + pile + curren + " high!")
              scoreDownTicket(message, 5);
              sql.run(`UPDATE makeitjacky SET tickets = ${pile} WHERE place = "here"`)
          })
        } else {
          message.reply("You don't have enough tickets!")
          return;
        }
      }) // end row
    }
  } else if (message.content.startsWith(prefix + "waterfall")) {
    scoreInit(message); // SQL stuff goes here
  // Joke //////////////////////////////////////////////////////////////////////
  } else if (message.content.startsWith(prefix + "joke")) {
    if (message.guild.id === config.guild.ALASKA && !message.member.roles.has(config.role.alaska_upperctzn)) {
      message.channel.send(forbidden + "This is an Upper Class Citizen command.")
    } else {
      var joke = jokes.strings[Math.floor(Math.random() * jokes.strings.length)]
    //  message.channel.send("Okay okay. Here's a joke. " + joke.text)
      message.reply("This command has been disabled!")
    }
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
  //////////////////////////////////////////////////////////////////////////////
  // uniq9 flipcoin
} else if (message.content.startsWith(prefix + "coin")) {
  scoreInit(message);
    const ammt = message.content.split(/\s+/g);
    if (ammt[1]*1 !== 0 && ammt[2] === "tickets") {
      betfloor = Math.floor(Math.random() * 100)
      if (betfloor >= 50) { // lose
        sql.get(`SELECT * FROM scores WHERE userId = "${message.author.id}"`).then(row => {
          if (row.tickets >= ammt[1]*1) {
            var lose = ammt[1]*1
            message.reply("Awww! Better luck next time sport. You lost " + ammt[1] + curren)
            scoreDownTicket(message, lose)
          } else {
            message.reply("You don't have enough " + curren)
          }
        })
      } else { // win
        sql.get(`SELECT * FROM scores WHERE userId = "${message.author.id}"`).then(row => {
          if (row.tickets >= ammt[1]*1) {
            var win = ammt[1]*1
            message.reply("Epic! You gained an extra " + ammt[1] + curren)
            scoreUpTicket(message, win)
          } else {
            message.reply("You don't have enough " + curren)
          }
        })
      }
    } else if (ammt[1]*1 !== 0 && ammt[2] === "bytes") {
      betfloor = Math.floor(Math.random() * 100)
      if (betfloor >= 50) { // lose
        sql.get(`SELECT * FROM scores WHERE userId = "${message.author.id}"`).then(row => {
          if (row.chatBits >= ammt[1]*1) {
            var lose = ammt[1]
            message.reply("Awww! Better luck next time sport. You lost " + ammt[1] + chatBit)
            scoreDownBits(message, lose)
          } else {
            message.reply("You don't have enough " + chatBit)
          }
        })
      } else { // win
        sql.get(`SELECT * FROM scores WHERE userId = "${message.author.id}"`).then(row => {
          if (row.chatBits >= ammt[1]*1) {
            var win = ammt[1]
            message.reply("Epic! You gained an extra " + ammt[1] + chatBit)
            scoreUpBits(message, win)
          } else {
            message.reply("You don't have enough " + chatBit)
          }
        })
      }
    } else {
      message.reply("Follow this Example: ``" + prefix + "coin 20 tickets/bytes``")
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
      console.log(chalk.yellow("Verbose: umath is equal-to " + umath))
    } else { message.channel.send("Fish out of water!") // Ray's Mod
      console.log(chalk_err("Verbose: umath is equal-to " + umath))} // 5 percent chance
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
            scoreUpTicket(message, 5)
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
  console.log(chalk_err(message.member.displayName, "dev command detected", message.guild.name, message.channel.name, message.content))
  if (message.member.roles.has(config.role.sabredevID) || message.member.roles.has(config.role.alaska_botdev)) {
    const devhandle = message.content.split(/\s+/g);
//uniq7
    if (devhandle[1] === "prototype") {
    //  chalkAnimation.pulse(`warning`)
      console.log(chalk.bgWhiteBright.red("See Here"))
    }
    let devarg = devhandle[1];
    if (devarg === "unseedT" && message.member.roles.has(config.role.alaska_specialdev)) {
      if (message.mentions.members.first() === undefined) return;
      message.reply("Developer Command was Run.")
      sql.run(`UPDATE scores SET tickets = 1 WHERE userId = ${message.mentions.members.first().id}`)
      // uniq5
    } else if (devarg === "shadow" && devhandle[2] === "shadow" && message.guild.id === config.guild.ALASKA){// && devhandle[3] === "SummonsOops"){
      if (devhandle[3] === undefined) return;
      let type = devhandle[3];
      ShadowsWord(message, type)
    } else if (devarg === "seedT" && message.member.roles.has(config.role.alaska_specialdev)) {
      if (message.mentions.members.first() === undefined) return;
      if (devhandle[3] === undefined) return;
      let seed = devhandle[3]*1
      message.reply("Developer Command was Run. Seeded user with " + seed + curren)
      sql.run(`UPDATE scores SET tickets = ${seed} WHERE userId = ${message.mentions.members.first().id}`)
    } else if (devarg === "selfseedT" && message.member.roles.has(config.role.alaska_specialdev)) {
      if (devhandle[2] === undefined) return;
      scoreInit(message)
      message.reply("Developer Command was Run. Self-Seeded " + devhandle[2]*1 + curren + " ``WARNING`` this command does not always work")
      sql.run(`UPDATE scores SET tickets = "${devhandle[2]*1}" WHERE userId = "${message.author.id}"`)
      console.log(chalk_dat(devhandle[2]*1))
    } else if (devarg === "selfseedL" && message.member.roles.has(config.role.alaska_specialdev)) {
      if (devhandle[2] === undefined) return;
      var seed = devhandle[2]*1
      scoreInit(message)
      message.reply("Developer Command was Run. Self-Seeded Lvl" + seed)
      console.log(chalk_dat(seed))
      sql.run(`UPDATE scores SET level = ${seed} WHERE userId = "${message.author.id}"`)
    } else if (devarg === "poke_jackpot" && message.author.id === config.perUser.ownerID) {
      message.reply("``Developer Command was Run. This command should not be used again.``")
      sql.run("CREATE TABLE IF NOT EXISTS makeitjacky (place TEXT, tickets INTEGER)").then(() => {
        sql.run("INSERT INTO makeitjacky (place, tickets) VALUES (?, ?)", ["here", 100]);
      })
    } else if (devarg === "poke_lshop") {
      message.reply("``Developer Command was Run. This command should not be used again.``")
      sql.run("CREATE TABLE IF NOT EXISTS shopitem (userId TEXT, itemA TEXT, itemB TEXT, itemC TEXT, itemD TEXT, itemE TEXT, itemF TEXT)").then(() => {
        sql.run("INSERT INTO shopitem (userId, itemA, itemB, itemC, itemD, itemE, itemF) VALUES (?, ?, ?, ?, ?, ?, ?)", [message.author.id, 0, 0, 0, 0, 0, 0]);
      })
    } else if (devarg === "inspect" && message.member.roles.has(config.role.alaska_botdev)) {
      if (message.mentions.members.first() === undefined) return;
      sql.get(`SELECT * FROM scores WHERE userId ="${message.mentions.members.first().id}"`).then(row => {
        if (!row) {
          sql.run("INSERT INTO scores (userId, tickets, level, chatBits) VALUES (?, ?, ?, ?)", [message.mentions.members.first().id, 1, 0, 1]);
        } else {
          message.author.send(`Lv: ${row.level}, Tk: ${row.tickets}, Cb: ${row.chatBits}`)
          return;
        }
      }).catch(() => { // Error message generates new table instead
        console.error;
        console.log(chalk_err("The system recovered from an error."))
        sql.run("CREATE TABLE IF NOT EXISTS scores (userId TEXT, tickets INTEGER, level INTEGER, chatBits INTEGER)").then(() => {
          sql.run("INSERT INTO scores (userId, tickets, level, chatBits) VALUES (?, ?, ?, ?)", [message.mentions.members.first().id, 1, 0, 1]);
        })
      })
      return;
    } else if (devarg === "printGuildID") {
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
    } else if (devarg === "mention") { // can also be used to obtain user IDs
      let firstmention = message.mentions.members.first()
      message.channel.send("Hello, " + firstmention + "!")
      message.author.send(ddstc)
      console.log(firstmention.id)
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
      let modRole = message.guild.roles.find("name", "David's netherworld") // alternatively "string"
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
    console.log(chalk.magenta("botrps Player-System: " + message.author.tag + " " + rpsmsg + " " + rpsmat.ans)) // Verbose
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
        scoreUpTicket(message, 2)
      }
    } else if (rpsmsg === "paper") {
      if (rpsmat.ans === "scissors") { // bot wins
        message.channel.send(beatprefix + rpsmat.ans + " " + message.author)
      } else { // bot loses
        message.channel.send(defeatprefix + rpsmat.ans + " " + message.author + gainrpsticket)
        scoreUpTicket(message, 2)
      }
    } else if (rpsmsg === "scissors") {
      if (rpsmat.ans === "rock") { // bot wins
        message.channel.send(beatprefix + rpsmat.ans + " " + message.author)
      } else { // bot loses
        message.channel.send(defeatprefix + rpsmat.ans + " " + message.author + gainrpsticket)
        scoreUpTicket(message, 2)
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
              value: "sabrestatus, messagedata, inspect"
            },
            {
              name: "Sabre Score System (Special Sabre Access)",
              value: "unseedT @user (Are you SURE?), seedT, selfseedT, selfseedL"
            },
            {
              name: "Owner Commands",
              value: "shadow shadow oops/notmeproblem/mute/echo, poke_jackpot/lshop, prototype (Make console see whatever is tagged)"
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
            value: "**level** - Check your Level!\n**giveTicket** @user (amount) - Donate Tickets!\n**sshop** - Sabre Level Shop!\n**coin** - Flip A Coin! Bet!\n**makeitrain @user** - Give them a chance to win big! Put in 5" + curren
          },
          {
            name: "Other Things Sabre can do",
            value: "Saying **?night** in any channel will summon NightDelSol.\nCLASSIFIED keywords will be auto-removed\nUsing CLASSIFIED instead of something CLASSIFIED will be rewarded."
          },
          {
            name: "More Coming Soon",
            value: "This Week: Waterfall Card Game, Announcement System, Purge System, Vote System, Spam Mitigation"
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
            value: "```ShadowSword,\nDr Booyah,\nDan,\nRaymond,\nNick,\nMimystar,\nEmma,\nChAirborne```",
            inline: true
          },
          {
            name: ":rocket: Function Testing",
            value: "```ShadowSword,\nDr Booyah,\nDan,\nRaymond,\nNick,\nMimystar,\nParadise,\nTony```" + "and Alaska Discord",
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
      /*let messagecount = parseInt(numberofmessages);
  message.channel.fetchMessages({limit: messagecount}).then(messages => message.channel.bulkDelete(messages));*/
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
    // message.channel.send(message.mentions.members.first() + ", " + roastc.text)
    message.reply("This command has been disabled!")
  } //else if (message.content.startsWith)
}); // may break
