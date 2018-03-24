var pdc = 0x4524a6
var RTe = "Reply time expired."
const sql = require("sqlite");
sql.open("/root/NC/utils/NorthStar/pockets.sqlite");

function AwaitTrain(message) {
  // This area is just as a confirmation system
  message.channel.awaitMessages(at1 => at1.author.id === message.author.id && at1.content.toLowerCase().startsWith('next'), {
    max: 1,
    time: 30000,
    errors: ['time'],
  })
  .then(() => {
    aw2(message)
  })
  .catch(() => {
    console.error;
    console.log(`PDT BREAK, new, at1 ${message.member.displayName}`)
    message.reply(`${RTe}`)
  })
}

function aw2(message) {
  message.channel.send({embed: {
    color: pdc,
    timestamp: new Date(),
    description: ``,
    author: {
      name: message.member.displayName,
      icon_url: message.author.avatarURL
    },
    fields: [
      {
        name: `Caution`,
        value: `Continuing may overwrite your existing dimension.`,
        inline: false
      },
      {
        name: `Naming Stage`,
        value: `Please enter a name for your new Pocket Dimension.`,
        inline: false
      }
    ]
  }})
}

module.exports = (message) => {
  message.channel.send({embed: {
    color: pdc,
    timestamp: new Date(),
    description: `SparCompanion Pocket Dimension Utility: Create`,
    author: {
      name: message.member.displayName,
      icon_url: message.author.avatarURL
    },
    fields: [
      {
        name: `This utility is used to create new Pocket Dimensions.`,
        value: `The Pocket Dimensions feature allows you to create a multi-purpose space using a series of predefined options. You are allowed to have __one__ pocket dimension at a time. This system will guide you through these sets of questions, from which after you can get started using your own pocket dimension space supported by the SparCompanion system. Usage of these spaces only requires the knowledge on how to follow links. Type \`next\` to continue!`,
        inline: false
      }
    ]
  }})
  .then(() => {
    AwaitTrain(message)
  })
}
