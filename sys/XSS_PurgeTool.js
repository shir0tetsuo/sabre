var authToken = ''
var limit = 75;
// max 100

if (typeof(blockedAuthors) === 'undefined') {
    var blockedAuthors = []
}

clearMessages = function() {
    const channel = window.location.href.split('/').pop()
    const baseURL = `https://discordapp.com/api/channels/${channel}/messages`
    const headers = { Authorization: authToken }

    let clock = 0
    // default interval 500
    let interval = 300
    let beforeId = null
    let messagesStore = []

    function delay(duration) {
        return new Promise((resolve, reject) => {
            setTimeout(resolve, duration)
        })
    }

    function loadMessages() {

        let url = `${baseURL}?limit=${limit}`

        if (beforeId) {
            url += `&before=${beforeId}`
        }

        return fetch(url, { headers })
    }

    function tryDeleteMessage(message) {
        if (blockedAuthors.indexOf(message.author.id) === -1) {
          /*

        IGNORE Messages that DO NOT CONTAIN this username
          if (message.author.username !== "shadowsword") return;

        IGNORE Messages that CONTAIN this username
          if (message.author.username === "shadowsword") return;

          */

        //  if (message.author.username !== "mimystar") return;

            console.log(`DELETING message from ${message.author.username}#${message.author.discriminator} (${message.content.substring(0, 30)}...)`)

            return fetch(`${baseURL}/${message.id}`, { headers, method: 'DELETE' })
        }
    }

    function filterMessages(message) {
        return blockedAuthors.indexOf(message.author.id) === -1
    }

    function onlyNotDeleted(message) {
        return message.deleted === false
    }

    loadMessages()
        .then(resp => resp.json())
        .then(messages => {
            if (messages === null || messages.length === 0) {
                console.log(`We loaded all messages in this chat`)

                return
            }

            beforeId = messages[messages.length-1].id

            messages.forEach(message => { message.deleted = false })

            messagesStore = messagesStore.concat(messages.filter(filterMessages))

            return Promise.all(messagesStore.filter(onlyNotDeleted).map(message => {
                return delay(clock += interval)
                    .then(() => tryDeleteMessage(message))
                    .then(resp => {
                        if (resp && resp.status === 204) {
                            message.deleted = true
                            return resp.text()
                        } else if (resp && resp.status === 403) {
                        // unfortunately the "call" DM is irremovable
                          console.log(`403, ${message.author.username}`)

                        //  blockedAuthors.push(message.author.id)

                        //  messagesStore = messagesStore.filter(filterMessages)

                      } else if (resp && resp.status === 429) {
                          console.log(`429, Looks like it's going too fast`)
                        }
                    })
                    .then(result => {
                        if (result) {
                            result = JSON.parse(result)

                            if (result.code === 50003) {

                                console.log(`50003, ${message.author.username} has been blacklisted`)

                                blockedAuthors.push(message.author.id)

                                messagesStore = messagesStore.filter(filterMessages)
                            }
                        }
                    })
            }))
        })
        .then(function() {
            if (messagesStore.length !== 0 && messagesStore.length < 100) {
                clearMessages()
            } else {
                console.log(`/////////////// Cycle of ${limit} Complete /////////////////`)
				neverEndingStory();
            }
        })
}

function neverEndingStory(){
clearMessages()
}

neverEndingStory()
