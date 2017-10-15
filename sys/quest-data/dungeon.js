const fight = require('./fight.js')
const Rand = require('./random.js')
const Transaction = require('./transaction.js')
const NPC = require('./NPCData.js')
const Reward = require('./reward.js')
const MAP = require('./set_map.json')
var player = MAP.player,
  topleft = MAP.topleft,
  topright = MAP.topright,
  horz = MAP.horz,
  horz2 = MAP.horz2,
  botleft = MAP.botleft,
  botright = MAP.botright,
  qkey = MAP.qkey,
  vert = MAP.vert,
  LIGHT = MAP.LIGHT,
  LIGHTPADDING = MAP.LIGHTPADDING,
  MED = MAP.MED,
  MEDPADDING = MAP.MEDPADDING,
  DARK = MAP.DARK,
  DARKPADDING = MAP.DARKPADDING

  function bossMode(condition, boss, area, areaName, areaDungeon) {
    if (condition === true) {
      content += `[Area](${area} :: ${areaName} ::)\n`
      content += `/* A Boss wants to Fight! ${boss} *\n`
      content += `/* ${topleft}${horz2}${topright} *\n`
      return content
    } else {
      content += `[Area](${area} :: ${areaName} ::)\n`
      content += `# Discovered ${areaDungeon}\n`
      content += `> ${topleft}${horz}${topright}\n`
      return content
    }
  }

module.exports = (message, boss, bossTiny, h, content, chance) => {
  var uid = message.author.id,
    isFighting = false;

    if (h.hlvl >= 1) {

      // bossmode
      ////////////////////
      if (chance >= 96) {
        bossMode(true, boss, 1, 'Dark Chasm', 'a Dark Room')
        // formulas
        // boss health / accuracy,
        // player health
        var bossHP = Math.round(Math.random() * (7600 - 1500*h.hlvl) + 1500*h.hlvl),
          npcACC = Math.round(Math.random() * (65 - 33) + 33 + h.hlvl),
          baseHP = Math.round(Math.random() * (6500 - 5500) + 5500 + 1250 * h.hlvl);
          if (npcACC >= 95) var npcACC = 95
        fight(message, uid, boss, bossHP, h, baseHP, isFighting, npcACC)
      } else {
        bossMode(false, boss, 1, 'Dark Forest', 'a Dark Room')
      }
      ////////////////////
      // Chance Core
      ////////////////////
      if (chance >= 96) {
        dungeonMode('fight', content)
      } else if (chance >= 85) {
        dungeonMode('stranger', content)
      } else if (chance >= 80) {
        dungeonMode('hdtk', content)
      } else if (chance >= 70) {
        dungeonMode('tk', content)
      } else if (chance >= 50) {
        dungeonMode('newt', content)
      } else if (chance >= 30) {
        dungeonMode('empty', content)
      } else if (chance >= 25) {
        dungeonMode('qkey', content)
      } else if (chance >= 15) {
        dungeonMode('byte', content)
      } else if (chance >= 0) {
        dungeonMode('mystery', content)
      }

    }

    return content;
}
