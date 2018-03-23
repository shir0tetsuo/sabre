const PDHelpPage = require('./pdhelp.js')

module.exports = (message) => {
  const prefix = "?spar pdt"
  const mdata = message.content.toLowerCase();
  if (mdata === `${prefix}`) {
    PDHelpPage(message);
    return;
  }
}
