/* Number Guessing Game JavaScript */

var secretNumber = 0,
	numberOfGuesses = 0;

function writeMessage(elementId, message, appendMessage) {
	var elemToUpdate = document.getElementById(elementId);
	if (appendMessage) {
		elemToUpdate.innerHTML = elemToUpdate.innerHTML + message;
	} else {
		elemToUpdate.innerHTML = message;
	}
};
document.addEventListener('keypress', function(e) {
	
	  var keynum = e.key;
	  if(keynum == "Enter") {
		userGuessed();
	  }
	}
)

function newGame() {
	secretNumber = Math.floor(Math.random() * 1000) + 1;
	numberOfGuesses = 0;
	writeMessage('historyList', '');
}

function guessInRange(guess) {
	return (guess > 0 && guess < 1001);
}

function userGuessed() {
	var userGuessed = document.getElementById('userGuess').value;
	var statusArea = document.getElementById('statusArea');
	var historyList = document.getElementById('historyList');
	if (userGuessed.length == 0 || ! guessInRange(userGuessed)) {
		
		writeMessage('statusArea', '<p>Please enter a number 1-1000 and press the Guess button.</p>');
	} else if (userGuessed.indexOf('.') != -1) {
		writeMessage('statusArea', '<p>Please enter a whole number 1-1000 and press the Guess button.</p>');
	} else {
		numberOfGuesses++;

		if (userGuessed == secretNumber) {
			
			writeMessage('statusArea', '<p>You got me in ' + numberOfGuesses +' guesses, I was thinking ' + secretNumber + '. Let\'s go again...</p>');
			newGame();
		} else if (userGuessed < secretNumber) {
			
			writeMessage('statusArea', '<p>You need to guess higher than ' + userGuessed + ', try again...</p>');
			writeMessage('historyList', '<li>' + userGuessed +' (too low)</li>', true);
		} else {
			
			writeMessage('statusArea', '<p>You need to guess lower than ' + userGuessed + ', try again...</p>');
			writeMessage('historyList', '<li>' + userGuessed + ' (too high)</li>', true);
		}
	}

	document.getElementById('userGuess').value = '';	
}

window.onload = function() {
	newGame();
	document.getElementById('buttonArea').addEventListener('click', userGuessed);
};
