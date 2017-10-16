module.exports = (type, message, h, baseHP, boss, state) => {
  // Experimental
  // This program appends more available commands when available
  var stateA = (['select', 'new'])
  var stateB = ['exit']
  const AvailableCommands = stateA.concat(stateB)
  const AvailableCommandsRegex = new RegExp(AvailableCommands.join('|'), 'i');
  const AvailableCommandsString = AvailableCommands.map(action => `${action}`).join(' || ')

  if (type === "ProcedureCall") {
      return AvailableCommands
  }
  if (type === "Regex") {
      return AvailableCommandsRegex
  }
  if (type === "String") {
      return AvailableCommandsString
  }
}
