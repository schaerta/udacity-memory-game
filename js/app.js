/* Memory Game */

/* Create Game Board */

let container = document.querySelector('.container');
let board = document.createElement('ul');
board.classList.add("deck");

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/* Create Cards and add them to the board */

const fragment = document.createDocumentFragment();
cards = [];

for (let i=1; i<17; i++) {
  let card = document.createElement('li');
  card.classList.add('card');
  card.addEventListener('click', open);
  let text = document.createElement('i');
  text.classList.add('fa');

    if (i<3) {
      text.classList.add('fa-diamond');
    } else if (i<5) {
      text.classList.add('fa-paper-plane-o');
    } else if (i<7) {
      text.classList.add('fa-anchor');
    } else if (i<9) {
      text.classList.add('fa-bolt');
    } else if (i<11) {
      text.classList.add('fa-leaf');
    } else if (i<13) {
      text.classList.add('fa-bicycle');
    } else if (i<15) {
      text.classList.add('fa-bomb');
    } else {
      text.classList.add('fa-cube');
    }

  card.appendChild(text);
  cards.push(card);

}

/* Shuffle the cards and append them to board*/

let newSet = shuffle(cards);

for (let i=0; i<newSet.length; i++) {
  board.appendChild(newSet[i]);
}

/* Append Board to Document */

container.appendChild(board);


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

let moves = 0;
let openCards = [];

function checkMatch(card) {
  let symbol1 = openCards[0].querySelector('i').classList.item(1);
  let symbol2 = openCards[1].querySelector('i').classList.item(1);
  /*let class1 = symbol1.classList.item(0);*/
  console.log(symbol1, symbol2);
  if (symbol1 === symbol2) {
    console.log("Match!");
  } else {
    console.log("No match!");
  }
  openCards.splice(0,2);
}

function checkCard(card) {
  openCards.push(card);
  console.log(openCards);
  if (openCards.length > 1) {
    checkMatch(card);
  }
}

function open() {
  let card = this;
  this.classList.toggle('open');
  this.classList.toggle('show');
  /*this.classList.toggle('match');*/
  checkCard(card);
}
