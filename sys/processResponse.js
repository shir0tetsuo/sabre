////////////////////////////////////////////////////////////////////////////////
// Welcome to the mess.

const test = [
  'One',
  'Two'
]

function Rand(data) {
  // where data is the array
  return data[Math.floor(Math.random() * data.length)]
}

function Parse(database, case) {
  // where database is the array and case is the string
  if (database.some(word => case.includes(word))) {
    return true
  } else {
    return false
  }
}

module.exports = function processResponse(client, message) {
  // make lowCase the primary content object
  const lowCase = message.content.toLowerCase();
  // console.log(`${Rand(test)}`)
  // if (Parse(test, lowCase) === true)
};
