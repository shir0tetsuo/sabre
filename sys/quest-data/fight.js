const Rand = require('./random.js')
const Transaction = require('./transaction.js')
const NPC = require('./NPCData.js')
const PLY = require('./PlayerData.js')
const Reward = require('./reward.js')

function fight(message, uid, boss, bossHP, h, baseHP, isFighting) {
  //console.log(message.content, uid, boss, bossHP, h, baseHP)


  // Invoke Await
  message.channel.send(`**${message.member.displayName} (${message.author.username}#${message.author.discriminator})**,\n type \`${validActionString}\` to continue.`)
  message.channel.awaitMessages(response => response.author.id === uid && validActions.some(word => response.content.toLowerCase().startsWith(word)), {
      max: 1,
      time: 60000,
      errors: ['time'],
    })

    // Use Collected Data
    .then(collected => {
      const msg = collected.first();
      const input = msg.content.toLowerCase();

      ////////////////////////////////////////////////////////////////////////////
      // NPC DATA
      ////////////////////////////////////////////////////////////////////////////

      // Accuracy increases as hlvl increases
      var npcAccuracy = 59 + h.hlvl,

        // Load Player's HP to Memory
        oldPHP = baseHP;

      // Keep NPC's Accuracy within Acceptable Parameters
      if (npcAccuracy >= 95) {
        var npcMaxAccuracy = 95
      } else {
        var npcMaxAccuracy = npcAccuracy;
      }

      // Calculate NPC's Accuracy
      var npcHitChance = Math.round(Math.random() * 100);

      ////////////////////////////////////////////////////////////////////////////////
      // NPC Accuracy Failure, Generate NPC Message (GNPCM)
      if (npcHitChance >= npcMaxAccuracy) {
        var npcMessage = `\`\`\`diff\n--- ${boss} Missed!\`\`\``

        // NPC Accuracy Success
      } else {
        // NPC Damage Calculation
        var npcDamage = Math.round(Math.random() * (h.hlvl * 1550 - h.hlvl * 455) + h.hlvl * 455)

        // Lower Player's HP
        baseHP -= npcDamage;

        // Generate NPC Message (GNPCM)
        var npcMessage = `\`\`\`diff\n- ${msg.author.username} was Damaged (${oldPHP} -> ${baseHP})\`\`\``
      }
      ////////////////////////////////////////////////////////////////////////////////

      ////////////////////////////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////////////////////////
      // PLAYER'S MOVE
      // ATK Floor, higher the accuracy, higher the chance
      ////////////////////////////////////////////////////////////////////////////////
      // atk
      if (input === 'atk') {

        // Define content handling.
        var sendContent = '';

        // Player used Object
        sendContent += `**${msg.author.username}** ${PLY(message, 'attackMessage', isFighting, h)}\n`

        // Calculate Player Accuracy and Chance
        var atkAccuracy = 0.75,
          atkHitChance = Math.round(Math.random());

        // Player Accuracy Failure, Generate Player Message (GPM)
        if (atkHitChance >= atkAccuracy) {
          var atkMessage = `\`\`\`diff\n--- ${msg.author.username} Missed!\`\`\``

          // Player Accuracy Success
        } else {
          // Load NPC's HP to Memory
          var oldHP = bossHP;

          // Calculate Player's Damage
          var atkDamage = Math.round(Math.random() * (h.hlvl * 900 - h.hlvl * 455) + h.hlvl * 455)

          // Decrease Boss HP
          bossHP -= atkDamage;

          // Generate Player Message (GPM)
          var atkMessage = `\`\`\`diff\n+ ${boss} was Damaged (${oldHP} -> ${bossHP})\`\`\``
        }

        // Munge GNPCM + GPM
        sendContent += `${atkMessage}`
        sendContent += `${npcMessage}\n`

        //////////////////////////////////////////////////////////////////////////
        // Someone Died
        if (Transaction(msg, 'baseHPZero', baseHP) === true || Transaction(msg, 'baseHPZero', bossHP) === true) {
          // Invoke Reset
          PLY(message, 'reset', isFighting);
          if (Transaction(msg, 'baseHPZero', baseHP) === true) {
            sendContent += `\`\`\`diff\n- You died.\`\`\``
          }
          if (Transaction(msg, 'baseHPZero', bossHP) === true) {
            var rewardObject = Reward(msg, h)
            sendContent += `\`\`\`diff\n! ${rewardObject}\`\`\``
          }
          // Return Compiled Data
          return msg.channel.send(`${sendContent}`);
        }
        //////////////////////////////////////////////////////////////////////////

        // Submit Compiled Data
        msg.channel.send(`${sendContent}`)

        // Continue Processing
        fight(message, uid, boss, bossHP, h, baseHP)
        return;

        ////////////////////////////////////////////////////////////////////////////////
        // special atk
      } else if (input === 'special') {

        // Define content handling.
        var sendContent = '';

        // Player used Special Object
        sendContent = `**${msg.author.username}** ${PLY(message, 'specialMessage', isFighting)}\n`

        // Calculate Player Accuracy and Chance
        var atkAccuracy = 0.65,
          atkHitChance = Math.round(Math.random());

        // Player Accuracy Failure, Generate Player Message (GPM)
        if (atkHitChance >= atkAccuracy) {
          var atkMessage = `\`\`\`diff\n--- ${msg.author.username} Missed!\`\`\``

          // Player Accuracy Success
        } else {
          // Load NPC's HP to Memory
          var oldHP = bossHP;

          // Calculate Player's Damage
          var atkDamage = Math.round(Math.random() * (h.hlvl * 1200 - h.hlvl * 525) + h.hlvl * 525)

          // Decrease Boss HP
          bossHP -= atkDamage;

          // Generate Player Message (GPM)
          var atkMessage = `\`\`\`diff\n+ ${boss} was Damaged (${oldHP} -> ${bossHP})\`\`\``
        }

        // Munge GPCM + GPM
        sendContent += `${atkMessage}`
        sendContent += `${npcMessage}\n`

        //////////////////////////////////////////////////////////////////////////
        // Someone Died
        if (Transaction(msg, 'baseHPZero', baseHP) === true || Transaction(msg, 'baseHPZero', bossHP) === true) {
          // Invoke Reset
          PLY(message, 'reset', isFighting);
          if (Transaction(msg, 'baseHPZero', baseHP) === true) {
            sendContent += `\`\`\`diff\n- You died.\`\`\``
          }
          if (Transaction(msg, 'baseHPZero', bossHP) === true) {
            var rewardObject = Reward(msg, h)
            sendContent += `\`\`\`diff\n! ${rewardObject}\`\`\``
          }
          // Return Compiled Data
          return msg.channel.send(`${sendContent}`);
        }
        //////////////////////////////////////////////////////////////////////////

        // Submit Compiled Data
        msg.channel.send(`${sendContent}`)

        // Continue Processing
        fight(message, uid, boss, bossHP, h, baseHP)
        return;

        ////////////////////////////////////////////////////////////////////////////////
        // Special Moves
        ////////////////////////////////////////////////////////////////////////////////
        // guard
      } else if (input === 'guard') {

        // Define content handling.
        var sendContent = '';
        //console.log('Guarded')

        // PLAYER HEAL on No NPC Damage Defined (Accuracy Failure)
        if (!npcDamage) {
          // Generate NPC Message (GNPCM)
          sendContent += `\`\`\`diff\n+ ${boss}'s attack failed\`\`\``
          // Player HP Heal Calculation
          healCalculation = h.hlvl * 500

          // Append Player's Saved HP
          baseHP += healCalculation

          // Generate Player Message (GPM)
          sendContent += `\`\`\`diff\n+ ${msg.author.username} healed (${oldPHP} + ${healCalculation} -> ${baseHP})\`\`\``

          // PLAYER GETS DAMAGED
        } else {
          // Shave off some NPC Damage
          npcGuarded = Math.round(npcDamage / 8 * 3)
          // Append shaved NPC Damage to Player HP
          baseHP += npcGuarded

          // Generate Player Message (GPM)
          sendContent += `\`\`\`diff\n- ${msg.author.username} was damaged (${oldPHP} -> ${baseHP})\n`
          sendContent += `+ Protected against (${npcGuarded} damage)\`\`\``
        }

        //////////////////////////////////////////////////////////////////////////
        // Somebody Died
        if (Transaction(msg, 'baseHPZero', baseHP) === true) {
          sendContent += `\`\`\`diff\n- You died.\`\`\``
          // Invoke Reset
          PLY(message, 'reset', isFighting);
          // Return Compiled Data
          return msg.channel.send(`${sendContent}`);
        }
        //////////////////////////////////////////////////////////////////////////

        // Submit Compiled Data
        msg.channel.send(`${sendContent}`)

        // Continue Processing
        fight(message, uid, boss, bossHP, h, baseHP)
        return;
        ////////////////////////////////////////////////////////////////////////////////
        // run
      } else if (input === 'run') {
        msg.channel.send(`**${message.member.displayName} (${message.author.username}#${message.author.discriminator})** Ran Away.`)

        PLY(message, 'reset', isFighting);
        return;
      }
      /*  message.channel.send(`${sendContent}`)
        fight(message, uid, boss, bossHP, h, baseHP) */

      ////////////////////////////////////////////////////////////////////////////////
      // Player was unable to respond
    }).catch(() => {
      console.error;
      //console.log(message.content, uid, boss, bossHP, h, baseHP)
      message.channel.send(`**${message.author.username}** wasn't able to respond.`);

      PLY(message, 'reset', isFighting);
    })
}

module.exports = (message, uid, boss, bossHP, h, baseHP, isFighting) => {
  fight(message, uid, boss, bossHP, h, baseHP, isFighting)
}
