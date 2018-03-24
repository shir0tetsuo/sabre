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
  }
  if (mdata.startsWith(`${prefix} new`)) {
    PDNewPage(message);
    return;
  }
  if (mdata.startsWith(`${prefix} open`)) {
    PDOpenPage(message);
    return;
  }
  if (mdata.startsWith(`${prefix} rm`)) {
    PDRemPage(message);
    return;
  }
  if (mdata.startsWith(`${prefix} mod`)) {
    PDModPage(message);
    return;
  }
}
