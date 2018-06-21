
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
let moneyValue = document.getElementById("money");


	//logs all items in array with s
for (s in suits) {
	//within the suit value first index of s will be uppercase
	let suit = suits[s][0].toUpperCase();
	let bgColor = (suit == "S" || suit == "C") ? "black" : "red";
				//if Suit = Spades or Clubs, then apply Black, if not red
	//logs all items in array with n
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

const outputCard = () => {
	//+= will allow us to add cards consecutively to our id of output 
	output.innerHTML += "<span style='color:" + cards[cardCount].bgColor + "'>" + 
	cards[cardCount].cardNum + "&" + cards[cardCount].icon + ";</span>  ";
}

//functions for button events
const cardAction = (event) => {
	console.log(event);
	switch (event) {
		case 'hit':
			hitCard();
			break;
		case 'stay':
			endHand();
	}
}

//hit function
const hitCard = () => {
	playerCard.push(cards[cardCount]);
	playerHolder.innerHTML += cardOutput(cardCount, (playerCard.length -1));
	cardCount++

	let playerCardSum = checkSum(playerCard);
	playerValue.innerHTML = playerCardSum;
	if (playerCardSum > 21) {
		message.innerHTML = "bust!";
		endHand();
	}
}

//function to end the current hand
const endHand = () => {
	endGame = true;
	//hide and show correct btns
	document.getElementById('cover').style.display = "none";
	document.getElementById('actions').style.display = "none";
	document.getElementById('dealBtn').style.display = "block";
	//show deal button only when game is over
	document.getElementById('myBet').disabled = false;
	// message.innerHTML = "Game Over:";

	let blackjackPayout = 1;
	let dealerCardSum = checkSum(dealerCard);
	dealerValue.innerHTML = dealerCardSum;

	//DEALER AI
	//if dealer hand is less than 17 then automatically add cards
	while (dealerCardSum < 17) {
		dealerCard.push(cards[cardCount]);
		dealerHolder.innerHTML += cardOutput(cardCount, (dealerCard.length -1));
		cardCount++;
		dealerCardSum = checkSum(dealerCard);
		dealerValue.innerHTML = dealerCardSum;
	}

	//check for win
	//account for blackjack (x 1.5)auto win upon first hand deal
	let playerTotal = checkSum(playerCard);
		if(playerTotal == 21 && playerCard.length == 2) {
			message.innerHTML = "Player Has Blackjack!";
			blackjackPayout = 1.5;
	}
	let betValue = parseInt(document.getElementById('myBet').value) * blackjackPayout;

		 if ((playerTotal < 22 && playerTotal > dealerCardSum) || 
			(dealerCardSum > 21 && playerTotal < 22)) {
			message.innerHTML += '<span style="color:green"> Player wins $' + betValue + '</span>';
		//multiply by 2 bc we take value off the total so if we dont do this
		//user will always break even
			myMoney = myMoney + (betValue * 2);
	
		} else if (playerTotal > 21) {
			message.innerHTML += '<span style="color:red"> Dealer wins. Player lost $' + betValue + '</span>';
		} else if (playerTotal < dealerCardSum) {
			message.innerHTML += '<span style="color:red"> Dealer wins. Player lost $' + betValue + '</span>';
		} else if (playerTotal == dealerCardSum) {
			message.innerHTML += '<span style="color:blue"> Push</span>';
			//give player money back without multiplying by 2
			myMoney = myMoney + betValue;
		}
		// playerValue.innerHTML = dealerValue;
		moneyValue.innerHTML = myMoney;
}

//check sum of cards and account for Ace 11 or 1
const checkSum = (array) => {
	let playerCardSum = 0;
	let aceAdjust = false;
	for (let i in array) {
		//if card is an Ace AND aceAdjust = false (by default)
		if (array[i].cardNum == 'A' && !aceAdjust) {
			aceAdjust = true;
			//get sum of 11
			playerCardSum = playerCardSum + 10;
		}
		playerCardSum = playerCardSum + array[i].cardValue;
	}	//then while aceAdjust is true AND playerCard > 21
		//then subtract 10 to turn it back to 1
	if (aceAdjust && playerCardSum > 21) {
		playerCardSum = playerCardSum - 10;
	}
	return playerCardSum;
}





