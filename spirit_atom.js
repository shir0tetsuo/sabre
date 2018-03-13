console.log(`INIT ${new Date();} Spirito Boot`)
const settings = require('./settings.json')
const Discord = require ("discord.js"); // discord client
const client = new Discord.Client(); // discord client
const sql = require("sqlite");
function Rand(data) {
  return data[Math.floor(Math.random() * data.length)]
}
function gR(xlen) {
  if (!xlen) var xlen = 2
    var charset = "0123456789",
        retVal = "";
    for (var i = 0, n = charset.length; i < xlen; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}
sql.open("../spirito.sqlite");
client.login(settings.token_spirit);
client.on("ready", () => {
  console.log(`INIT ${new Date();} Spirito Online`)
  client.user.setPresence({ game: { name: `++info`, type: 0}})
  client.user.setStatus("idle")
});
client.on('reconnecting', () => console.log(`RECONNECTION (Spirito) ${new Date();}`));
client.on("message", () => {
  let client = message.client;
  if (message.author.bot) return;
  if (message === null) return;
  if (message.content === "++info") {
    var infoSec = "";
    infoSec += `\`\`\`fix\n`
    infoSec += `Spirito\`\`\``
    infoSec += `\`\`\`diff\n`
    infoSec += `+ Set channel with ++set\n`
    infoSec += `- Requires Ownership\`\`\``
    infoSec += `Spirito simply mentions *here* reminding periodically to do a Reality Check!\n`
    infoSec += `\`0200 EST, 0800 EST, 1400 EST, 2000 EST\``
    message.channel.send(`${infoSec}`)
  }
  if (message.content.toLowerCase() === "++set") {
    
  }
});

var now = new Date();
var milli = now.getMilliseconds(),
  sec = now.getSeconds(),
  min = now.getMinutes(),
  hou = now.getHours(),
  mo = now.getMonth(),
  dy = now.getDate(),
  yr = now.getFullYear();
