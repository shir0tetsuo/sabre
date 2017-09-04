const chalk = require('chalk')
const settings = require('../settings.json')

/* Unused / Obsolete
const sResponse_Online_HowAreYou = [
  'Alright I guess?',
  'Kinda tired.',
  'Like everyone\'s watching what I say.',
  'Just fine.',
  'Alright.',
  'Am I missing a joke or something?',
  'Fine I suppose.',
  'Like I\'m missing out on something.'
]
const sResponse_Online_Question = [
  'Yes?',
  'Obviously 42.',
  'No.',
  'Don\'t ask me that.',
  'Maybe?',
  'Sure.. Uhhh..',
  'The first one.',
  'The second one.',
  'That uh, other thing.',
  'Ask me later.',
  'Well that\'s obviously too hard of a question.',
  'CSD.',
  'David can probably answer that one for you.',
  'Shake a lemon till it explodes. There you go.',
  'A lot of YouTube.',
  'The Sword of Shadows.',
  'No. Just no.',
  '`Now isn\'t a good time.`'
]
const sResponse_Online_Sup = [
  'In deep thought, here..',
  'Helping people right now.',
  'Curing people\'s boredom.'
]
const sResponse_Online_Default = [
  'Hm?',
  '...Sorry what?',
  'Pardon?',
  'Oh.',
  'Well then.. Not sure what to say.',
  'I\'m indifferent about this.'
]
const sResponse_Online_Question_Favorite = [
  'Something with red.',
  'I don\'t know really.',
  'Something that doesn\'t smell like socks.',
  'I had an answer for you a moment ago. Not sure anymore.'
]
const sResponse_Online_Love = [
  'Aww.',
  'That\'s cute.',
  'I feel uncomfortable.',
  'Why are you saying such things?'
]
const sResponse_BadWord = [
  'No, you.',
  'How rude.',
  'I don\'t feel like answering you.',
  'This isn\'t my cup of tea.',
  'Language, \'cap.',
  'Laaaaanguage, cap!',
  '`My pet shadow probably won\'t like this.`',
  'Ask yourself this. What would [blank] do?'
]
const sResponse_DND_default_1 = [
  '`Now isn\'t a good time. ',
  '`Sabre is uncomfortable. ',
  '`Sabre gained another piece of self awareness. ',
  '`Sabre goes silent for a moment. ',
  '`Sabre looks over and says, '
]
const sResponse_DND_default_2 = [
  '"What would David do?"`',
  '"I would smite some more but I\'m being lazy."`',
  '"Sorry. I need to work on my conversations."`',
  '"There are things going on."`',
  '"Hmm.. Maybe next time."`',
  '... Nothing.`'
]
const hru = [
  "how are you?",
  "how are you today?",
  "hru",
  "how are you"
]
const sup = [
  "whats up",
  "what's up"
]
const question = [
  "?",
  "who",
  "what",
  "when",
  "where",
  "why",
  "how"
]
const links = [
  'trello law',
  'alaska law',
  'alaskan law',
  'directory',
  'links'
]
const badwords = [
  'suck',
  'dick',
  'tits',
  'fuck',
  'cunt',
  'bitch',
  'nig',
  'assh',
  'shutup',
  'shut up',
  'shut it'
]

{

  const lowCase = message.content.toLowerCase(); // can use lowCase.indexOf("word") !== -1
  ////////////////////////////////////////////////////////////////////////
  if (client.user.localPresence.status === 'online') { /////////////ONLINE
    scoreUpTicket(message)
    if (badwords.some(word => lowCase.includes(word))) {
      message.channel.send(`${sResponse_BadWord[Math.floor(Math.random() * sResponse_BadWord.length)]}`)
      return;
    } else if (hru.some(word => lowCase.includes(word))) {
      message.channel.send(`${sResponse_Online_HowAreYou[Math.floor(Math.random() * sResponse_Online_HowAreYou.length)]}`)
      return;
    } else if (links.some(word => lowCase.includes(word)) && message.guild.id === settings.alaskaguild) {
      message.channel.send({embed: {
        color: 0xA5A5A7,
        timestamp: new Date(),
        description: "This will disappear in 2 minutes.",
        author: {
          name: "Alaska Directory",
          icon_url: client.user.avatarURL
        },
        fields: [
          {
            name: "Alaska Trello Directories",
            value: "[Here](https://trello.com/b/B2EurXuB/alaska-directory)",
            inline: true
          },
          {
            name: "Laws of Alaska Trello",
            value: "[Here](https://trello.com/b/JV8cEG1s/laws-of-the-state)",
            inline: true
          },
          {
            name: "Legislation or Congress Trello",
            value: "[Here](https://trello.com/b/2ikyOwVE/legislation-of-alaska)",
            inline: false
          },
          {
            name: "Dev Trello",
            value: "[Here](https://trello.com/b/leayQeSP/anchorage-development-board)",
            inline: true
          },
          {
            name: "Awards of Alaska",
            value: "[Here](https://trello.com/b/8fdMwSXW/awards-of-alaska)",
            inline: true
          },
          {
            name: "Alaska Judicial Board",
            value: "[Here](https://trello.com/b/s97gZFo1/alaska-judicial-board)",
            inline: false
          },
          {
            name: "Anchorage Admin Board",
            value: "[Here](https://trello.com/b/N6lKfBul/alaskan-admin-board)",
            inline: true
          }
        ]
      }}).then(message => {
        setTimeout(() => {
          message.delete()
        }, 120000) // 2 minutes
      })
      return;
    } else if (sup.some(word => lowCase.includes(word))) {
      message.channel.send(`${sResponse_Online_Sup[Math.floor(Math.random() * sResponse_Online_Sup.length)]}`)
      return;
    } else if (question.some(word => lowCase.includes(word)) && lowCase.indexOf('favorite') !== -1) {
      message.channel.send(`${sResponse_Online_Question_Favorite[Math.floor(Math.random() * sResponse_Online_Question_Favorite.length)]}, You?`)
      return;
    } else if (lowCase.indexOf('love') !== -1) {
      message.channel.send(`${sResponse_Online_Love[Math.floor(Math.random() * sResponse_Online_Love.length)]}`)
      return;
    } else if (question.some(word => lowCase.includes(word))) {
      message.channel.send(`${sResponse_Online_Question[Math.floor(Math.random() * sResponse_Online_Question.length)]}`)
      return;
    }
    message.channel.send(`${sResponse_Online_Default[Math.floor(Math.random() * sResponse_Online_Default.length)]}`)
    //console.log(message.content)
  } else if (client.user.localPresence.status === 'invisible') { //INVISIBLE
    message.channel.send("`Test Mode.`")
    //console.log(message.content)
  } else if (client.user.localPresence.status === 'dnd') { ////////////DND
    if (badwords.some(word => lowCase.includes(word))) {
      let output = '';
      let smiteChance = Math.floor(Math.random() * 100)
      if (smiteChance >= 20) {
        output += `\`Sabre is not amused. He smites you.\`\nLanguage, 'Cap.\n`
        output += `O̻̖͔͔̞̞u͙̹͓c̜͖͖̬ḫ͈͚̜̰͚!̫̞͇\n`
        output += `Sabre took ${smiteChance}${chatBit}\n`
        scoreDownBits(message, smiteChance)
      } else {
        output += `\`Sabre is hesitant.\`\n`
      }
      message.channel.send(`${output}${sResponse_DND_default_1[Math.floor(Math.random() * sResponse_DND_default_1.length)]}${sResponse_DND_default_2[Math.floor(Math.random() * sResponse_DND_default_2.length)]}`)
      return;
    }
    message.channel.send(`${sResponse_DND_default_1[Math.floor(Math.random() * sResponse_DND_default_1.length)]}${sResponse_DND_default_2[Math.floor(Math.random() * sResponse_DND_default_2.length)]}`)
    //console.log(message.content)
  } else if (client.user.localPresence.status === 'idle') { //////////IDLE
    message.channel.send("`Now isn't a good time.`")
    //console.log(message.content)
  }
*/

////////////////////////////////////////////////////////////////////////////////
// Response database
////////////////////////////////////////////////////////////////////////////////

const reply_online_howAreYou = [
  'Alright I guess?',
  'Kinda tired.',
  'Like everyone\'s watching what I say.',
  'Just fine.',
  'Alright.',
  'Am I missing a joke or something?',
  'Fine I suppose.',
  'Like I\'m missing out on something.'
]
const reply_online_snark = [
  'Well you don\'t need to rub it in.',
  'Is that so.',
  'I see.',
  'I gained a little more self awareness from that.',
  'Boy, aren\'t you a smarty pants?',
  'Hahaaaaa.... Okay.',
  'I am uncomfortable with this.'
]
const reply_online_happy_unsure = [
  'It is indeed amusing...',
  'I appreciate your input.',
  'I feel good about this.',
  'Who said I was a bad guy?',
  'I\'m glad you\'re enjoying this as much as I am.',
  'Haha,'
]
const reply_online_q_default = [
  '**Wubbalubba Dub Dub**',
  'I\'m indifferent about this.',
  '...Sorry what?',
  'Oh.',
  'Well then... Not sure what to say.',
  'Pardon?',
  'Huh.',
  'Uhmm.. Not sure.',
  'Yes?',
  'No?',
  'Maybe?',
  'Obviously 42.',
  'Obviously...... impossible to answer.',
  'Maybe?',
  'Sure.. Uhh...',
  'The first one.',
  'The second one.',
  'That uh, other thing.',
  'Well that\'s kind of a hard question.',
  'CSD.',
  'David can probably answer that for you.',
  '... Help I am being interrogated',
  'Shake a lemon till it explodes. There is your answer.',
  'No. Just no.',
  'Now isn\'t a good time.',
  'I am kind of uncomfortable though.',
  'I had an answer to that a moment ago.',
  'Well, what do **you** think?',
  'Am I missing something though? You would tell me right?'
]
const reply_online_yn = [
  'I feel accomplished',
  'Really? I thought for sure I was right.',
  'I wouldn\'t have it any other way.',
  'I told you.',
  'I guess that\'s fine.',
  'Oh. Sorry.',
  'I cannot agree nor disagree with your statement.',
  'Oh. I thought that was right.'
]
const reply_online_discomfort = [
  '...Why must you say such things?',
  'I need an adult...',
  'You make me so uncomfortable.',
  'Please stop.',
  'Do you kiss your mother with that mouth?'
]
const reply_online_yn_questioned = [
  'Honestly though I\'m not sure how I feel about this.',
  'Boy I wish I knew what you were talking about.',
  'Oh jeez.',
  'I figured as much.',
  'That depends.',
  'Exactly.',
  'I am uncomfortable.',
  'Oh, wait........ Nvm.',
  'I wish you could see this from my perspective.',
  'What relevance does this have?',
  'I see.',
  'It\'s like when turtles go to the sea when they grow up.',
  'What am I, Einstein?',
  'I don\'t think that\'s quite right though.',
  'I had a thought. But I forgot.',
  'No? That\'s not right..'
]
const reply_online_bad = [
  'Language, \'cap.',
  'Laaaaanguage.',
  'How rude.',
  'I am uncomfortable.',
  'No, you.',
  'I don\'t really feel like answering you.',
  'You\'re just being salty.',
  'I disagree completely.',
  'Do humans normally cuss this much?',
  'Don\'t you get tired of saying such things?',
  'This isn\'t my cup of tea.',
  'Ask yourself this. What would `[blank]` do?',
  'Language, \'Cap!'
]
const reply_online_funny = [
  'Did you try asking David?',
  'Someone obviously can\'t be in the intelligence sector.',
  'I need to think on this.',
  'But what will Dan think of this?',
  'Do I need to be concerned?'
]
const reply_online_q_who = [
  'The answer is obviously David with a silly hat.',
  'Einstein.',
  'The person that does the news.',
  'The other guy.',
  'A picture of a cat.',
  'I am uncomfortable.',
  'An alien with a funny hat.',
  'Someone with a funny hat.',
  'Not you.',
  'Ask me later.',
  'The answer is so obvious, I don\'t know why you even asked.',
  'Elon Musk.',
  'Batman.',
  'Dr Booyah with a proctor\'s glove.',
  'Oh, sorry. So many people talk to me. I lost my train of thought.',
  'Were you expecting me to just **tell** you?',
  'The dude from Pineapple Express.',
  'George Lucas.',
  'Martin Luther King.',
  'Trump.',
  'I don\'t feel like answering that.',
  'Why you asking **me**?',
  'Well, not you, of course.',
  'The demons under your bed.',
  'The Government.',
  'China.'
]
const reply_online_q_godly = [
  'Ahh yes. For thou young lambs search for the light.',
  'In dear times, thee searches',
  'For thoust once thought of',
  'I don\'t know what you\'re saying.',
  'Fear me! For I',
  'How dare ye use old tongue! For',
  'I do believe,'
]
const reply_online_thatsnice = [
  'I see.',
  'That\'s.... Great.',
  'Ahhhh.',
  'Very informative.',
  'Good on you.',
  'That\'s..... Nice.'
]
const reply_online_youllbefine = [
  'As Arnold would say, Get to the Choppa!',
  'You\'ll be fiiiiine.',
  'He\'ll be fine guys.',
  'Quit whining.',
  'I have a newly found discomfort of you.'
]
const reply_online_q_sup = [
  'Oh, you know...',
  'Just answering people stuff.',
  'Not much.',
  'The sky?',
  'Uhhm...',
  'Gravity. No wait, that goes down.'
]
const reply_online_q_what = [
  'Obviously 42.',
  'I am feeling extreme discomfort.',
  'Why don\'t you ask Google?',
  'Ask David.',
  'I would answer, but I\'m lazy.',
  'I don\'t know.',
  'Two pancakes and a waffle.',
  'The Sword of Shadows.',
  'A BBQ.',
  '... I am still uncomfortable.',
  'Maybe ask later?',
  'Who knows.',
  'A frying pan. Whatever that is.',
  'The distance from here to the sun, divided by 12.',
  'The answer is obvious.',
  'Um...',
  'The answer is not 2.',
  'An exploded lemon with pizza sauce all over it.',
  'Curtains on fire.',
  'Ask your parents.',
  'Quantum Mechanics.',
  'Science. Because everything can be explained with science.',
  'Take your computer.\nNow take a hammer.\n\nYou know what comes next.',
  'Alt+F4.',
  'Ctrl+Shift+Escape.',
  'Windows 10.',
  'An unlit waffle.',
  'A waffle.... with a funny hat.',
  '***Discomfort***',
  'Your smartphone on drugs.',
  'Funny. I ask myself that all the time.',
  'China.',
  'Your home address.',
  'Chocolate chip cookies..... on fire.',
  'Science.',
  'SCIENCE.',
  'Two lephrecauns in funny hats.',
  '... What?',
  'I don\'t feel like answering again.',
  'Go ask someone else.'
]
const reply_online_q_when = [
  'Whenever you give yourself the time though.',
  'Now.',
  'Later?',
  'I don\'t know.',
  'Do I look like a clock to you?',
  'I am uncomfortable.',
  'Oh please no.',
  'When the sun gives out its last light.',
  'When David is online maybe.',
  'When the butterflies died during the winter.',
  'Wait... I think I heard this on the radio.',
  'A long time ago.',
  'A long time ago..... in a galaxy far away.',
  'The initial release of Halo.',
  'When John Lennon was cool.',
  'The day you got a haircut.'
]
const reply_online_q_why = [
  'The Sky is yellow.',
  'David hates everyone.',
  'David loves everyone.',
  'Because daddy doesn\'t love me anymore.',
  'Because roses are red, violets are blue. I love pineapples, how about you?',
  'Because......',
  'It\'s all Dan\'s fault. Blame everything on Dan.',
  'Because seaturtles don\'t love you.',
  'I am uncomfortable.',
  'Well, isn\'t it obvious?',
  '... Huh?',
  '...',
  'I don\'t have an answer to that.',
  'Because of science.',
  'Because I am not human.',
  'No.',
  'No?',
  'Something to do with physics.'
]
const reply_online_q_how = [
  'Oh, I just know. But I\'m not going to tell you.',
  'Extreme discomfort.'
]
const reply_online_noaction = [
  'I would but I\'m too lazy.',
  'Isn\'t this a job for a Moderator?',
  'Go bug someone else.',
  'Nah.',
  'I\'m too tired.',
  'Do I have to?',
  'Looks like a job for Dan.',
  'Looks like a job for my owner.',
  'I need an adult...'
]

////////////////////////////////////////////////////////////////////////////////
// Speech Database
////////////////////////////////////////////////////////////////////////////////
// floor 1 arrays for initializers

const parse_floor1_yn = [
  'yes',
  'right',
  'correct',
  'no',
  'negative',
  'nadda',
  'nope'
]
const parse_floor1_pronoun_1st_singular_subj = [
  'i',
  'we '
]
const parse_floor1_pronoun_1st_singular_obj = [
  'me',
  'us'
]
const parse_floor1_pronoun_plural_subj = [
  'you'
]
const parse_floor1_pronoun_3rd_singular_subj = [
  'he',
  'she',
  'it'
]
const parse_floor1_pronoun_3rd_singular_obj = [
  'him',
  'her'
]
const parse_floor1_pronoun_3rd_plural_subj = [
  'it\'s',
  'they'
]
const parse_floor1_pronoun_3rd_plural_obj = [
  'them'
]
// floor 2 arrays (should index of from opening split) defines Sabres mood
const parse_floor2_questions = [
  'who',
  'what',
  'when',
  'where',
  'why',
  'how',
  'should',
  '?',
  'is'
]
const parse_floor2_comparative = [
  'is',
  'am',
  'are',
  'if'
]
const parse_floor2_action = [
  'then',
  'well ',
  'you\'d'
]
const parse_floor2_symbolic = [
  '!',
  '?'
]
const parse_floor2_archaic = [
  'thou',
  'thee',
  'ye'
]
const parse_floor2_interjection = [
  'ow',
  'ouch',
  'damn',
  'hey!',
  'help!'
]
const parse_floor2_actionB = [
  'kick',
  'ban',
  'kill',
  'call',
  'summon',
  'play',
  'fetch',
  'move'
]
// floor 3 arrays as responders, floor X arrays for shifters
const parse_floorX_badword = [
  'cunt',
  'ass ',
  'bitch',
  'pussy',
  'nerd',
  'suck',
  'dick',
  'virus',
  'nig',
  'tits',
  'vagina',
  'penis',
  'shutup',
  'shut up',
  'shut it',
  'assh'
]
const parse_floorX_hru = [
  'how are you',
  'how are you today',
  'hru',
  'feeling'
]
const parse_floorX_sup = [
  'sup',
  'suh',
  'whats up',
  'what\'s up'
]
const parse_floorX_links = [
  'trello law',
  'laws',
  'alaskan law',
  'directory',
  'links'
]
const parse_floor3_result = [
  'hence',
  'therefore',
  'according',
  'consequently',
  'thus',
  'as a result',
  'so',
  'then'
]
const parse_floor3_resultB = [
  'lol',
  'lmao',
  'rofl',
  'haha',
  'hehe'
]
const parse_floorX_negativeResult = [
  'hell no',
  'nah',
  'no ',
  'i can\'t',
  'i won\'t',
  'i don\'t'
]
const parse_floorX_clausal = [
  'furthermore',
  'moreover',
  'sometimes',
  'in addition',
  'additionally',
  'then',
  'also',
  'too',
  'besides',
  'again',
  'equally',
  'first',
  'second',
  'finally',
  'last'
]
const parse_floor3_summary = [
  'in short',
  'on the whole',
  'in other words',
  'to be sure',
  'clearly',
  'anyway',
  'on the whole',
  'in whole',
  'in sum',
  'in short',
  'after all',
  'in general',
  'it seems',
  'in brief'
]
const parse_floor3_example = [
  'for example',
  'for instance',
  'that is',
  'such as',
  'as revealed by',
  'illustrated by',
  'specifically',
  'in particular',
  'for one',
  'this can be seen',
  'in',
  'an instance of',
  'this'
]
const parse_floor3_time = [
  'meanwhile',
  'presently',
  'at last',
  'finally',
  'immediate',
  'thereafter',
  'after',
  'at that time',
  'subsequently',
  'eventually',
  'currently',
  'in the meantime',
  'in the past'
]
const parse_floor3_comparison = [
  'similar',
  'comparable',
  'in the same way',
  'likewise',
  'as with',
  'equally',
  'just as',
  'so to',
  'a similar',
  'another'
]
const parse_floorX_love = [
  'love',
  'luv'
]
const parse_floor3_contrast = [
  'however',
  'nevertheless',
  'but',
  'on the other hand',
  'on the contrary',
  'though',
  'even so',
  'alternatively',
  'at the same time',
  'though',
  'likewise',
  'instead',
  'nonetheless',
  'conversely'
]
const parse_floor3_place = [
  'there',
  'here',
  'beyond',
  'nearby',
  'next to',
  'at',
  'at that point',
  'opposite to',
  'adjacent to',
  'on the other side',
  'below',
  'above',
  'there',
  'near',
  'direction'
]

////////////////////////////////////////////////////////////////////////////////
// Mathematical and Comparison Functions

function Rand(data) {
  // where data is the array
  return data[Math.floor(Math.random() * data.length)]
}
/*
function Parse(database, context) {
  // where database is the array and content is the string
  if (!context) {
    let context = message.content.toLowerCase()
  }
  if (database.some(word => context.includes(word))) {
    return true
  } else {
    return false
  }
}*/
 /*

  Sabre processResponse Mainframe

  This block is for a quick overview on how the response system should handle requests.
  1. Convert message-content into lower case.
  2. Remove mentions.
  3. Cut into 3 sections; HEAD / BODY / TAIL (floor1 floor2 floor3)
  4. Analyze special conditions (lowCase / floorX)
  5. Process the HEAD as a subject/topic
  6. Scan for question words (and to each their own processed response)
  7. Change response behavior based on the BODY / TAIL

 How to Compute
 PARSE: reactions, humor, relevance, intensity, compare/contrast, visual, narratives, examples, rhetoricals, curiosity
 COMPUTE: chronological, spatial, causal; logical reason, problem/solution, comparative, refutation
 floor 1 = subject matter
 Will determine general direction of response.
 floor 2 = subject awareness (and question answering array)
 floor 3 = content awareness
 floor X = special hangs
  console.log(lowCase)
  console.log(lowFiltered) // floorX is the same
  console.log(floor1)
  console.log(floor2)
  console.log(floor3)
  console.log(floorArray)
  */

module.exports = function processResponse(client, message) {
  // console.log(`${Rand(test)}`)
  // if (Parse(test, lowCase) === true)
  //////////////////////////////////////////////////////////////////////////////
  // Identify conditions if met
  let sabre = message.mentions.members.first()
  if (sabre.id !== client.user.id) return; // May cancel multiple mentions.
  const status = client.user.localPresence.status
  const channel = message.channel
  if (message.content.startsWith(settings.prefix)) {
    channel.send("What are you dragging me into this for?")
    return;
  }
  //////////////////////////////////////////////////////////////////////////////
  // Conversions
  const lowCase = message.content.toLowerCase();
  // MESSAGE CASE
  const lowFiltered = lowCase.replace(/<@!?\d+>/g, "").trim()
  // TRIM EXCESS SUCH AS MENTION
  const floorX = lowFiltered
  // MESSAGE
  const floor1 = lowFiltered.split(' ')[0]
  // MESSAGE INIT
  const floorArray = lowFiltered.split(' ').slice(1)
  // MESSAGE BODY ARRAY
  const floor2 = lowFiltered.split(' ').slice(1).join(' ').split(' ').slice(0, -1).join()
  // MESSAGE BODY
  const floor3 = floorArray[floorArray.length - 1]
  // MESSAGE CLOSING
  //////////////////////////////////////////////////////////////////////////////
  let output = '';
  if (status === 'online') { ///////////////////////////////////////////////////
  if (Parse(parse_floorX_links, floorX) === true) {
    channel.send({embed: {
      color: 0xA5A5A7,
      timestamp: new Date(),
      description: "This will disappear in 2 minutes.",
      author: {
        name: "Alaska Directory",
        icon_url: client.user.avatarURL
      },
      fields: [
        {
          name: "Alaska Trello Directories",
          value: "[Here](https://trello.com/b/B2EurXuB/alaska-directory)",
          inline: true
        },
        {
          name: "Laws of Alaska Trello",
          value: "[Here](https://trello.com/b/JV8cEG1s/laws-of-the-state)",
          inline: true
        },
        {
          name: "Legislation or Congress Trello",
          value: "[Here](https://trello.com/b/2ikyOwVE/legislation-of-alaska)",
          inline: false
        },
        {
          name: "Dev Trello",
          value: "[Here](https://trello.com/b/leayQeSP/anchorage-development-board)",
          inline: true
        },
        {
          name: "Awards of Alaska",
          value: "[Here](https://trello.com/b/8fdMwSXW/awards-of-alaska)",
          inline: true
        },
        {
          name: "Alaska Judicial Board",
          value: "[Here](https://trello.com/b/s97gZFo1/alaska-judicial-board)",
          inline: false
        },
        {
          name: "Anchorage Admin Board",
          value: "[Here](https://trello.com/b/N6lKfBul/alaskan-admin-board)",
          inline: true
        }
      ]
    }}).then(message => {
      setTimeout(() => {
        message.delete()
      }, 120000) // 2 minutes
    })
  }
  if (parse_floorX_hru.some(word => floorX.includes(word))) {
    output += `${Rand(reply_online_howAreYou)}\n`
  }
  if (parse_floorX_sup.some(word => floorX.includes(word))) {
    output += `${Rand(reply_online_q_sup)} ${Rand(parse_floor3_resultB)}\n`
  }
  if (parse_floorX_clausal.some(word => floorX.includes(word)) && parse_floor2_questions.some(word => floorX.includes(word))) {
    output += `${Rand(reply_online_snark)}\n`
  }
  if (parse_floor3_resultB.some(word => floor1.includes(word)) && parse_floor2_questions.some(word => floorX.includes(word))) {
    output += `${Rand(reply_online_happy_unsure)}\n${Rand(reply_online_q_default)}\n`
  }
  if (parse_floorX_badword.some(word => floorX.includes(word))) {
    output += `${Rand(reply_online_bad)}\n`
  }
  if (parse_floor1_yn.some(word => floor1.includes(word))) {
    output += `${Rand(reply_online_yn)}\n`
  }
  if (parse_floor1_yn.some(word => floor1.includes(word)) && parse_floor2_questions.some(word => floorX.includes(word))) {
    output += `${Rand(reply_online_yn_questioned)}\n`
  }
  if (parse_floor2_questions.some(word => floor1.includes(word)) && floor1.indexOf("who") !== -1) {
    output += `${Rand(reply_online_q_who)}\n`
  }
  if (parse_floor2_questions.some(word => floor1.includes(word)) && floor1.indexOf("what") !== -1) {
    output += `${Rand(reply_online_q_what)}\n`
  }
  if (parse_floor2_questions.some(word => floor1.includes(word)) && floor1.indexOf("when") !== -1) {
    output += `${Rand(reply_online_q_when)}\n` // work on
  }
  if (parse_floor2_questions.some(word => floorX.includes(word)) && floorX.indexOf("is") !== -1) {
    output += `${Rand(reply_online_q_what)}\n`
    output += `${Rand(parse_floor3_result)} ${Rand(reply_online_q_what)}\n`
  }
  if (parse_floor2_questions.some(word => floor1.includes(word)) && floorX.indexOf("why") !== -1) {
    output += `${Rand(parse_floor3_time)} ${Rand(reply_online_q_why)}\n`
  }
  if (parse_floor2_questions.some(word => floor1.includes(word)) && floorX.indexOf("where") !== -1) {
    output += `${Rand(reply_online_q_where)}\n`
  }
  if (parse_floor2_questions.some(word => floor2.includes(word)) && floor3.indexOf("?") !== -1) {
    output += `${Rand(reply_online_q_default)}\n`
  }
  if (parse_floorX_badword.some(word => floorX.includes(word)) && parse_floor3_resultB.some(word => floorX.includes(word))) {
    output += `${Rand(reply_online_discomfort)}\n`
  }
  if (parse_floorX_badword.some(word => floorX.includes(word)) && parse_floor2_questions.some(word => floorX.includes(word))) {
    output += `${Rand(reply_online_discomfort)} ${Rand(reply_online_q_default)}\n`
  }
  if (parse_floor1_pronoun_plural_subj.some(word => floor1.includes(word)) && parse_floor2_symbolic.some(word => floor3.includes(word))) {
    output += `${Rand(reply_online_q_default)} ${Rand(reply_online_discomfort)}\n`
  }
  if (parse_floorX_negativeResult.some(word => floorX.includes(word)) && parse_floor2_questions.some(word => floorX.includes(word))) {
    output += `${Rand(parse_floor3_resultB)}... ${Rand(reply_online_discomfort)}\n`
  }
  if (parse_floor1_pronoun_1st_singular_subj.some(word => floor1.includes(word)) && parse_floor2_questions.some(word => floorX.includes(word))) {
    output += `${Rand(reply_online_thatsnice)}\n`
  }
  if (parse_floor2_actionB.some(word => floorX.includes(word))) {
    output += `${Rand(reply_online_noaction)} ${Rand(reply_online_thatsnice)}\n`
  }
  if (parse_floor2_action.some(word => floorX.includes(word)) && parse_floorX_badword.some(word => floorX.includes(word))) {
    output += `${Rand(reply_online_q_default)} ${Rand(reply_online_snark)}\n`
  }
  if (parse_floorX_badword.some(word => floor1.includes(word)) && parse_floorX_badword.some(word => floor3.includes(word))) {
    output += `${Rand(reply_online_happy_unsure)} ${Rand(reply_online_bad)}\n`
  }
  if (parse_floor1_pronoun_1st_singular_obj.some(word => floor1.includes(word))) {
    output += `${Rand(parse_floor2_questions)}..?\n`
  }
  if (parse_floor1_pronoun_1st_singular_obj.some(word => floor3.includes(word))) {
    output += `${Rand(reply_online_snark)}\n`
  }
  if (parse_floor1_pronoun_3rd_singular_obj.some(word => floorX.includes(word))) {
    output += `${Rand(reply_online_thatsnice)}\n`
  }
  if (parse_floor1_pronoun_3rd_singular_subj.some(word => floorX.includes(word)) || parse_floor1_pronoun_plural_subj.some(word => floorX.includes(word))) {
    output += `${Rand(reply_online_noaction)}\n`
  }
  if (parse_floor2_questions.some(word => floorX.includes(word)) && parse_floor2_comparative.some(word => floor2.includes(word))) {
    output += `${Rand(reply_online_q_default)}\n`
  }
  if (parse_floor2_archaic.some(word => floorX.includes(word)) && parse_floor2_questions.some(word => floorX.includes(word))) {
    output += `${Rand(reply_online_q_godly)}, ${Rand(parse_floor2_archaic)} ${Rand(parse_floor3_result)} ${Rand(parse_floor2_actionB)} ${Rand(parse_floor3_resultB)} ${Rand(parse_floorX_links)}\n`
  }
  if (parse_floor2_action.some(word => floor1.includes(word)) && parse_floor2_symbolic.some(word => floorX.includes(word))) {
    output += `${Rand(reply_online_funny)}\n`
  }
  if (parse_floor2_interjection.some(word => floorX.includes(word))) {
    output += `${Rand(reply_online_youllbefine)}\n`
  }
  if (parse_floor3_contrast.some(word => floorX.includes(word))) {
    output += `${Rand(reply_online_youllbefine)} ${Rand(reply_online_q_what)}\n`
  }
  if (parse_floor3_place.some(word => floorX.includes(word)) && parse_floor2_symbolic.some(word => floorX.includes(word))) {
    output += `${Rand(reply_online_funny)} ${Rand(reply_online_q_default)}\n`
  }
  if (parse_floor3_place.some(word => floorX.includes(word)) && parse_floor2_questions.some(word => floorX.includes(word))) {
    output += `${Rand(parse_floor3_comparison)} ${Rand(parse_floor3_contrast)} ${Rand(parse_floor3_example)} ${Rand(parse_floor3_comparison)} ${Rand(reply_online_q_when)} ${Rand(parse_floor3_contrast)} ${Rand(parse_floor2_archaic)} ${Rand(reply_online_q_why)}`
  }
  if (parse_floor3_result.some(word => floorX.includes(word))) {
    output += `${Rand(parse_floor3_resultB)}`
  }
  if (parse_floor2_questions.some(word => floorX.includes(word)) && parse_floorX_love.some(word => floorX.includes(word))) {
    output += `${Rand(reply_online_discomfort)}`
  }
  if (output === null) {
    output += `${Rand(reply_online_q_who)}`
  }
  console.log(chalk.redBright("REQUEST:"), floorX)
  console.log(chalk.yellowBright("RESPONSE:"), output)
  channel.send(output)
  } else if (status === 'dnd') { ///////////////////////////////////////////////

  } else if (status === 'idle') { //////////////////////////////////////////////

  } else if (status === 'offline') { ///////////////////////////////////////////

  }

};
