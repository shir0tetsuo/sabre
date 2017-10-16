const calcPortal = require('./portal-calc.js')
function runPortal(message, h, baseHP, boss, state) {
  if (state == 1) {
    // Available :: CalculateOptions (and put in dungeon.js)
    const AvailableCommands = calcPortal('ProcedureCall', message, h, baseHP, boss, state)
    const AvailableCommandsRegex = calcPortal('Regex', message, h, baseHP, boss, state)
    const AvailableCommandsString = calcPortal('String', message, h, baseHP, boss, state)
    message.channel.send(`**${message.member.displayName} (${message.author.username}#${message.author.discriminator})**,\ntype \`${AvailableCommandsString}\` to continue.`)
    message.channel.awaitMessages(response => response.author.id === message.author.id && AvailableCommands.some(word => response.content.toLowerCase().startsWith(word)), {
      max: 1,
      time: 120000,
      errors: ['time']
    })
    .then(collected => {
      const msg = collected.first();
      const input = msg.content.toLowerCase();
      // init
      msg.reply(`\`SUCCESS\``)
    })
    .catch(() => {
      console.error;
      message.channel.send(`**${message.author.username}** wasn't able to respond.`);
      state = 'EOF'
    })
  }

  state = 'EOF'

  if (state !== 'EOF') {
    runPortal(message, h, baseHP, boss, state)
  }
}

module.exports = (message, h, baseHP, boss) => {
  // Experimental
  runPortal(message, h, baseHP, boss, 1)
}
