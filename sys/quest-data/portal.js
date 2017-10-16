function runPortal(message, h, baseHP, boss, state) {
  if (state == 1) {
    message.reply(`Hello, World! This is the other side of the portal.`)
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
