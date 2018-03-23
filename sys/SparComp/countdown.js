function InvokeTimer(message){
  let opponent = message.mentions.users.first();
  if (opponent.id === message.author.id) {
    message.reply(`You're really going to fight *yourself?*`)
    return;
  } else if (opponent.bot) {
    message.reply(`Bot users cannot be mentioned for this type of command.`)
    return;
  }
      message.channel.send(`${message.author}\n:crossed_swords::vs::crossed_swords:\n${opponent}, \n:three:`)
      setTimeout(() => {
        message.channel.send(`:two:`)
        setTimeout(() => {
          message.channel.send(`:one:`)
          setTimeout(() => {
            message.channel.send(`:regional_indicator_g::regional_indicator_o: `)
          }, 2000)
        }, 2000)
      }, 2000)
}

module.exports = (message) =>  {
  InvokeTimer(message)
  return;
}
