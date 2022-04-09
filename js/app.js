// create grid:
for(i=91; i>0; i=i-10){
    for(j=0; j<10; j++){
        $('grid').append($('<div class="card" id ='+(i+j)+'><h3>' + (i + j) + '</h3></div>'));
    }
  }

// initialize certain variables
let turn = "player1";
let player1;
let player2;
let currentPosition;

// roll dice audio file
let audio = new Audio("https://sounds-mp3.com/mp3/0004526.mp3")


// caching buttons
const newGame = document.querySelector(".newGameBtn");
const rollDice = document.querySelector(".rollDiceBtn");
let newGameBtn = document.getElementById("newGameBtn");


// event listeners
newGame.addEventListener("click", clickHandlerNewGame);
rollDice.addEventListener("click", clickHandlerRollDice);


// functions for clicks
// new game button
function clickHandlerNewGame(){
    // first collect info to see if players are already at the starting point

    player1 = document.getElementById("player1")
    player2 = document.getElementById("player2")
    rollDice.disabled = false;

    // action if there are no players on the board
    if (player1 === null){
        document.getElementById('messageBox').innerHTML = "Player 1 starts! Hit the 'Roll Dice' button to roll!";
        $('#1').append($('<div id="player1">1</div>'));
        $('#1').append($('<div id="player2">2</div>'));

        player1 = document.getElementById("player1")
        player2 = document.getElementById("player2")
    
    // action if there are players on the board
    } else{
        player1.remove()
        player2.remove()
        document.getElementById('messageBox').innerHTML = "Player 1 starts! Hit the 'Roll Dice' button to roll!";
        $('#1').append($('<div id="player1">1</div>'));
        $('#1').append($('<div id="player2">2</div>'));

        player1 = document.getElementById("player1")
        player2 = document.getElementById("player2")
        };

} 

// function to deal with roll dice button
function clickHandlerRollDice(){
    function playerPosition(){
        element = document.getElementById(turn);
        parentElement = element.closest("grid > div");
    }
    playerPosition(turn)

    // console.log(parentElement.id)

    function getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
      }

      rollValue = getRandomIntInclusive(2,12);
      document.getElementById('rollValue').innerHTML = `Value of roll = ${rollValue}`;

      currentPosition = parseInt(parentElement.id);

      let node = document.getElementById(turn)

      currentPosition = currentPosition + rollValue;
      console.log(currentPosition);

      // snakes and ladders steps
      if (currentPosition === 3 || currentPosition === 19){
          currentPosition = currentPosition + 21
        } else if(currentPosition === 15 || currentPosition === 25 || currentPosition === 39){
          currentPosition = currentPosition+10
        } else if(currentPosition === 80 || currentPosition === 88){
            currentPosition = currentPosition-30
        } else if(currentPosition === 60 || currentPosition === 45 || currentPosition === 35){
            currentPosition = currentPosition-10
        } else {currentPosition = currentPosition};

      // check if player has won the game
      if (currentPosition >= 100){
        document.getElementById('messageBox').innerHTML = `${turnLabel} wins!`;
        rollDice.disabled = true;
        return
    } else {currentPosition=currentPosition}

      // switch the player from the old position to new position
      document.getElementById(currentPosition).appendChild(node);

      // switch players and assign a name for the message box
      if (turn === "player1"){
        turn = "player2"
        turnLabel = "Player 2"
      } else{
          turn = "player1"
          turnLabel = "Player 1"
      }

      audio.play()

    // disabling roll dice button for 2 sec so that audio effect can play
    rollDice.disabled = true;
    setTimeout(function(){
        rollDice.disabled = false;}, 2000); 

      document.getElementById('messageBox').innerHTML = `${turnLabel}'s turn!`;

}