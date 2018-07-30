/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, dice, gamePlaying;

init();

// Using the math object.
dice = Math.floor(Math.random() * 6) + 1;
console.log(dice);

// Because of type coercion, JavaScripts converts this to '#current-0' 
// document.querySelector('#current-' + activePlayer).textContent = dice
// document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>'

var x = document.querySelector('#score-0').textContent;
console.log(x);

// the dot selector (.) is used to select a class.
document.querySelector('.dice').style.display = 'none';

/*
   Events are notifications to let the code know that something happened in the webpage.   
   An event listener is a function that performs an action based on a certain event.
   An event can only be executed as soon as an execution exact is empty.
   In the JavaScript engine, there is a message queue containing all the events waiting 
   to be processed.
   The event listener is a function which reacts to an event. Since it is a funciton, it 
   gets its own execution context.
*/

/*
   - What is a callback function
   - What is an anonymus functions
*/



function btn(){
    
}

// In this case btn is a callback funciton. It is a function that's passed
// to be called by someone else.
document.querySelector('.btn-roll').addEventListener('click', btn);

// An anonymus funciton is a function that doesn't have a name
document.querySelector('.btn-roll').addEventListener('click', function(){
    if (gamePlaying){
        // do something  here
        // 1.- Random number
        var dice = Math.floor(Math.random()*6) + 1;

        // 2.- Display result
        var diceDOM = document.querySelector('.dice');
        document.querySelector('.dice').style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';

        // 3.- Update the round score if the rolled number was not 1.
        if (dice !== 1){
            // Add score
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        }else{
            // Next player
            nextPlayer();
        }    
    }
    
    
});

document.querySelector('.btn-hold').addEventListener('click', function(){
    if (gamePlaying){
        // Add current score to global score
        scores[activePlayer] += roundScore;

        // Update the UI
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];

        // Check if player won the game
        if (scores[activePlayer] >= 20){
            document.getElementById('name-' + activePlayer).textContent = 'Winner';        
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        }else{    
            nextPlayer();    
        }
    }
});

document.querySelector('.btn-new').addEventListener('click', init);

function init(){
    gamePlaying = true;
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    
    document.getElementById('score-0').textContent = '0'
    document.getElementById('score-1').textContent = '0'
    document.getElementById('current-0').textContent = '0'
    document.getElementById('current-1').textContent = '0'
    
    document.querySelector('.player-' + 0 + '-panel').classList.remove('winner');
    document.querySelector('.player-' + 1 + '-panel').classList.remove('winner');
    document.querySelector('.player-' + 0 + '-panel').classList.remove('active');
    document.querySelector('.player-' + 1 + '-panel').classList.remove('active');
    document.querySelector('.player-' + 0 + '-panel').classList.add('active');
}

function nextPlayer(){
    activePlayer = activePlayer === 1 ? 0 : 1;
    roundScore = 0;
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;

    //document.querySelector('.player-0-panel').classList.remove('active');
    //document.querySelector('.player-1-panel').classList.add('active');

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');        
    document.querySelector('.dice').style.display = 'none';
    
    document.getElementById('name-' + 0).textContent = 'Player 1'; 
    document.getElementById('name-' + 1).textContent = 'Player 2'; 
    
}


/*
   How to add, remove and toggle HTML classes.  
*/


/*
   What a state variable is, how to use it and why to use it.
   A state variable tells us the condition of a system.
*/






























































