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
    } else {
      blade += `[Area](${area} :: ${areaName} ::)\n`
      blade += `# Discovered ${areaDungeon}\n`
      blade += `> ${topleft}${horz}${topright}\n`
    }
    return blade;
  }

  function tile(condition) {
    var adjustment = '';
    if (condition === true) {
      var xlen = 4,
        tileArray = [`${LIGHT}`, `${MED}`, `${DARK}`, ` `];
      for (i = 0, n = tileArray.length; i < xlen; i++) {
        adjustment += tileArray.charAt(Math.floor(Math.random() * n));
      }
    } else {
      adjustment += `LIGHT`
    }
    return adjustment;
  }

  function dungeonMode(ev, h, message, bossTiny) {
    var mapData = '';
    if (ev === 'fight') {
      mapData += `/* ${vert}${tile(true)}${vert} *`
      mapData += `/* ${vert}${tile(true)}${vert} *`
      mapData += `/* ${vert}${tile(true)}${vert} *`
    }
    return mapData;
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
      if (chance >= 96) {
        dungeonMode('fight', h, message, bossTiny)
      } else if (chance >= 85) {
        dungeonMode('stranger', h, message, bossTiny)
      } else if (chance >= 80) {
        dungeonMode('hdtk', h, message, bossTiny)
      } else if (chance >= 70) {
        dungeonMode('tk', h, message, bossTiny)
      } else if (chance >= 50) {
        dungeonMode('newt', h, message, bossTiny)
      } else if (chance >= 30) {
        dungeonMode('empty', h, message, bossTiny)
      } else if (chance >= 25) {
        dungeonMode('qkey', h, message, bossTiny)
      } else if (chance >= 15) {
        dungeonMode('byte', h, message, bossTiny)
      } else if (chance >= 0) {
        dungeonMode('mystery', h, message, bossTiny)
      }

    }

    return mungedData;
}
