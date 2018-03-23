var prefix = "?spar pdt"

var availcom = ``;
availcom += `\`\`\`asciidoc\n`
availcom += `= There's nothing here... Yet =`
availcom += `\`\`\``

module.exports = (message) => {
  message.reply({embed: {
    color: 0x4524a6,
    timestamp: new Date(),
    description: `SparCompanion Pocket Dimension Utility: Help Page`,
    author: {
      name: message.member.displayName,
      icon_url: message.author.avatarURL
    },
    fields: [
      {
        name: `Description`,
        value: `"A pocket dimension is a piece of space cut out of another dimension and fitted into another space."`,
        inline: false
      },
      {
        name: `Commands`,
        value: `${availcom}`,
        inline: false
      }
    ]
  }})
}
