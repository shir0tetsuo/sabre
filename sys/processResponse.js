////////////////////////////////////////////////////////////////////////////////
// Welcome to the mess.

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

////////////////////////////////////////////////////////////////////////////////
// Speech Database
////////////////////////////////////////////////////////////////////////////////
// floor 1 arrays for initializers
const parse_floor1_pronoun_1st_singular_subj = [
  'i ',
  'we '
]
const parse_floor1_pronoun_1st_singular_obj = [
  'me ',
  'us'
]
const parse_floor1_pronoun_plural_subj = [
  'you'
]
const parse_floor1_pronoun_3rd_singular_subj = [
  'he',
  'she',
  'it '
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
  '?'
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
  'ye '
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
  'consequen',
  'thus',
  'therefore',
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
  'at ',
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

function Rand(data) {
  // where data is the array
  return data[Math.floor(Math.random() * data.length)]
}

function Parse(database, content) {
  // where database is the array and case is the string
  if (database.some(word => content.includes(word))) {
    return true
  } else {
    return false
  }
}

// How to Compute
// PARSE: reactions, humor, relevance, intensity, compare/contrast, visual, narratives, examples, rhetoricals, curiosity
// COMPUTE: chronological, spatial, causal; logical reason, problem/solution, comparative, refutation
// floor 1 = subject matter
// Will determine general direction of response.
// floor 2 = subject awareness (and question answering array)
// floor 3 = content awareness
// floor X = special hangs

module.exports = function processResponse(client, message) {
  // make lowCase the primary content object
  let sabre = message.mentions.members.first()
  if (sabre.id !== client.user.id) return; // I may come to regret this.
  const lowCase = message.content.toLowerCase();
  const split = lowCase.split(/\<.+>/g);
  console.log(split)
  for (var i=lowCase.length-1; i>=0; i--) {
    if (lowCase[i] === sabre) {
      lowCase.splice(i, 1);
    }
  }
  console.log(lowCase)

  // console.log(`${Rand(test)}`)
  // if (Parse(test, lowCase) === true)
};
