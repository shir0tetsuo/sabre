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
        value: `Please enter a name for your new Pocket Dimension. The name must be between 4 and 20 characters in length.`,
        inline: false
      }
    ]
  }})
  message.channel.awaitMessages(at2 => at2.author.id === message.author.id && at2.content !== null && at2.content !== undefined && at2.content.length > 3 && at2.content.length <= 20, {
    max: 1,
    time: 30000,
    errors: ['time'],
  })
  .then(at2a => {
    var pname = at2a.first().content;
    if (pname === undefined || pname === null) {
      message.reply(`The system encountered an error and was forced to quit.`)
      console.log(`PDT BREAK, new, at2a pname handler, ${message.member.displayName}`)
      return;
    }
    aw3(message, pname)
  })
  .catch(() => {
    console.error;
    console.log(`PDT BREAK, new, at2 ${message.member.displayName}`)
    message.reply(`${RTe}`)
  })
}

function aw3(message, pname) {
  var sizeopts = ``;
  sizeopts += `\`\`\`md\n`
  sizeopts += `1. 50m Radius\n`
  sizeopts += `2. 100m Radius\n`
  sizeopts += `3. 300m Radius\n`
  sizeopts += `4. 500m Radius\n`
  sizeopts += `5. 1km Radius`
  sizeopts += `\`\`\``
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
        name: `Size Stage`,
        value: `Please indicate the maximum size of your dimension to include your constructs and what-have-you. Please note that exiting the radius will eject you from the dimension, and constructs that exceed the maximum radius will slowly dematerialize over time.`,
        inline: false
      },
      {
        name: `Available Options`,
        value: `${sizeopts}`,
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
