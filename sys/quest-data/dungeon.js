const fight = require('./fight.js')
const Rand = require('./random.js')
const Transaction = require('./transaction.js')
const NPC = require('./NPCData.js')
const Reward = require('./reward.js')
const MAP = require('./set_map.json')
const PLY = require('./PlayerData.js')
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
        tileArray = [`${LIGHT}`, `${MED}`, `${DARK}`, ` `];
        for (var i=0, t=8; i<t; i++) {
            adjustment += `${Rand(tileArray)}`
        }
    } else {
      adjustment += `${LIGHT}`
    }
    return adjustment;
  }

  function dungeonMode(ev, h, message, bossTiny) {
    const validActions = PLY('NULL', 'validActions')
    const validActionRegex = PLY('NULL', 'validActionRegex')
    const validActionString = PLY('NULL', 'validActionString')
    var mapData = '';
    if (ev === 'fight') {
      mapData += `/* ${vert}${tile(true)}${tile(false)}${bossTiny}${tile(true)}${vert} *\n`
      mapData += `/* ${vert}${tile(true)}${tile(false)}${tile(false)}${tile(true)}${vert} *\n`
      mapData += `/* ${vert}${tile(true)}${player}${tile(false)}${tile(true)}${vert} *\n`
      mapData += `/* ${vert}${tile(true)}${tile(true)}${tile(false)}${tile(false)}${vert} * \n`
      mapData += `/* ${botleft}${horz2}${botright} *\n\n`
      mapData += `* You are in danger!\n`
      mapData += `< You have the following options.\n`
      mapData += `${validActionString} >\n`
    }
    if (ev === 'stranger') {

      mapData += `> ${vert}${tile(true)}${tile(false)}${tile(false)}${vert}\n`
      mapData += `> ${vert}${NPC('common')}${tile(false)}${tile(true)}${vert}\n`
      mapData += `> ${vert}${MED}${MED}${player}${MED}${tile(true)}${vert}\n`
      mapData += `> ${vert}${MED}${tile(true)}${tile(false)}${vert}\n`
      mapData += `> ${vert}${DARK}${tile(true)}${tile(false)}${vert}\n`
      mapData += `> ${botleft}${horz}${botright}\n`
      mapData += `< You encounter ${PLY(message, 'vendMessageA')} \n`
      mapData += ` ${PLY(message, 'vendMessageB')} >`
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
        mungedData += `${dungeonMode('fight', h, message, bossTiny)}`
      } else if (chance >= 85) {
        mungedData += `${dungeonMode('stranger', h, message, bossTiny)}`
      } else if (chance >= 80) {
        mungedData += `${dungeonMode('hdtk', h, message, bossTiny)}`
      } else if (chance >= 70) {
        mungedData += `${dungeonMode('tk', h, message, bossTiny)}`
      } else if (chance >= 50) {
        mungedData += `${dungeonMode('newt', h, message, bossTiny)}`
      } else if (chance >= 30) {
        mungedData += `${dungeonMode('empty', h, message, bossTiny)}`
      } else if (chance >= 25) {
        mungedData += `${dungeonMode('qkey', h, message, bossTiny)}`
      } else if (chance >= 15) {
        mungedData += `${dungeonMode('byte', h, message, bossTiny)}`
      } else if (chance >= 0) {
        mungedData += `${dungeonMode('mystery', h, message, bossTiny)}`
      }

    }

    return mungedData;
}
