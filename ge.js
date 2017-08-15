////////////////////////////////////////////////////////////////////////////////
// Project Gamma Emerald - Security bot for DAVNET
////////////////////////////////////////////////////////////////////////////////
// Codename David
let syslog = "Gamma Emerald: "
console.log(syslog, "System Initialization.")
// client -> ge
const Discord = require("discord.js");
const ge = new Discord.Client();
console.log(syslog, "Discord Loaded to Memory.");
// Constraints, Variables, External Processing /////////////////////////////////
const key = require("./token.json");
const cfg = require("./ge_init");
//const fs = require("fs")
let prefix = cfg.pre;
var exec = require('child_process').exec;
// Log data to console /////////////////////////////////////////////////////////
console.log(syslog, "TOKEN:", key.token_ge.substring(0,8), "...");
console.log(syslog, "SOFTWAREVERSION:", cfg.version);
console.log(syslog, "PREFIX:", prefix);
console.log(syslog, "ADMINISTRATOR:", cfg.id.administrator);
console.log(syslog, "OPER:", cfg.id.guild_davnet_securitybot);
console.log(syslog, "Beginning Authentication Process.");
// Login processing ////////////////////////////////////////////////////////////
ge.login(key.token_ge)
ge.on("ready", () => {
  console.log(syslog, "System Ready.")
  console.log(syslog, Date())
  console.log(syslog, ge.guilds.size,"Servers Online")
  ge.user.setGame("Cyber Ops")
  ge.user.setStatus("online") // online/offline/dnd/invisible/idle
});
////////////////////////////////////////////////////////////////////////////////
//////////////////////// End of Head ///////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

let cooldown = new Set();
ge.on("message", (message) => {
  // Cooldown Period ///////////////////////////////////////////////////////////
  if(message.content.startsWith(prefix) && !message.author.bot) {
    if(cooldown.has(message.author.id)) {
      console.log(syslog, message.author.tag, "is being limtied.")
      message.author.send(message.author.username + " You are feeding commands too quickly.")
      return;
    } else {
      cooldown.add(message.author.id);
      setTimeout(() => {
        cooldown.delete(message.author.id);
      }, 4000); // 4 seconds
    }
  }
  // No Bots Allowed to Control GE /////////////////////////////////////////////
  if(message.author.bot) return;
  // Ensure user has cyber role ////////////////////////////////////////////////
  if(!message.member.roles.has(cfg.id.role_cyberop)) {
    console.log(syslog, message.author.tag, "Forbidden Access Detected");
    message.channel.send(syslog + message.author + " Access Forbidden. Cyb.Op. Role Missing.")
    return;
  }
  //////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////
  if(message.content.startsWith(prefix, "v")) {
    message.channel.send(syslog + cfg.version);
    return;
  }
  if(message.content.startsWith(prefix, "help")) {
    message.channel.send("Unavailable.")
  }// else if {}
}) // end ge.on /////////////////////////////////////////////////////////////////
