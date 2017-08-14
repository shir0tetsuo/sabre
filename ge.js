////////////////////////////////////////////////////////////////////////////////
// Project Gamma Emerald - Security bot for DAVNET
////////////////////////////////////////////////////////////////////////////////
// Codename David
//    message.guild.channels.find("id", config.chan.securitybot).send("Hello, World!")
let syslog = "Gamma Emerald: "
console.log(syslog, "System Initialization.")
// client -> ge
const Discord = require("discord.js");
const ge = new Discord.Client();
console.log(syslog, "Discord Loaded to Memory.");
// Constraints
const key = require("./token.json");
const cfg = require("./ge_init");
let prefix = cfg.pre;
console.log(syslog, "TOKEN: ", key.token_ge);
console.log(syslog, "SOFTWAREVERSION: ", cfg.version);
console.log(syslog, "PREFIX: ", prefix);
console.log(syslog, "ADMINISTRATOR: ", cfg.id.administrator);
console.log(syslog, "OPER: ", cfg.id.guild_davnet_securitybot);
console.log(syslog, "Beginning Authentication Process.");

console.log(syslog, "System Ready.")
