////////////////////////////////////////////////////////////////////////////////
// Welcome to the mess.

const test [
  'One',
  'Two'
]

function random(data) {
  return data[Math.floor(Math.random() * data.length)]
}

module.exports = function processResponse(client, message) {
  console.log(`${random(test)}`)
};
