let randomNumber = parseInt(Math.random()*100+1);
const submitButton = document.querySelector('#submit');
const userInput = document.querySelector('#guessfield');
const guessSlot = document.querySelector('.guesses');
const remaining = document.querySelector('.lastResult');
const lowOrHigh = document.querySelector('.lowOrHi');
const startOver = document.querySelector('.resultParas');

const p = document.createElement('p');

let prevGuess = [];
let numGuess = 1;

let playGame = true;

if(playGame){
    submitButton.addEventListener('click',function(e){
        e.preventDefault() 
                            // means value are holded here, 
                           // they are not sended on the server.
        const guess = parseInt(userInput.value);
        validateGuess(guess);                 
    })
} 

function validateGuess(guess){ 
                             //validation of input number 
    if(isNaN(guess)){
        alert('Please enter a valid number')
    }
    else if(guess<1){
        alert('Please enter a number greater than one')
    }
    else if(guess>100){
        alert('Please enter a number less than 100')
    }
    else{
        prevGuess.push(guess);
        if(numGuess === 11){
            displayGuess(guess)
            displayMessage(`GAME OVER...Random Number was ${randomNumber}`)
            endGame()
        }
        else{
            displayGuess(guess);
            checkGuess(guess);
        }

    }
}

function checkGuess(guess){
    if(guess === randomNumber){
        displayMessage(`Great You Guessed it RIGHT!!!`)
        endGame();
    }
    else if(guess<randomNumber){
        displayMessage(`Number is TOOO low`)

    }
    else if(guess>randomNumber){
        displayMessage(`Number is TOOO high`)
    }

}
function displayGuess(guess){
    userInput.value = ''
    guessSlot.innerHTML += `${guess}, `;
    numGuess++;
    remaining.innerHTML = `${11 - numGuess}`

}
function displayMessage(message){
    lowOrHigh.innerHTML = `<h2>${message}</h2>`

}
function endGame(){
    userInput.value = ''
    userInput.setAttribute('disabled', '') //key-value pair
    p.classList.add('button')
    p.innerHTML = `<h2 id="newGame">Start New Game</h2>`;
    startOver.appendChild(p);
    playGame = false;
    newGame()
}

function newGame(){
    const newGameButton = document.querySelector('#newGame');
    newGameButton.addEventListener('click', function(e){
        randomNumber = parseInt(Math.random()*100+1);
        prevGuess = []
        numGuess = 1
        guessSlot.innerHTML = ''
        remaining.innerHTML = `${11-numGuess}`
        userInput.removeAttribute('disabled');
        startOver.removeChild(p);
        displayMessage('')
        
        
        playGame = true

    });

}