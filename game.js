// game.js

var a = document.getElementById("guessnum");
var res = document.getElementById("result");
var sc = document.getElementById("score");
var popup = document.getElementById("popup");
var popupContent = document.getElementById("popup-content");
var popupMessage = document.getElementById("popup-message");
var popupScore = document.getElementById("popup-score");
var attemptsSpan = document.getElementById("attempts");

var randomnum = Math.floor(Math.random() * 10 + 1);
var totscore = 10;
var attempts = 3;
var gameWon = false;

function check() {
    if (!gameWon && attempts > 0) {
        var enterednum = parseInt(guessnum.value);

        if (isNaN(enterednum)) {
            res.textContent = "Enter a valid number";
            return;
        }

        attempts--;

        if (randomnum === enterednum) {
            res.textContent = "Congratulations! You guessed it right!";
            showPopup("You Won!", "Congratulations! You guessed it right!", "Your score is: " + totscore, "green");
            gameWon = true;
        } else {
            if (attempts > 0) {
                res.textContent = "Wrong! Try again.";
            } else {
                res.textContent = "Game Over! The correct number was " + randomnum;
                showPopup("Game Over", "Sorry, try again. Better luck next time!", null, "red");
            }
        }

        sc.textContent = "Attempts left: " + attempts;
    } else if (gameWon) {
        alert("You've already won. Refresh the page to play again.");
    } else {
        alert("Game over. Refresh the page to play again.");
    }
}

function showPopup(title, message, subtitle, colorClass) {
    popupMessage.textContent = title;
    
    if (subtitle) {
        popupScore.innerHTML = subtitle + "<br>" + message;
    } else {
        popupScore.textContent = message;
    }

    popupContent.className = "popup-content " + colorClass;
    popup.style.display = "flex";
}

function closePopup() {
    popup.style.display = "none";
}
