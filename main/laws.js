const settings = require('../settings.json');
const chalk = require ('chalk');
exports.run = (client, message, params) => {
  if (message.guild.id === settings.alaskaguild) {
    message.channel.send({embed: {
      color: 0xA5A5A7,
      timestamp: new Date(),
      description: "This will disappear in 2 minutes.",
      author: {
        name: "Alaska Directory",
        icon_url: client.user.avatarURL
      },
      fields: [
        {
          name: "Alaska Trello Directories",
          value: "[Trello](https://trello.com/b/B2EurXuB/alaska-directory)",
          inline: true
        },
        {
          name: "Laws of Alaska",
          value: "[Trello](https://trello.com/b/JV8cEG1s/laws-of-the-state)",
          inline: true
        },
        {
          name: "Legislation or Congress",
          value: "[Trello](https://trello.com/b/2ikyOwVE/legislation-of-alaska)",
          inline: false
        },
        {
          name: "Dev",
          value: "[Trello](https://trello.com/b/leayQeSP/anchorage-development-board)",
          inline: true
        },
        {
          name: "Awards of Alaska",
          value: "[Trello](https://trello.com/b/8fdMwSXW/awards-of-alaska)",
          inline: true
        },
        {
          name: "Alaska Judicial Board",
          value: "[Trello](https://trello.com/b/s97gZFo1/alaska-judicial-board)",
          inline: false
        },
        {
          name: "Anchorage Admin Board",
          value: "[Trello](https://trello.com/b/N6lKfBul/alaskan-admin-board)",
          inline: true
        }
      ]
    }}).then(message => {
      setTimeout(() => {
        message.delete()
      }, 120000) // 2 minutes
    })
  } else {
    message.reply("Sorry! This is an Alaska-Discord Only Command!")
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['alaskanlaw', 'law'],
  permLevel: 1
};

exports.help = {
  name: 'laws',
  description: 'Displays trello links for the Alaska discord server.',
  usage: 'laws'
};
