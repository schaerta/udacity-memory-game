/* Memory Game */

/*
 *
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

let numberOfMoves = 0;
let moveDisplay = document.querySelector('.moves');
let stars = document.querySelector('.stars');
let restartButton = document.querySelector('.restart');
restartButton.addEventListener('click', newGame);
let card = {};
let openCards = [];
let matchedPairs = 0;
let checkingForMatch = false;

function startGame() {
	/* Create Game Board */

	let container = document.querySelector('.container');
	let board = document.createElement('ul');
	board.classList.add('deck');

	// Shuffle function from http://stackoverflow.com/a/2450976
	function shuffle (array) {
		var currentIndex = array.length,
			temporaryValue,
			randomIndex;

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

	for (let i = 1; i < 17; i++) {
		let card = document.createElement('li');
		card.classList.add('card');
		card.isOpen = false;
		card.addEventListener('click', open);
		let text = document.createElement('i');
		text.classList.add('fa');

		if (i < 3) {
			text.classList.add('fa-diamond');
		} else if (i < 5) {
			text.classList.add('fa-paper-plane-o');
		} else if (i < 7) {
			text.classList.add('fa-anchor');
		} else if (i < 9) {
			text.classList.add('fa-bolt');
		} else if (i < 11) {
			text.classList.add('fa-leaf');
		} else if (i < 13) {
			text.classList.add('fa-bicycle');
		} else if (i < 15) {
			text.classList.add('fa-bomb');
		} else {
			text.classList.add('fa-cube');
		}

		card.appendChild(text);
		cards.push(card);
	}

	/* Shuffle the cards and append them to board*/

	let newSet = shuffle(cards);

	for (let i = 0; i < newSet.length; i++) {
		board.appendChild(newSet[i]);
	}

	/* Append Board to Document */

	container.appendChild(board);
}

function newGame() {
	let board = document.querySelector('.deck');
	board.remove();
	startGame();
}

function showSuccessMessage() {
	let container = document.querySelector('.container');
	let successContainer = document.createElement('div');
	let successMessage = document.createElement('div');
	successContainer.classList.add('success-container');
	successMessage.classList.add('success-message');
	container.appendChild(successContainer);
	successContainer.appendChild(successMessage);
	successMessage.innerHTML = "<h2>Congratulations!</h2><p>You completed the game!</p>"
}

function addToOpenCards(card) {
	openCards.push(card);
	if (openCards.length >= 2) {
		// Update Move Counter and Star Rating
		numberOfMoves++;
		moveDisplay.innerHTML = numberOfMoves;
		if (numberOfMoves === 10) {
			stars.firstElementChild.remove();
		} else if(numberOfMoves === 20) {
			stars.firstElementChild.remove();
		} else if (numberOfMoves === 30) {
			stars.firstElementChild.remove();
		}
		checkingForMatch = true;
		checkForMatch(openCards);
	}
}

function checkForMatch (openCards) {
	// comparing both cards directly would not work, as they are not the same object.
	// So we need to grab the Value of 'classList' of the child <i> element for the comparison to work.
	if ((openCards[0].querySelector('i').classList.value) === (openCards[1].querySelector('i').classList.value)) {
		openCards[0].removeEventListener('click', open);
		openCards[1].removeEventListener('click', open);
		openCards[0].classList.add('open');
		openCards[1].classList.add('open');
		openCards.length = 0;
		matchedPairs++;
		checkingForMatch = false;
		// Finish the game if all matches are found
		if(matchedPairs === 8) {
			showSuccessMessage();
		}
	} else {
		openCards[0].isOpen = false;
		openCards[1].isOpen = false;
		// Set Timeout ensures that both cards stay open long enough for the player to see what is happening
		setTimeout(closeCards, 500, openCards);
	}
}

function closeCards (openCards) {
	openCards[0].classList.toggle('show');
	openCards[1].classList.toggle('show');
	openCards.length = 0;
	checkingForMatch = false;
}

/* First function to execute when a card is clicked */
function open () {
	// this condition makes sure nothing happens when a user clicks a card
	// while two other unmatched cards are still being displayed.
	if (!checkingForMatch) {
		card = this;
		card.classList.toggle('show');
		card.isOpen = !card.isOpen;
		if (card.isOpen) {
			addToOpenCards(card);
		} else {
			openCards.length = 0;
		}
	}
}

// Run function on page load
startGame();
