////////////////////////////////////////////////////////////////////////////////
// 0.3.7.10E --> 0.4.0.0+
// Based on AnIdiotsGuide's Tutorial Bot
// Constraints
const settings = require('./settings.json')
const chalk = require ("chalk"); // console chalk system
const Discord = require ("discord.js"); // discord client
const client = new Discord.Client(); // discord client
const fs = require("fs"); // filesystem r/w enabled
require('./sys/eventLoader')(client); // ** sys/eventLoader
const log = message => {
  console.log(chalk.redBright(`Sa04: ${message}`))
  console.log(new Date())
}
// main -- commands
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./main/', (err, files) => { // ** main
  if (err) console.err(err);
  log(`${files.length} Files Found in main`)
  files.forEach(f => {
    let fileread = require(`./main/${f}`);
    log(`Loading Plug: ${fileread.help.name}.`)
    client.commands.set(fileread.help.name, fileread);
    fileread.conf.aliases.forEach(alias => {
      client.aliases.set(alias, fileread.help.name);
    })
  })
})

// specifically for reloading
client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./main/${command}`)];
      let cmd = require(`./main/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

// Permission Levels
client.elevation = message => {
  let permlvl = 0;
  let mod_role = message.guild.roles.find('name', settings.modrolename);
  let mod_davnet = message.guild.roles.find('name', settings.modrolenameDAVNET);
  if (mod_role && message.member.roles.has(mod_role.id)) permlvl = 2;
  if (mod_davnet = message.member.roles.has(mod_davnet.id)) permlvl = 2;
  let admin_role = message.guild.roles.find('name', settings.adminrolename);
  let admin_davnet = message.guild.roles.find('name', settings.adminrolenameDAVNET);
  if (admin_role && message.member.roles.has(admin_role.id)) permlvl = 3;
  if (admin_davnet && message.member.roles.has(admin_davnet.id)) permlvl = 3;
  if (message.author.id === settings.ownerid) permlvl = 4;
  return permlvl;
}

// token error system was removed

client.login(settings.token);
