const Rand = require('./random.js')
const Transaction = require('./transaction.js')
const sql = require("sqlite");
sql.open("../../score.sqlite");

const attackMessage = [
  'attempted to punch it in the face.',
  'attempted to kick it in the face.',
  'attempted to slam the entity.',
  'attempted to elbow in the face.'
]
const specialMessage = [
  // fire
  'casted a fireball.',
  'summoned a heatwave.',
  'invoked magma.',
  // spirit
  'summoned a familiar.',
  'used the power of Death.',
  'casted NightBall.',
  'resurrected the Dead.',
  // wind
  'invoked the power of Wind.',
  'used Shatter Wave.',
  'used Telekinesis.',
  // earth
  'used Earthquake.',
  'summoned Leaf of Time.',
  'used Foresight Destruction.',
  // water
  'summoned Ice Blade.',
  'casted Megafreeze.',
  'invoked a Tsunami.',
  // other
  'used Shadow Sword.',
  'used Death Scythe.',
  'used Deadly Nightshade.',
  'used Epic Pistol.',
  'used Samurai Sword.',
  'used Alien Gun.'
]

const vendors = [
  'Jerry',
  'Ian',
  'Kevin',
  'Morpheus',
  'Anthony'
]
const vendorsResponse = [
  '"Keep your head up high. You won\'t find hope lying on the ground."',
  '"I\'m addicted to Sabre help!"',
  '"...oh, Hello."',
  '"Pardon me."',
  '"Read ALL The Words!"',
  '"I lost a Dark Ticket somewhere."'
]
module.exports = (message, mode, isFighting, h) =>  {
// this data must run first and doesn't touch message
  const validActions = (['atk', 'guard', 'special', 'run'])
  const validActionRegex = new RegExp(validActions.join('|'), 'i');
  const validActionString = validActions.map(action => `${action}`).join(' || ');
  if (mode === 'validActions') { // atk, guard, special, run
    // NOTE: More experience = better commands?
    return validActions;
  }
  if (mode === 'validActionRegex') { // regular expression for grabbing this data
    return validActionRegex;
  }
  if (mode === 'validActionString') { // the printed result
    return validActionString;
  }
  if (mode === 'reset') { // Close Session
    //return isFighting; // may be buggy
  }
  if (mode === 'attackMessage') { // special
    return Rand(attackMessage);
  }
  if (mode === 'specialMessage') { // atk
    return Rand(specialMessage);
  }
  if (mode === 'vendMessageA') { // response = vendorname
    // NOTE: Do more with this
    return Rand(vendors);
  }
  if (mode === 'vendMessageB') {
    return Rand(vendorsResponse);
  }
  if (mode === 'getColor') {
    ///
    if (h.hlvl >= 5) {
      return 0x5FEFBF;
    } else if (h.hlvl >= 1) {
      return 0x34d1a2;
    }
    ///
  }
  if (mode === 'genTickets') {
    if (h.hlvl >= 5) {
      var amt = Math.round(Math.random() * (100000 - 1000) + 1000)
    } else if (h.hlvl >= 0) {
      var amt = Math.round(Math.random() * (6000 - 500) + 500)
    }
    Transaction(message, 'tk', amt)
    return `<Found ${amt} tickets.>\n`
  }
  if (mode === 'genBytes') {
    if (h.hlvl >= 5) {
      var amt = Math.round(Math.random() * (200000 - 1000) + 1000)
    } else if (h.hlvl >= 0) {
      var amt = Math.round(Math.random() * (12000 - 500) + 500)
    }
    Transaction(message, 'b', amt)
    return `<Found ${amt} bytes.>\n`
  }
}
