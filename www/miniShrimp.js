function Rand(data) {
  return data[Math.floor(Math.random() * data.length)]
}

function Respond(int) {
  if (!int) var int = 1
  if (int == 1) return "This judge is not amused. They can't finish their meal."
  if (int == 2) return "This judge finds that there is something fairly lacking with this shrimp."
  if (int == 3) return "This judge likes the preparation, but still finds it sub-par."
  if (int == 4) return "This judge doesn't find it the worst, but can do better."
  if (int == 5) return "This judge finds it within acceptable parameters."
  if (int == 6) return "This judge somewhat likes it, but is not the best they've had."
  if (int == 7) return "This judge rather enjoyed the meal."
  if (int == 8) return "This judge **really** enjoyed it!"
  if (int == 9) return "A tear was brought to their eyes before saying **'This is a meal from Heaven!'**"
  if (int == 10) return "The meal was **so good**, they had a heart attack and was rushed to the hospital!"
}

const cooktype = [
  'barbecue\'d',
  'boiled',
  'broiled',
  'baked',
  'sautee\'d',
  'toasted',
  'roasted',
  'chopped up',
  'sashimi\'d'
]
const returned = [
  'Shrimp-Kabobs!',
  'Shrimp Creole!',
  'Shrimp Gumbo!',
  'Pan Fried Shrimp!',
  'Deep Fried Shrimp!',
  'Stir-Fried Shrimp!',
  'Pineapple Shrimp!',
  'Lemon Shrimp!',
  'Coconut Shrimp!',
  'Pepper Shrimp!',
  'Shrimp Soup!',
  'Shrimp Stew!',
  'Shrimp in Potatoes!',
  'Shrimp Burger!',
  'Shrimp Sandwich!',
  'Shrimp Cocktail!',
  'Shrimp Salad!',
  'Shrimp Teriyaki!',
  'Ordinary Shrimp!'
]
const shrimpTally = [
  '10',
  '9',
  '8',
  '7',
  '6',
  '5',
  '4',
  '3',
  '2',
  '1'
]
const shrimpUnfair = [
  '7',
  '6',
  '5',
  '4',
  '3',
  '2',
  '1'
]
function fryShrimp() {
  let output = '';
  document.getElementById("shrimpDisplay").innerHTML = null;
  // random maths for shrimpTally (1-10) + judgeVariance
  let meal = Rand(returned)
  output += `<br><br>You ${Rand(cooktype)} dat Shrimp. Made some <b style="color: #cb4b27;">${meal}</b><br>`
  document.getElementById("shrimpDisplay").innerHTML = output;

}
