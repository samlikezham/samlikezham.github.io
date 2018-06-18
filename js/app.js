// console.log("it works")


// single deck - build an array of 52 cards
var suits = ["Spades", "Hearts", "Diamonds", "Clubs"];
var cards = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
var deck = new Array();

//window onload
$(() => {



//function to create deck
    const createDeck = () => {
        deck = new Array();
        for (var i = 0 ; i < cards.length; i++)
        {
            for(var x = 0; x < suits.length; x++)
            {	//parse strings into values
                var weight = parseInt(cards[i]);
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
		console.log(deck);
		shuffle(deck)
		console.log(deck)
	});
}
startGame();

const hitPlayer =() => {
	$('.hitMe').on('click', () => {
		console.log('hit working');
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

