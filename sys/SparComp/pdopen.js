const sql = require("sqlite");
sql.open("/root/NC/utils/NorthStar/pockets.sqlite");

function RequestObject(message) {
  const uid = message.author.id;
  sql.get(`SELECT * FROM Dimension WHERE userId = "${uid}"`).then(pBlock => {
    if (!pBlock) {
      console.log(`!pBlock`)
      return "NoData"
    } else {
      console.log(pBlock)
      return pBlock
    }
  })
  .catch(() => {
    console.log(`catch`)
    return "NoData"
  })
}

function PostObject(message, pObj) {
  message.reply(`\`Debugging: Load Success\``)
}

module.exports = (message) => {
  const pObj = RequestObject(message)
  .then(pObj => {
    if (pObj === undefined || pObj === null || pObj === "NoData") {
      return message.reply(`\`There is no Pocket Dimension recorded under your file.\``)
    } else {
      PostObject(message, pObj)
    }
  })

}
