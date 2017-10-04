// https://github.com/RayzrDev/RayzrDevBot/blob/master/src/commands/games/fight.js
function randomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

const missMessage = [
  'You missed!',
  'Flyball! No damage dealt!',
  'Oh snap, the attack failed!',
  'Opponent dodged at lightning speed!',
  'The hit didn\'t land!',
  'You hit a tree instead!',
  'They got out of the way just in time!'
]

const turnSkip = [
  'didn\'t respond, skipping their turn.',
  'got distracted and couldn\'t fight back.',
  'was busy eating pizza! Skipping their turn.',
  'became disoriented after that last one, oh well.'
]

const afkTerminate = [
  'Looks like the fight ended.',
  'Neither opponent could finish the fight.',
  'Everybody left.',
  'Both opponents fell asleep.'
]

// Attack Floor
const attacks = {
    punch: {
        damage: {
            min: 500.0,
            max: 900.0
        },
        attackChance: 0.75,
        messages: [
            'was punched in the gut by',
            'was punched in the face by',
            'was punched in the stomach by'
        ]
    },
    kick: {
        damage: {
            min: 600.0,
            max: 1000.0
        },
        attackChance: 0.60,
        messages: [
            'was kicked in the gut by',
            'was dropkicked by',
            'was kicked in the butt by'
        ]
    },
    slam: {
        damage: {
            min: 900.0,
            max: 2000.0
        },
        attackChance: 0.35,
        messages: [
            'was slammed on the head with a ladder by',
            'was slammed in the face with a hammer by',
            'was slammed on the head with a metal door by',
            'was slammed into the wall by'
        ]
    },
    fireball: {
      damage: {
        min: 700.0,
        max: 1000.0
      },
      attackChance: 0.35,
      messages: [
        'was badly burnt by a ball of fire by',
        'was lit by a Zippo from',
        'spontaneously combusted! Blame',
        'fell into a pit of lava! It was placed by'
      ]
    },
    earthquake: {
      damage: {
        min: 500.0,
        max: 1200.0
      },
      attackChance: 0.35,
      messages: [
        'fell into the depths of the Earth! Caused by',
        'was shook harder than a Martini! Blame',
        'was hit by a flying piece of rock! I think it was',
        'used the power of Nature! It hurts badly. Thanks a lot,'
      ]
    },
    david: {
      damage: {
        min: 750.0,
        max: 1500.0
      },
      attackChance: 0.33,
      messages: [
        'was verbally assaulted by David! He was summoned by',
        'became investigated by David! Looks like it was',
        'was damaged by David\'s Mystical Powers! Blame',
        'had David summoned upon! He is not amused! Blame'
      ]
    },
    csd: {
      damage: {
        min: 400.0,
        max: 1000.0
      },
      attackChance: 0.40,
      messages: [
        'was raided by CSD! They were called in by',
        'was investigated by CSD! Blame',
        'was yelled at by CSD! I think it was'
      ]
    },
    hyperpunch: {
      damage: {
        min: 300.0,
        max: 2000.0
      },
      attackChance: 0.40,
      messages: [
        'was hyperpunched! Hurray for',
        'had their jaw broken by the might of',
        'was slammed into a tree by',
        'is in severe pain! A blow was landed by'
      ]
    },
    lightning: {
      damage: {
        min: 700.0,
        max: 3000.0
      },
      attackChance: 0.20,
      messages: [
        'was zapped! Opponent summoned a lightning strike! It was caused by',
        'was struck by lightning from'
      ]
    },
    drown: {
      damage: {
        min: 500.0,
        max: 2000.0
      },
      attackChance: 0.25,
      messages: [
        'was drowned in the nearby pool! It was',
        'experienced a Tsunami! Blame',
        'got caught underwater for too long! Dang,'
      ]
    },
    airblade: {
      damage: {
        min: 900.0,
        max: 3000.0
      },
      attackChance: 0.30,
      messages: [
        'was sliced up by wind! It was',
        'was choked from lack of oxygen! Suffocated by',
        'was tumbled off a cliff by extreme winds! Blame'
      ]
    },
    ghosts: {
      damage: {
        min: 500.0,
        max: 2000.0
      },
      attackChance: 0.40,
      messages: [
        'was picked up by the ghosts and dropped from up high! Might of been',
        'was posessed! The ghosts made them hit themselves. Coulda been',
        'suddenly died and was brought back by'
      ]
    },
    shadowsword: {
      damage: {
        min: 1000.0,
        max: 2500.0
      },
      attackChance: 0.25,
      messages: [
        'was sliced by the Sword of Shadows! Look out, it\'s',
        'was verbally abused by Shadow\'s Word! It was'
      ]
    },
    slap: {
      damage: {
        min: 20.0,
        max: 100.0
      },
      attackChance: 0.95,
      messages: [
        'was slapped up da face by',
        'was hit in the noggin by'
      ]
    }
};

// Map actions as valid responses
const validActions = Object.keys(attacks).concat('leave');
const validActionRegex = new RegExp(validActions.join('|'), 'i');
const validActionString = validActions.map(action => `**${action}**`).join(' || ');

// Setup player IDs
function Player(user) {
    if (Player.cache[user.id]) {
        return Player.cache[user.id];
    }

    Player.cache[user.id] = this;

    this.user = user;

    this.reset();
}

// Player Reset and Setup
Player.prototype.reset = function () {
    this.hp = 8000;
    this.isFighting = false;
    this.miss = 0;
};

// Debug information in logs
Player.prototype.debug = function () {
    console.log(`${this.user.username}'s HP: ${this.hp}`);
};

Player.cache = {};

// Info returns attack information
function generateMessage() {
    return Object.keys(attacks).map(name => {
        const attack = attacks[name];
        return `**${name}**\nDamage: \`${attack.damage.min}-${attack.damage.max}\`\nAccuracy: \`${Math.floor(attack.attackChance * 100)}%\``;
    }).join('\n\n');
}

// Run
/*
Notes:
- Add leaderboard system for wins and losses.
- Add ticket increase and decrease via calculation on player win.
*/
exports.run = (bot, message, args) => {
    if (args[0] === 'info') {
        message.author.send(generateMessage());
        message.channel.send(':dagger: Attack data sent to DM!');
        return;
    }

    const mention = message.mentions.users.first();

    if (!mention) {
        return message.reply(`\`ERROR\` You need to mention a user!`)
        //throw 'You must mention someone to fight them!';
    }

    if (mention.bot) {
        return message.reply(`\`ERROR\` Bots can't play!`)
        //throw 'You can\'t play with a bot!';
    }

    if (mention.id === message.author.id) {
        return message.reply(`\`ERROR\` You can't commit harakiri!`)
        //throw 'You can\'t fight by yourself!';
    }

    const you = new Player(message.author);
    if (you.isFighting) {
        return message.reply(`\`ERROR\` You can't pick a fight with someone while you're being punched in the face!`)
        //throw 'You\'re already fighting someone!';
    }

    const opponent = new Player(mention);
    if (opponent.isFighting) {
        return message.reply(`\`ERROR\` This player is a little distracted!`)
        //throw 'Your opponent is already in a fight!';
    }

    you.isFighting = true;
    opponent.isFighting = true;

    fight(message, you, opponent, true);
};

function fight(message, player1, player2, turn) {
    if (!player1.isFighting || !player2.isFighting) {
        // If either one of them isn't supposed to be fighting, reset and exit.
        player1.reset();
        player2.reset();

        return;
    }

    const currentPlayer = turn ? player1 : player2;
    const targetPlayer = turn ? player2 : player1;

    message.channel.send(`**${currentPlayer.user.username}**, it's your move. Type ${validActionString} to retaliate!`);
    message.channel.awaitMessages(response => response.author.id === currentPlayer.user.id && validActionRegex.test(response.content), {
        max: 1,
        time: 30000,
        errors: ['time'],
    }).then(collected => {
        const msg = collected.first();
        const input = msg.content.toLowerCase();

        if (input === 'leave') {
          // This should decrease the ticket count of the one surrendering.
            msg.channel.send(`**${currentPlayer.user.username}** surrendered to **${targetPlayer.user.username}**!`);

            currentPlayer.reset();
            targetPlayer.reset();

            return;
        }

        currentPlayer.miss = 0;

        const attack = attacks[input];

        if (Math.random() > attack.attackChance) {
          // Generate more random messages
            message.channel.send(`${randomItem(missMessage)}`);
        } else {
            // variation = max - min
            // rand * variation + min
            const damage = Math.round(Math.random() * (attack.damage.max - attack.damage.min) + attack.damage.min);

            targetPlayer.hp -= damage;
            message.channel.send(`**${targetPlayer.user.username}** ${randomItem(attack.messages)} **${currentPlayer.user.username}**\n**${targetPlayer.user.username}**'s health is now ${targetPlayer.hp} (-${damage} HP).`);

            if (targetPlayer.hp <= 0) {
              // This is where the ticket deductions and additions should occur
                message.channel.send(`**${targetPlayer.user.username}** was defeated by **${currentPlayer.user.username}**!`);
                targetPlayer.reset();
                currentPlayer.reset();
                return;
            }
        }

        // By doing !turn it inverts the turn state. Ezpz ;)
        fight(message, player1, player2, !turn);
    }).catch(() => {
        message.channel.send(`**${currentPlayer.user.username}** ${randomItem(turnSkip)}`);
        currentPlayer.miss++;

        if (currentPlayer.miss >= 2) {
            message.channel.send(`:no_pedestrians: ${randomItem(afkTerminate)}`);

            currentPlayer.reset();
            targetPlayer.reset();

            return;
        }

        fight(message, player1, player2, !turn);
    });
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['sf'],
  permLevel: 1
};

exports.help = {
    name: 'superfight',
    usage: 'superfight info|<@user>',
    description: 'Start a fight with another user and see who will win.'
};
