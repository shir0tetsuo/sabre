var prefix = "?spar pdt"

var availcom = ``;
availcom += `\`\`\`asciidoc\n`
availcom += `= Pocket Dimension Tools =\n`
availcom += `${prefix} new    :: Create a New Pocket Dimension.\n`
availcom += `${prefix} open   :: Open a Pocket Dimension.\n`
availcom += `${prefix} rm     :: Delete a Pocket Dimension.\n`
availcom += `${prefix} mod    :: Modify an Existing Pocket Dimension.`
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
