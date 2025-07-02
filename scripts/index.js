let firstCard = 0
let secondCard = 0
let addCard = 0
let sumOfCards = 0
let hasBlackJack = false
let isAlive = false
let message = ""
let cards = []

const greeting = document.getElementById("message-el")
const count = document.getElementById("cards-el")
const total = document.getElementById("sum-el")
let startButton = document.getElementById("play-bt")

function noButton() {
	startButton.style.display = "none"
}

function getCard(min, max){
	min = Math.ceil(min) // Ensures min is an integer
	max = Math.floor(max) // Ensures max is an integer
	return Math.floor(Math.random() * (max - min + 1)) + min
}

function drawCard(){
	addCard = getCard(1, 13)
	if (addCard === 11 && sumOfCards + addCard > 21){
		addCard = 1
	} else if (addCard === 1 && sumOfCards + 11 === 21){
		addCard = 11
	} else if (addCard === 12 || addCard === 13){
		addCard = 10
	}
	cards.push(addCard)
	sumOfCards += addCard
	count.innerText += ", " + addCard
	total.innerText = "Total: " + sumOfCards
	startButton.removeEventListener("click", drawCard)
	game()
}

function game(){
        if (sumOfCards < 21){
		message = sumOfCards + "! " + "Do you want to draw a new card?"
		greeting.innerText = message
		startButton.addEventListener("click", drawCard)
					 
	} else if (sumOfCards === 21){
		message = "Blackjack! you win!"
		total.innerTex = "Total: " + sumOfCards	
		hasBlackJack = true
		greeting.innerText = message
		noButton()
		return hasBlackJack
	} else{
		message = "Over 21, you lost"
		total.innerText = "Total: " + sumOfCards
		isAlive = false
		greeting.innerText = message
		noButton()
		return hasBlackJack
	}
}

function start()
{
	firstCard = getCard(1, 11)
	cards.push(firstCard) 
	secondCard = getCard(1, 11)
	cards.push(secondCard)
	count.innerText += " " + firstCard + ", " + secondCard
	sumOfCards = firstCard + secondCard
	total.innerText = "Total: " + sumOfCards

	// update button
	startButton.id = "draw-bt"
	startButton.innerText = "Draw a card"
	startButton = document.getElementById("draw-bt")

	// Remove old button
	startButton.removeEventListener("click", start)

	// start game
	game()

}


// Cash out
console.log(message)
console.log(hasBlackJack)
console.log(isAlive)
startButton.addEventListener("click", start)
