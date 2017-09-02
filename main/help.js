const settings = require('../settings.json');
exports.run = (client, message, params) => {
  if (params[0] >= 2) {
    const commandNames = Array.from(client.commands.keys());
    const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);
    let page = params[0]
    let hLen = 1801 + (params[0] * 1800)
    let hMax = 3600 + (params[0] * 1800)
    message.author.send(`= Command List =\n\n[Use ${settings.prefix}help <commandname> for details]\n\n[help page ${page}]\n\n${client.commands.map(c => `${settings.prefix}${c.help.name}${' '.repeat(longest - c.help.name.length)} :: ${c.help.description}`).join('\n').substring(hLen,hMax)}`, {code:'asciidoc'});
    return;
  }
  if (!params[0]) {
    const commandNames = Array.from(client.commands.keys());
    const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);
    let page = 1
    message.author.send(`= Command List =\n\n[Use ${settings.prefix}help <commandname> for details]\n\n[help page ${page}]\n\n${client.commands.map(c => `${settings.prefix}${c.help.name}${' '.repeat(longest - c.help.name.length)} :: ${c.help.description}`).join('\n').substring(0,1800)}`, {code:'asciidoc'});
  } else {
    let command = params[0];
    if (client.commands.has(command)) {
      command = client.commands.get(command);
      message.author.send(`= ${command.help.name} = \n${command.help.description}\nusage:: ${command.help.usage}`, {code:'asciidoc'});
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
  description: 'Displays all available commands.',
  usage: 'help [command]'
};
