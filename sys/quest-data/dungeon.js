const fight = require('./fight.js')
const Rand = require('./random.js')
const Transaction = require('./transaction.js')
const NPC = require('./NPCData.js')
const Reward = require('./reward.js')
const MAP = require('./set_map.json')
const PLY = require('./PlayerData.js')
const Portal = require('./portal.js')
////////////////////////////////////////////////////////////////////////////////
// Map all map data
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
  DARKPADDING = MAP.DARKPADDING,
  DARKTRIANGLE = MAP.DARKTRIANGLE,
  LEFTTRIANGLE = MAP.LEFTTRIANGLE,
  WHITELEFTTRIANGLE = MAP.WHITELEFTTRIANGLE,
  Radioactive = MAP.Radioactive,
  Snowman = MAP.Snowman,
  SunBehindCloud = MAP.SunBehindCloud,
  Rain = MAP.Rain,
  BlackSnowman = MAP.BlackSnowman,
  ThunderCloudRain = MAP.ThunderCloudRain,
  WhiteShield = MAP.WhiteShield,
  BlackShield = MAP.BlackShield,
  LIGHTTRIANGLE = MAP.LIGHTTRIANGLE,
  BLACKDIAMOND = MAP.BLACKDIAMOND,
  WHITEDIAMOND = MAP.WHITEDIAMOND;

////////////////////////////////////////////////////////////////////////////////
// Bossmode or Normal Initializer
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

////////////////////////////////////////////////////////////////////////////////
// Tile Randomness
  function tile(condition) {
    var adjustment = '';
    tileArray = [`${LIGHT}`, `${MED}`, `${DARK}`, ` `];
    if (condition === true) {
        for (var i=0, t=8; i<t; i++) {
            adjustment += `${Rand(tileArray)}`
        }
    } else {
      for (var i=0, t=1; i<t; i++) {
          adjustment += `${Rand(tileArray)}`
      }
    }
    return adjustment;
  }

////////////////////////////////////////////////////////////////////////////////
// Valid Actions

  function appendValid() {
    var validData = '';
    const validActions = PLY('NULL', 'validActions')
    const validActionRegex = PLY('NULL', 'validActionRegex')
    const validActionString = PLY('NULL', 'validActionString')
    validData += `* You are in danger!\n`
    validData += `< You have the following options.\n`
    validData += `${validActionString} >\n`
    return validData;
  }

////////////////////////////////////////////////////////////////////////////////
// Generate Dungeon

  function dungeonMode(ev, h, message, bossTiny) {
    var floorCalculation = (Math.random() * 5)
    var mapData = '';
    if (ev === 'fight' && floorCalculation >= 4) {
      mapData += `/* ${vert}${tile(true)}${tile(false)}${bossTiny}${tile(true)}${vert} *\n`
      mapData += `/* ${vert}${tile(true)}${tile(false)}${tile(false)}${tile(true)}${vert} *\n`
      mapData += `/* ${vert}${tile(true)}${player}${tile(false)}${tile(true)}${vert} *\n`
      mapData += `/* ${vert}${tile(true)}${tile(true)}${tile(false)}${tile(false)}${vert} * \n`
      mapData += `/* ${botleft}${horz2}${botright} *\n\n`
      mapData += `${appendValid()}`
    } else if (ev === 'fight' && floorCalculation >= 3) {
      mapData += `/* ${vert}${tile(true)}${player}${tile(true)}${vert} *\n`
      mapData += `/* ${botleft}${horz}${NPC('item1')}${tile(true)}${horz.substring(0, 2)}${vert} *\n`
      mapData += `/* ${vert}${tile(false)}${bossTiny}${tile(true)}${tile(true)}${tile(false)}${botright} *\n`
      mapData += `/* ${horz2}${tile(false)}${botright} *\n\n`
      mapData += `<${Reward(message, h)}>\n`
      mapData += `${appendValid()}`
    } else if (ev === 'fight' && floorCalculation >= 1) {
      mapData += `/* ${vert}${tile(true)}${player}${tile(false)}${vert} *\n`
      mapData += `/* ${vert}${tile(false)}${bossTiny}${tile(true)}${vert} *\n`
      mapData += `/* ${botleft}${horz2}${botright}* \n\n`
      mapData += `${appendValid()}`
    } else if (ev === 'fight' && floorCalculation >= 0) {
      mapData += `/* ${vert}${tile(true)}${tile(true)}${tile(false)} *\n`
      mapData += `/* ${botleft}${horz}${tile(false)}${horz.substring(0, 6)}${botright} *\n`
      mapData += `/* ${vert}${LIGHT}${MED}${DARK}${player}${bossTiny}${DARK}${MED}${LIGHT}${vert} *\n`
      mapData += `/* ${botleft}${horz2.substring(0, 8)}${botright} *\n\n`
      mapData += `${appendValid()}`
    }
    if (ev === 'stranger') {

      mapData += `> ${vert}${tile(true)}${tile(false)}${tile(false)}${vert}\n`
      mapData += `> ${vert}${NPC('common')}${tile(false)}${tile(true)}${vert}\n`
      mapData += `> ${vert}${MED}${MED}${player}${MED}${tile(true)}${vert}\n`
      mapData += `> ${vert}${MED}${tile(true)}${tile(false)}${vert}\n`
      mapData += `> ${vert}${DARK}${tile(true)}${tile(false)}${vert}\n`
      mapData += `> ${botleft}${horz}${botright}\n\n`
      mapData += `< You encounter ${NPC('common')}${PLY(message, 'vendMessageA')} \n`
      mapData += ` ${PLY(message, 'vendMessageB')} >\n`
    }
    if (ev === 'hdtk') {

      mapData += `> ${vert}${tile(true)}${tile(false)}${tile(true)}${vert}\n`
      mapData += `>  ${tile(true)}${tile(true)}\n`
      mapData += `* ${vert}${tile(false)}${NPC('item1')}${tile(true)}   ${vert}\n`
      mapData += `> ${vert}${LIGHT}${MED}${DARK}${MED}${player}${tile(true)}${vert}\n`
      mapData += `> ${botleft}${horz}${botright}\n\n`
      var CoT = Math.round(Math.random() * 3);
      mapData += `<Obtained ${CoT} Dark Tickets>\n`
      Transaction(message, 'dtk', CoT)
    }
    if (ev === 'tk') {
      mapData += `* ${vert}${tile(false)}${NPC('item1')}${tile(true)}${vert}\n`
      mapData += `> ${vert}${tile(false)}${tile(false)}${tile(true)}${vert}\n`
      mapData += `> ${vert}${tile(false)}${player}${tile(true)}${tile(false)}\n`
      mapData += `> ${botleft}${tile(true)}${tile(false)}${tile(false)}${botright}\n\n`
      mapData += `${PLY(message, 'genTickets', false, h)}\n`
    }
    if (ev === 'newt') {
      mapData += `[Area](NA :: Realm Lord ::)`
      mapData += `# \u2606 Discovered a Secret Area!`
      mapData += `*  \u2553\u2594\u2594\u2594\u2556\n`
      mapData += `* ${vert}${DARK}${DARK}${DARK}${DARK}${DARK}${vert}\n`
      mapData += `> ${vert}${MED}${MED}${tile(false)} ${LIGHT}${vert}\n`
      mapData += `> ${vert}${topleft}${horz.substring(0, 3)}${topright}${vert}\n`
      mapData += `* ${vert}${vert}${ThunderCloudRain} ${vert}${vert}\n`
      mapData += `* ${vert}${vert} ${NPC('item3')} ${vert}${vert}\n`
      mapData += `* ${vert}${botleft}${horz.substring(0, 3)}${botright}${vert}\n`
      mapData += `> ${vert}${tile(false)}${tile(false)}${tile(false)}${tile(false)}${tile(false)}${vert}\n`
      mapData += `> ${botleft}${player}${tile(false)}${tile(false)}${bossTiny}${botright}\n\n`
      mapData += `< You have encountered a portal! >\n`
      mapData += `* ${bossTiny}: "Do you wish to proceed?"\n`
    }
    if (ev === 'empty' && floorCalculation >= 2.5) {
      mapData += `> ${vert}${tile(true)}${tile(false)}${vert}\n`
      mapData += `> ${vert}${player}${tile(true)}${vert}\n`
      mapData += `> ${botleft}${horz}${botright}\n\n`
      mapData += `< The room was empty. >\n`
    } else if (ev === 'empty' && floorCalculation >= 0) {
      mapData += `> ${vert}${DARK}${DARK}${MED}${LIGHT}${MED}${DARK}${DARK}${DARK}${DARK}${DARK}${vert}\n`
      mapData += `> ${vert}${DARK}${player}${MED}${LIGHT}${LIGHT}${MED}${DARK}${MED}${LIGHT}${DARK}${vert}\n`
      mapData += `> ${vert}${tile(false)}${tile(true)}${tile(false)}${tile(false)}${tile(false)}\n`
      mapData += `> ${botleft}${horz}${botright}\n\n`
      mapData += `< The room was empty. >\n`
    }
    if (ev === 'qkey') {
      mapData += `> ${vert}${tile(true)}${tile(false)}${tile(true)}${vert}\n`
      mapData += `> ${vert}${tile(true)}${qkey}${tile(true)}${vert}\n`
      mapData += `> ${vert}${tile(true)} ${tile(true)}${vert}\n`
      mapData += `> ${vert}${tile(true)}${player}${tile(true)}${vert}\n\n`
      mapData += `<Obtained Quest Key>\n`
      Transaction(message, 'qkey', 1)
    }
    if (ev === 'byte') {
      mapData += `* ${vert}${BLACKDIAMOND} ${LIGHT}${MED}${DARK}${DARK}${vert}\n`
      mapData += `> ${vert} ${LIGHT}${MED}${player}${DARK}${DARK}${DARK}\n`
      mapData += `> ${vert}${LIGHT}${MED}${DARK}${DARK}${MED}${LIGHT}\n`
      mapData += `> ${botleft}${horz}${botright}\n\n`
      mapData += `${PLY(message, 'genBytes', false, h)}\n`
    }
    if (ev === 'mystery') {
      mapData += `> ${vert}${tile(true)}${tile(false)}${tile(false)}${tile(true)}${vert}\n`
      mapData += `> ${vert}${tile(true)}${player}${tile(false)}${tile(true)}${vert}\n`
      mapData += `* ${vert}${tile(true)}${tile(false)}${NPC('item1')}${tile(true)}${DARK}${MED}${LIGHT} \n`
      mapData += `> ${botleft}${horz}${botright}\n\n`
      mapData += `<${Reward(message, h)}>\n`
    }
    return mapData;
  }


function CalculateBaseHP(h) {
  let baseHP = Math.round(Math.random() * (6500 - 5500) + 5500 + 1250 * h.hlvl);
  return baseHP;
}
module.exports = (message, boss, bossTiny, h, chance) => {
  var uid = message.author.id,
    isFighting = false;

    var mungedData = '';

    if (h.hlvl >= 1) {
      ////////////////////
      // Chance Core
      ////////////////////
  // bossfight
      if (chance >= 96) {
        mungedData += `${bossMode(true, boss, 1, 'Dark Chasm', 'a Dark Room')}`
        var bossHP = Math.round(Math.random() * (7600 - 1500*h.hlvl) + 1500*h.hlvl),
          npcACC = Math.round(Math.random() * (65 - 33) + 33 + h.hlvl),
          baseHP = CalculateBaseHP(h);
        //  baseHP = Math.round(Math.random() * (6500 - 5500) + 5500 + 1250 * h.hlvl);
          if (npcACC >= 95) var npcACC = 95
        fight(message, uid, boss, bossHP, h, baseHP, isFighting, npcACC)
        mungedData += `${dungeonMode('fight', h, message, bossTiny)}`
  // stranger
      } else if (chance >= 85) {
        mungedData += `${bossMode(false, boss, 1, 'Dark Forest', 'a Dark Room')}`
        mungedData += `${dungeonMode('stranger', h, message, bossTiny)}`
  // dark tickets
      } else if (chance >= 80) {
        mungedData += `${bossMode(false, boss, 1, 'Dark Forest', 'a Dark Room')}`
        mungedData += `${dungeonMode('hdtk', h, message, bossTiny)}`
  // tickets
      } else if (chance >= 70) {
        mungedData += `${bossMode(false, boss, 1, 'Dark Forest', 'a Dark Room')}`
        mungedData += `${dungeonMode('tk', h, message, bossTiny)}`
  // portal
      } else if (chance >= 65) {
        var baseHP = CalculateBaseHP(h);
        //mungedData += `${bossMode(false, boss, 1, 'Dark Forest', 'a Dark Room')}`
        mungedData += `${dungeonMode('newt', h, message, bossTiny)}`
        Portal(message, h, baseHP, boss)
  // empty
      } else if (chance >= 50) {
        mungedData += `${bossMode(false, boss, 1, 'Dark Forest', 'Empty Room')}`
        mungedData += `${dungeonMode('empty', h, message, bossTiny)}`
  // questkey
      } else if (chance >= 25) {
        mungedData += `${bossMode(false, boss, 1, 'Dark Forest', 'a Dark Room')}`
        mungedData += `${dungeonMode('qkey', h, message, bossTiny)}`
  // bytes
      } else if (chance >= 15) {
        mungedData += `${bossMode(false, boss, 1, 'Dark Forest', 'a Dark Room')}`
        mungedData += `${dungeonMode('byte', h, message, bossTiny)}`
  // random item
      } else if (chance >= 0) {
        mungedData += `${bossMode(false, boss, 1, 'Dark Forest', 'a Dark Room')}`
        mungedData += `${dungeonMode('mystery', h, message, bossTiny)}`
      }

    }

    return mungedData;
}
