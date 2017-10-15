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
    var blade = '';
    if (condition === true) {
      blade += `[Area](${area} :: ${areaName} ::)\n`
      blade += `/* A Boss wants to Fight! ${boss} *\n`
      blade += `/* ${topleft}${horz2}${topright} *\n`
      return blade;
    } else {
      blade += `[Area](${area} :: ${areaName} ::)\n`
      blade += `# Discovered ${areaDungeon}\n`
      blade += `> ${topleft}${horz}${topright}\n`
      return blade;
    }
  }

module.exports = (message, boss, bossTiny, h, chance) => {
  var uid = message.author.id,
    isFighting = false;

    var mungedData = '';

    if (h.hlvl >= 1) {

      // bossmode
      ////////////////////
      if (chance >= 96) {
        mungedData += `${bossMode(true, boss, 1, 'Dark Chasm', 'a Dark Room')}`
        // formulas
        // boss health / accuracy,
        // player health
        var bossHP = Math.round(Math.random() * (7600 - 1500*h.hlvl) + 1500*h.hlvl),
          npcACC = Math.round(Math.random() * (65 - 33) + 33 + h.hlvl),
          baseHP = Math.round(Math.random() * (6500 - 5500) + 5500 + 1250 * h.hlvl);
          if (npcACC >= 95) var npcACC = 95
        fight(message, uid, boss, bossHP, h, baseHP, isFighting, npcACC)
      } else {
        mungedData += `${bossMode(false, boss, 1, 'Dark Forest', 'a Dark Room')}`
      }
      ////////////////////
      // Chance Core
      ////////////////////
      /*
      if (chance >= 96) {
        dungeonMode('fight')
      } else if (chance >= 85) {
        dungeonMode('stranger')
      } else if (chance >= 80) {
        dungeonMode('hdtk')
      } else if (chance >= 70) {
        dungeonMode('tk')
      } else if (chance >= 50) {
        dungeonMode('newt')
      } else if (chance >= 30) {
        dungeonMode('empty')
      } else if (chance >= 25) {
        dungeonMode('qkey')
      } else if (chance >= 15) {
        dungeonMode('byte')
      } else if (chance >= 0) {
        dungeonMode('mystery')
      }
      */

    }

    return mungedData;
}
