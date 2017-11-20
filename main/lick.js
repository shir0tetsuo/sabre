function magicJohnson(client, message, params){
  let aids = Math.Floor(Math.Random() * 10) + 1;
  aids = aids % 2;
  
  switch(aids){
    case 0:
      if(message.mentions.members.first() !== undefined){
        message.channel.send(`Oh no! ${message.mentions.members.first().displayName} has been licked by ${mess.author} and was given AIDS. You've been Magic Johnson'd!`);
      }
      break;
      
    case 1:
      if(message.mentions.members.first() !== undefined){
        message.channel.send(`Woah! ${mess.author} just tried to lick ${message.mentions.members.first().displayName} but failed to get rid of the AIDS.`);
        break;
      }
  }
}

exports.run = (client, message, params) => {
  magicJohnson(client, message, params);
};

/*
enabled, guildOnly, aliases, permission level
*/
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['lck'],
  permLevel: 0
};

/*
name, desc., usage
name is also the command alias
*/
exports.help = {
  name: '..lick',
  description: 'Lick someone',
  usage: '..lick <tag someone>'
};
