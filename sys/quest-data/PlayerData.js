const Rand = require('./random.js')

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

module.exports = (message, mode, isFighting) =>  {
  const validActions = (['atk', 'guard', 'special', 'run'])
  const validActionRegex = new RegExp(validActions.join('|'), 'i');
  const validActionString = validActions.map(action => `${action}`).join(' || ');
  if (mode === 'validActions') {
    return validActions;
  }
  if (mode === 'validActionRegex') {
    return validActionRegex;
  }
  if (mode === 'validActionString') {
    return validActionString;
  }
  if (mode === 'reset') {
    isFighting.delete(message.author.id);
  }
  if (mode === 'attackMessage') {
    return Rand(attackMessage);
  }
  if (mode === 'specialMessage') {
    return Rand(specialMessage);
  }
}
