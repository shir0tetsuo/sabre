const PDHelpPage = require('./pdhelp.js')
const PDNewPage = require('./pdnew.js')
const PDOpenPage = require('./pdopen.js')
const PDRemPage = require('./pdrem.js')
const PDModPage = require('./pdmod.js')

module.exports = (message) => {
  var prefix = "?spar pdt"
  const mdata = message.content.toLowerCase();
  if (mdata === `${prefix}`) {
    PDHelpPage(message);
    return;
  } else if (mdata.startsWith(`${prefix} new`)) {
    console.log(`SparCompanion pdt new (level 1) success`)
    PDNewPage(message);
    return;
  } else if (mdata.startsWith(`${prefix} open`)) {
    PDOpenPage(message);
    return;
  } else if (mdata.startsWith(`${prefix} rm`)) {
    PDRemPage(message);
    return;
  } else if (mdata.startsWith(`${prefix} mod`)) {
    PDModPage(message);
    return;
  }
}
