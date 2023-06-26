const gameContainer = document.getElementById("game");
let flippedCards = []; // to keep track of flipped cards, at most should only be two
let flag = false; // flag to prevent more than two cards being clicked
let matchedCards = 0; // to keep track of matched cards, once hit 5 then end game
let attempts = 0; // to keep track of number of attempts at matching

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// Add restart button when game is finished
const restartBtn = document.createElement("button");
restartBtn.type = "submit";
restartBtn.innerText = "Restart";

restartBtn.addEventListener('click', function () {
  location.reload();
});

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked

  if (flag == true) { // flag is true if two cards have already been clicked, will exit the EventListener
    return;
  }

  //console.log("you just clicked", event.target);
  card = event.target;
  card.style.backgroundColor = card.classList[0];
  flippedCards.push(card);

  if (flippedCards.length == 2) {
    flag = true;

    card1 = flippedCards[0];
    card2 = flippedCards[1];

    cardColor1 = card1.style.backgroundColor;
    cardColor2 = card2.style.backgroundColor;

    if (cardColor1 == cardColor2) { // if colors match remove event listener and reset
      card1.removeEventListener("click", handleCardClick);
      card2.removeEventListener("click", handleCardClick);
      // increment the number of attempts and when cards match
      matchedCards += 1;
      attempts += 1;
      flippedCards = [];
      flag = false;

      // send an alert once game is finished along with the number of attempts 
      if (matchedCards == 5) {
        alert(`CONGRATS YOU FINISHED THE GAME!\n Number of attempts: ${attempts}`);

        // Once game is finished add restart button
        gameContainer.appendChild(restartBtn);

      };

      // if they don't match reset card background color and reset game round
    } else {
      setTimeout(function () {
        card1.style.backgroundColor = '';
        card2.style.backgroundColor = '';
        attempts += 1;
        flippedCards = [];
        flag = false;
      }, 1000);
    }
  }

}

// when the DOM loads
createDivsForColors(shuffledColors);
