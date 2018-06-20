
let cards = [];
let playerCard = [];
let dealerCard = [];
let cardCount = 0; //keeps track of what card we're at in the deck
let myMoney = 100;
let endGame = false;
let suits = ["spades", "hearts", "clubs", "diams"]; //named diams for output
let numb = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q","K"];
let output = document.getElementById("output");
let message = document.getElementById("message");
let dealerHolder = document.getElementById("dealerHolder");
let playerHolder = document.getElementById("playerHolder");
let playerValue = document.getElementById("playerValue");
let dealerValue = document.getElementById("dealerValue");
let moneyValue = document.getElementById("money")



for (s in suits) {
	//within the suit value first index of s will be uppercase
	let suit = suits[s][0].toUpperCase();
	let bgColor = (suit == "S" || suit == "C") ? "black" : "red";
				//if Suit = Spades or Clubs, then apply Black, if not red

	for (n in numb) {
		//grab output and place += for cards to show consecutively
		//insert span tags and style
		
		// output.innerHTML += "<span style='color:"+bgColor+"'>&" + suits[s] + ";" + numb[n] + "</span> ";
		
		//if N is greater than 9 then assign value of 10
		//parse string from n array and turn into integer
		let cardValue = (n > 9) ? 10 : parseInt(n) + 1;
		let card = {
			suit:suit,
			icon:suits[s],
			bgColor:bgColor,
			cardNum:numb[n],
			cardValue:cardValue
		}
		//push value of card into array
		cards.push(card);
	}
}

// console.log(cards);

//to shuffle the deck
//once start game, then give option to deal
const start = () => {
	shuffleDeck(cards);
	dealNew();
	//hide start btn once its clicked
	document.getElementById('start').style.display = "none";
	//get money and set it equal to the defined variable
	document.getElementById('money').innerHTML = myMoney;
	//after we shuffle the deck deal out new cards
	// dealNew();
	//test output - after shuffling deck 
}

const dealNew = () => {
	//clear out playerCard and dealerCard array so we know
	//when dealing out we are clearing everything outright
	playerCard = [];
	dealerCard = [];
	dealerHolder.innerHTML = "";
	playerHolder.innerHTML = "";
	dealerValue.innerHTML = "";


	//show stay hit and deal btns
	//get bet value and store it. Get sum of myMoney
	let betValue = document.getElementById('myBet').value;
	myMoney = myMoney - betValue
	document.getElementById('money').innerHTML = myMoney;
	document.getElementById('actions').style.display = 'block';
	document.getElementById('myBet').disabled = true;
	deal();

}

//deal cards function
const deal = () => {
	console.log(cards);
// card count reshuffle
	for (x = 0; x < 2; x++) {
		dealerCard.push(cards[cardCount]);
		dealerHolder.innerHTML += cardOutput(cardCount, x);
		//if first card dealt out, then cover up dealer card
		if ( x == 0) {
			dealerHolder.innerHTML += '<div id="cover" style="left:100px;"></div>';
		}
		cardCount++
		playerCard.push(cards[cardCount]);
		playerHolder.innerHTML += cardOutput(cardCount, x);
		cardCount++
	}
	// let playerCardSum = checkSum(playerCard);
	// playerValue.innerHTML = playerCardSum;
		//better to do this
	playerValue.innerHTML = checkSum(playerCard);
	console.log(dealerCard);
	console.log(playerCard);
}

//have to pass in a value of n and x for what the card is
//then position card using CSS
const cardOutput = (n, x) => {
	let hpos = (x > 0) ? x * 60 + 100 : 100;
	return '<div class="icard ' + cards[n].icon + '" style="left:' + hpos + 'px;"> <div class="top-card suit">' + cards[n].cardNum + '<br></div> <div class="content-card suit"></div><div class="bottom-card suit">' + cards[n].cardNum + '<br></div> </div>';
}

//got to be able to add more than 1 card to array when hitting
const hitMe = () => {
	for (x = 0; x < 2; x+)
		const $divPlayer = $('<div>');
		let hitCard = deck.shift();
		playerCards.push(hitCard);
		$('#player').append($divPlayer).text(playerCards[0].Value + "  " + playerCards[1].Value + " " + playerCards[2].Value);
		//check for win or bust here
}

//fisher yates shuffle method
const shuffleDeck = (array) => {
	for (let i = array.length -1; i > 0; i--) {
		let j = Math.floor(Math.random() * (i + 1));
		let temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}
	return array;
}

//create function to update/keep track of player/dealer scores

//create function to check for win/loss


//function stay
//function checkWin
//function checkLoss


//event listeners
// const startGame = () => {
// 	$('.start').on('click', () => {
// 		console.log("start works");
// 		createDeck();
// 		shuffle(deck);
// 		// console.log(deck);
// 		dealCards();
// 	});
// }
// startGame();

// const hitPlayer =() => {
// 	$('.hitMe').on('click', () => {
// 		console.log('hit working');
// 		hitMe();
// 	})
// }
// hitPlayer();

// const stayPlayer = () => {
// 	$('.stay').on('click', () => {
// 		console.log('stay works');
// 	})
// }




