// console.log("it works")


// single deck - build an array of 52 cards
let suits = ["Spades", "Hearts", "Diamonds", "Clubs"];
let cards = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
let deck = [];
let bankroll = 0;
let players = [];
let playerCards = [];
let dealerCards = [];
let currentPlayer = 0;

//window onload
$(() => {



//function to create deck
    const createDeck = () => {
        for (let i = 0 ; i < cards.length; i++)
        {
            for(let x = 0; x < suits.length; x++)
            {	//parse strings into values
                let weight = parseInt(cards[i]);
                if (cards[i] == "J" || cards[i] == "Q" || cards[i] == "K")
                    weight = 10;
                if (cards[i] == "A")
                    weight = 11 || 1;
                var card = { Value: cards[i], Suit: suits[x], Weight: weight };
                deck.push(card);
            }
        }
    }
// createDeck();
// console.log(deck);

//creat shuffle function - use fisher yates shuffle
//Durstenfeld shuffle, a computer-optimized version of Fisher-Yates
	const shuffle = () => {
		for (let i = deck.length - 1; i > 0; i--) {
			let location1 = Math.floor(Math.random() * (i + 1));
			let location2 = Math.floor(Math.random() * (i + 1));
			let tempValue = deck[location1];

			deck[location1] = deck[location2];
			deck[location2] = tempValue;
		}
	}

//create players (player vs dealer) / Deal cards
	const dealCards = () => {
		//player always gets dealt first, then dealer
		let firstCard = deck.shift();
		playerCards.push(firstCard);
		const $divPlayer = $('<div>');
			$('#player').append($divPlayer).text(playerCards[0]);
		//get inner html to display first card we created


		let secondCard = deck.shift();
		dealerCards.push(secondCard);

		let fourthCard = deck.shift();
		playerCards.push(fourthCard);
		//log to check
		console.log(playerCards)

		let fifthCard = deck.shift();
		dealerCards.push(fifthCard);
		//log to check
		console.log(dealerCards);

	}


// const dealerUI = () => {
// 	const $divDealer = $('<div>');
// 	const $divDealerHand = $('<div>');
// 	const $divPoints = $('<div>');

// 	$('#dealer').addClass('dealer').attr('id', 'dealer').append($divDealer);
// 	$divDealer.attr('id', 'hand ' + i).append($divDealerHand);
// 	$divDealer.addClass('points').attr('id', 'points').append($divPoints);
// }


//keep track of player/dealer scores

//function hit should take a random card from array and add X value to player
//and dealer scores


//function stay
//function checkWin
//function checkLoss


//event listeners
const startGame = () => {
	$('.start').on('click', () => {
		console.log("start works");
		createDeck();
		shuffle(deck);
		// console.log(deck);
		dealCards();
	});
}
startGame();

const hitPlayer =() => {
	$('.hitMe').on('click', () => {
		console.log('hit working');
		// dealCards();
	})
}
hitPlayer();

const stayPlayer = () => {
	$('.stay').on('click', () => {
		console.log('stay works');
	})
}
stayPlayer();



});
