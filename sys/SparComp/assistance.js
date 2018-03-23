module.exports = (message) =>  {
  const prefix = "?spar"
  var warn = "This does not work while a match is in progress."
  const mdata = message.content.toLowerCase();
  if (mdata.startsWith(`${prefix} barrier`)) {
    message.reply(`**A Class III Barrier surrounds you.** ${warn}`)
    return;
  }
  if (mdata.startsWith(`${prefix} heal`)) {
    message.reply(`**Four Ki-balls have been dispatched to assist you.** ${warn}`)
    return;
  }
  return;
}
