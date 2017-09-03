module.exports = function processResponse(client, message) {
  console.log(client.user.username, message.content)
};
