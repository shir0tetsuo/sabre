const sql = require("sqlite");
sql.open("/root/NC/utils/NorthStar/pockets.sqlite");
const PDNewPage = require('./pdnew.js')
const confirm = (['yes', 'no'])

function RequestObject(message) {
  sql.get(`SELECT * FROM Dimension WHERE userId = "${message.author.id}"`).then(pBlock => {
      if (!pBlock) {
        message.reply(`\`There was no record found.\``)
        PDNewPage(message);
      } else {
        PostObject(message, pBlock)
      }
    })
    .catch(() => {
      return message.reply(`\`Database Failure.\``)
    })
}

function PostObject(message, pObj) {
  message.channel.send({
    embed: {
      color: 0xeb7c09,
      timestamp: new Date(),
      description: ``,
      author: {
        name: message.member.displayName,
        icon_url: message.author.avatarURL
      },
      fields: [{
          name: `Terrain`,
          value: `**Platform:** ${pObj.platform}\n**Size:** ${pObj.size} Radius\n**Self-Repair:** ${pObj.repair}\n**Density Override:** ${pObj.override}\n**Time of Day:** ${pObj.tod}\n**Parallax:** ${pObj.parallax}`,
          inline: true
        },
        {
          name: `Weather`,
          value: `**Dynamic:** ${pObj.dynamic}\n**Wind Level:** ${pObj.wind}\n**Weather:** ${pObj.weatherIco} ${pObj.weather}\n**Temperature:** ${pObj.temp}°c\n**Gravity:** ${pObj.gravity}\n**Humidity:** ${pObj.humidity}%`,
          inline: true
        },
        {
          name: `Read/Write`,
          value: `**Write-Access:** ${pObj.write}\n**Boundary:** ${pObj.boundary}\n**Continuance:** ${pObj.continuance}\n**Name: \`${pObj.name}\`**`,
          inline: true
        },
        {
          name: `Ownership`,
          value: `**${pObj.userTg}**\n(${pObj.userDn}) \`[${pObj.userId.substring(0,5)}]\``,
          inline: true
        },
        {
          name: `Materialize?`,
          value: `\`yes\` / \`no\``
        }
      ]
    }
  })
  message.channel.awaitMessages(mat => mat.author.id === message.author.id && confirm.some(word => mat.content.toLowerCase().startsWith(word)), {
      max: 1,
      time: 30000,
      errors: ['time'],
    })
    .then(dat => {
      const ultraDat = dat.first().content.toLowerCase();
      if (ultraDat.startsWith("yes")) {
        MaterialTime(message)
      } else if (ultraDat.startsWith("no")) {
        message.reply(`\`Chosen not to materialize.\``)
      }
    })
    .catch(() => {
      message.reply(`\`Reply time expired.\``)
    })
}

function MaterialTime(message) {
  message.reply(`How many minutes would you like this materialized for? (Max: 120)`)
  message.channel.awaitMessages(min => min.author.id === message.author.id && Number.isInteger(min.content * 1) && min.content * 1 >= 1 && min.content * 1 <= 120, {
      max: 1,
      time: 30000,
      errors: ['time'],
    })
    .then(act => {
      var time = Math.round(act.first().content * 1) * 60000
      if (time * 1 === 60000) {
        message.reply(`\`Your pocket dimension has been opened for 1 minute.\``)
      } else {
        message.reply(`\`Your Pocket Dimension has been opened for ${act.first().content} minutes.\``)
      }
      setTimeout(() => {
        message.reply(`\`Your Pocket Dimension has closed and you have been evicted.\``)
      }, time)
    })
}

module.exports = (message) => {
  // Read Database =>
  //  Post Object =>
  //   Question Minutes
  //   Confirm Message
  RequestObject(message)
}
