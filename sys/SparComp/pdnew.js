var pdc = 0x4524a6
var RTe = "Reply time expired."
const sql = require("sqlite");
sql.open("/root/NC/utils/NorthStar/pockets.sqlite");
  const ActThree = (['1', '2', '3'])
  const ActFour = (['1', '2', '3', '4'])
  const ActFive = (['1', '2', '3', '4', '5'])
  const ActBF = (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'])

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

    var pObj = {};
    pObj.userid = message.author.id;
    pObj.userdn = message.member.displayName;
    pObj.usertg = message.author.tag;
    pObj.name = pname;

    aw3(message, pObj)
  })
  .catch(() => {
    console.error;
    console.log(`PDT BREAK, new, at2 ${message.member.displayName}`)
    message.reply(`${RTe}`)
  })
}

function aw3(message, pObj) {
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
        value: `Please indicate the maximum size of your dimension to include your constructs and what-have-you. Please note that by default, exiting the radius will eject you from the dimension, and constructs that exceed the maximum radius will slowly dematerialize over time.`,
        inline: false
      },
      {
        name: `Available Options`,
        value: `${sizeopts}`,
        inline: false
      }
    ]
  }})
  message.channel.awaitMessages(at3 => at3.author.id === message.author.id && ActFive.some(word => at3.content.startsWith(word)), {
    max: 1,
    time: 30000,
    errors: ['time'],
  })
  .then(at3a => {
    const at3aC = at3a.first().content;
    if (at3aC.startsWith("1")) {
      pObj.size = "50m"
    } else if (at3aC.startsWith("2")) {
      pObj.size = "100m"
    } else if (at3aC.startsWith("3")) {
      pObj.size = "300m"
    } else if (at3aC.startsWith("4")) {
      pObj.size = "500m"
    } else if (at3aC.startsWith("5")) {
      pObj.size = "1km"
    } else {
      message.reply(`The system encountered a critical error.`)
      console.log(`PDT BREAK, new, at3a ${message.member.displayName}`)
      return;
    }
    aw4(message, pObj)
  })
  .catch(() => {
    console.error;
    console.log(`PDT BREAK, new, at3 ${message.member.displayName}`)
    message.reply(`${RTe}`)
  })
}

function aw4(message, pObj) {
  var weatheropts = `\`\`\`md\n`;
  weatheropts += `1. Clear\n`,
  weatheropts += `2. Rain/Snow\n`,
  weatheropts += `3. Thunder/Lightning\n`,
  weatheropts += `4. Thunder/Lightning & Rain/Snow\n`
  weatheropts += `\`\`\``
  //console.log(pObj)
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
        name: `Weather Stage`,
        value: `You may set the default weather for your area. **Temperatures** and **Gravity** may affect these choices.`
      },
      {
        name: `Available Options`,
        value: `${weatheropts}`
      }
    ]
  }})
  message.channel.awaitMessages(at4 => at4.author.id === message.author.id && ActFour.some(word => at4.content.startsWith(word)), {
    max: 1,
    time: 30000,
    errors: ['time'],
  })
  .then(at4a => {
    const at4aC = at4a.first().content;
    if (at4aC.startsWith("1")) {
      pObj.weather = "Clear"
      pObj.weatherico = ":sunny:"
    } else if (at4aC.startsWith("2")) {
      pObj.weather = "Rain/Snow"
      pObj.weatherico = ":cloud_rain:"
    } else if (at4aC.startsWith("3")) {
      pObj.weather = "Thunder/Lightning"
      pObj.weatherico = ":cloud_lightning:"
    } else if (at4aC.startsWith("4")) {
      pObj.weather = "Thunder/Lightning & Rain/Snow"
      pObj.weatherico = ":thunder_cloud_rain:"
    } else {
      message.reply(`The system encountered a critical error.`)
      console.log(`PDT BREAK, new, at4a ${message.member.displayName}`)
      return;
    }
    aw5(message, pObj)
  })
  .catch(() => {
    console.error;
    console.log(`PDT BREAK, new, at4 ${message.member.displayName}`)
    message.reply(`${RTe}`)
  })
}

function aw5(message, pObj) {

  var bfscaleopts = `\`\`\`md\n`
  bfscaleopts += `0. Calm\n`
  bfscaleopts += `< Less-than 1km/h or less-than 1mph >\n`
  bfscaleopts += `1. Light air\n`
  bfscaleopts += `< 1-5 km/h or 1-3 mph >\n`
  bfscaleopts += `2. Light breeze\n`
  bfscaleopts += `< 6-11 km/h or 4-7 mph >\n`
  bfscaleopts += `3. Gentle breeze\n`
  bfscaleopts += `< 12-19 km/h or 8-12 mph >\n`
  bfscaleopts += `4. Moderate breeze\n`
  bfscaleopts += `< 20-28 km/h or 13-18 mph >\n`
  bfscaleopts += `5. Fresh breeze\n`
  bfscaleopts += `< 29-38 km/h or 19-24 mph >\n`
  bfscaleopts += `6. Strong breeze\n`
  bfscaleopts += `< 39-49 km/h or 25-31 mph >\n`
  bfscaleopts += `7. High wind / moderate gale\n`
  bfscaleopts += `< 50-61 km/h or 32-38 mph >\n`
  bfscaleopts += `[!]: Whole trees in motion; inconvenience felt when walking against the wind.\n`
  bfscaleopts += `8. Gale\n`
  bfscaleopts += `< 62-74 km/h or 39-46 mph >\n`
  bfscaleopts += `[!]: Twigs break off trees; generally impedes progress.\n`
  bfscaleopts += `9. Strong/severe Gale\n`
  bfscaleopts += `< 75-88 km/h or 47-54 mph >\n`
  bfscaleopts += `[!]: Slight structural damage possible.\n`
  bfscaleopts += `10. Storm, Whole Gale\n`
  bfscaleopts += `< 89-102 km/h or 55-63 mph >\n`
  bfscaleopts += `[!]: Trees uprooted, significant structural damage.\n`
  bfscaleopts += `\`\`\``

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
        name: `Wind Stage`,
        value: `You can customize the level of wind turbulence that is passively generated in the background. These are based off of the **Beaufort Scale.** The maximum for this scale is 10, as any higher would be unwise.`
      },
      {
        name: `Available Options`,
        value: `${bfscaleopts}`
      }
    ]
  }})
  message.channel.awaitMessages(at5 => at5.author.id === message.author.id && ActBF.some(word => at5.content.startsWith(word)), {
    max: 1,
    time: 60000,
    errors: ['time'],
  })
  .then(at5a => {
    const at5aC = at5a.first().content;
    if (at5aC === "0") {
      pObj.wind = 0;
    } else if (at5aC === "1") {
      pObj.wind = 1;
    } else if (at5aC === "2") {
      pObj.wind = 2;
    } else if (at5aC === "3") {
      pObj.wind = 3;
    } else if (at5aC === "4") {
      pObj.wind = 4;
    } else if (at5aC === "5") {
      pObj.wind = 5;
    } else if (at5aC === "6") {
      pObj.wind = 6;
    } else if (at5aC === "7") {
      pObj.wind = 7;
    } else if (at5aC === "8") {
      pObj.wind = 8;
    } else if (at5aC === "9") {
      pObj.wind = 9;
    } else if (at5aC === "10") {
      pObj.wind = 10;
    } else {
      message.reply(`The system encountered a critical error.`)
      console.log(`PDT BREAK, new, at5a ${message.member.displayName}`)
      return;
    }
    aw6(message, pObj)
  })
  .catch(() => {
    console.error;
    console.log(`PDT BREAK, new, at5 ${message.member.displayName}`)
    message.reply(`${RTe}`)
  })
}

function aw6(message, pObj) {
  //console.log(pObj)
  var todopts = `\`\`\`md\n`
  todopts += `1. Day\n`
  todopts += `2. Night\n`
  todopts += `3. Relative\n`
  todopts += `4. Dusk/Dawn`
  todopts += `\`\`\``
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
        name: `Time of Day Stage`,
        value: `This stage only has three options. Selecting relative will have a day/night cycle based on **Eastern Standard Time.**`
      },
      {
        name: `Available Options`,
        value: `${todopts}`
      }
    ]
  }})
  // there's a bug here somewhere.
  message.channel.awaitMessages(at6 => at6.author.id === message.author.id && ActFour.some(word => at6.content.startsWith(word)), {
    max: 1,
    time: 30000,
    errors: ['time'],
  })
  .then(at6a => {
    const at6aC = at6a.first().content;
    if (at6aC.startsWith("1")) {
      pObj.tod = "Day"
    } else if (at6aC.startsWith("2")) {
      pObj.tod = "Night"
    } else if (at6aC.startsWith("3")) {
      pObj.tod = "Relative"
    } else if (at6aC.startsWith("4")) {
      pObj.tod = "Dusk/Dawn"
    } else {
      message.reply(`The system encountered a critical error.`)
      console.log(`PDT BREAK, new, at6a ${message.member.displayName}`)
      return;
    }
    aw7(message, pObj)
  })
  .catch(() => {
    console.error;
    console.log(`PDT BREAK, new, at6 ${message.member.displayName}`)
    message.reply(`${RTe}`)
  })
}

function aw7(message, pObj) {
  /*
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
        name: `Temperature Stage`,
        value: `The temperature will **affect weather.** You are allowed to specify anywhere between **-15**°c and **30**°c.`
      },
      {
        name: `Available Options`,
        value: `${tempopts}`
      }
    ]
  }})
  message.channel.awaitMessages(at7 => at7.author.id === message.channel.id && Number.isInteger(at7.content) && at7.content >= -15 && at7.content <= 30, {
    max: 1,
    time: 30000,
    errors: ['time'],
  })
  .then(at7a => {
    pObj.temp = Math.round(at7a.first().content)
    console.log(pObj)
  })
  .catch(() => {
    console.error;
    console.log(`PDT BREAK, new, at7 ${message.member.displayName}`)
    message.reply(`${RTe}`)
  })
  */
  console.log(pObj)
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
