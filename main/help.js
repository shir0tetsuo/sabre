const settings = require('../settings.json');
exports.run = (client, message, params) => {
  if (params[0] >= 2 || params[0] === 1 || !params[0]) {
    //const commandNames = Array.from(client.commands.keys());
    if (params[0] === undefined) {
      var page = 1
    } else {
      var page = params[0]
    }
    const level = client.elevation(message)
    // goodCommands = myCommands
    const goodCommands = client.commands.filter(cmd => cmd.conf.permLevel <= level && cmd.conf.enabled !== false)
    const commandNames = goodCommands.keyArray()
    const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);
    let header = `= Sabre Commands =\n\n[Page ${page}, ${settings.prefix}help <commandname> for details]`;
    let output = `\n\n`
    goodCommands.forEach( c => {
      let hLen = 0 + ((page*1 - 1) * 1800)
      let hMax = hLen + 1800
      output += `${settings.prefix}${c.help.name}${' '.repeat(longest - c.help.name.length)} :: ${c.help.description} (PL${c.conf.permLevel})\n`
      console.log("Strength:", header.length + output.substring(hLen,hMax).length)
      if (header.length + output.substring(hLen,hMax).length >= 1800) {
        message.author.send(header + output.substring(hLen,hMax), {code:'asciidoc'});
        return;
      } else {
        message.author.send(header + output.substring(hLen,hMax), {code:'asciidoc'});
        return;
      }
    })
    console.log(hLen, hMax, level)
    //let commandMap = client.commands.map(c => `${settings.prefix}${c.help.name}${' '.repeat(longest - c.help.name.length)} :: ${c.help.description}`).join('\n')
    //let newMap = commandMap.substring(hLen,hMax)
    //message.author.send(`= Command List =\n\n[Use ${settings.prefix}help <commandname> for details]\n\n[help page ${page}]\n\n${newMap}`, {code:'asciidoc'});
    return;
    } else {
    let command = params[0];
    if (client.commands.has(command)) {
      command = client.commands.get(command);
      message.author.send(`= ${command.help.name} = \n${command.help.description}\nusage:: ${command.help.usage}\nshortcuts:: ${command.conf.aliases}`, {code:'asciidoc'});
    }
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['h', 'halp', 'cmds', 'man'],
  permLevel: 0
};

exports.help = {
  name: 'help',
  description: 'Displays all available commands for your permission level.',
  usage: 'help [command/pagenumber]'
};
