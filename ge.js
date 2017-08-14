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
  ge.user.setStatus("dnd") // online/offline/dnd/invisible/idle
});
//////////////////////// End of Head ///////////////////////////////////////////
