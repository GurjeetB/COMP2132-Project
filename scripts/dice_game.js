// Defines a die object
class Die{
    constructor(name){
        this.name = name;
        this.value = 0;
    }
    roll(){
        this.value = Math.floor(Math.random() * 6) + 1;
    }
}

// Defines a user object
class User{
    constructor(name){
        this.name = name;
        this.die1 = new Die(`${name}Die1`);
        this.die2 = new Die(`${name}Die2`);
        this.currentScore = 0;
        this.totalScore = 0;
    }
    resetScore(){
        this.die1.value = 1;
        this.die2.value = 2;
        this.currentScore = 0;
        this.totalScore = 0;
    }
    rollDice(){
        this.die1.roll();
        this.die2.roll();
    }
    calculateCurrentScore(){
        if(
            // If either die is a 1
            this.die1.value == 1 || this.die2.value == 1
            ){
            // Sets the score to 0
            this.currentScore = 0;
        }else if(
            // If both dice match
            this.die1.value == this.die2.value 
        ){
            // Doubles the score
            this.currentScore = (this.die1.value + this.die2.value) * 2;
        }else{
            // For any other result, gets the score
            this.currentScore = this.die1.value + this.die2.value;
        }

        // Adds the current score to the user's total
        this.totalScore += this.currentScore;
    }
    updateDisplayScore(){
        // Updates the dice rolls
        $(`#${this.name}_die_1`).attr(`src`,`./images/dice${this.die1.value}.png`);
        $(`#${this.name}_die_2`).attr(`src`,`./images/dice${this.die2.value}.png`);
        // Updates the current score
        $(`#${this.name}_current_roll`).text(`${this.currentScore}`);
        // Updates the total score
        $(`#${this.name}_current_total`).text(`Total: ${this.totalScore}`)
    }
}

// Hides the tutorial text upon page load
$(`#tutorial_text`).hide();

// Shows the tutorial text upon clicking the How to Play button
$(`#info_button`).click(function(){
    $(`#tutorial_text`).fadeIn();
});

// Hides the tutorial text upon clicking the close button
$(`#close_info`).click(function(){
    $(`#tutorial_text`).fadeOut();
});


// Upon page load, initializes two users
// The Player and the CPU
let player01 = new User(`player`);
let player02 = new User(`cpu`);
// Initializes the amount of rolls remaining
let rollsLeft = 3;

// Defines the function for resetting all game stats
function resetGame(){
    player01.resetScore();
    player02.resetScore();
    player01.updateDisplayScore();
    player02.updateDisplayScore();

    rollsLeft = 3;

    $(`aside`).hide();
    $(`aside`).removeClass(`player_wins`);
    $(`aside`).removeClass(`computer_wins`);

    // Re-enables the Roll button
    $(`#roll_button`).prop(`disabled`, ``);
    $(`#roll_button`).removeClass(`disabled_button`);
}

// Resets the game, just to be sure
resetGame();

// Defines the function for ending the game
function endGame(){
        // If the player's score is higher than the CPU's
        if(player01.totalScore >= player02.totalScore){
            $(`aside`).addClass(`player_wins`);
            $(`#results_text`).text(`You Win!`);
        }else{
            $(`aside`).addClass(`computer_wins`);
            $(`#results_text`).text(`Too Bad`);
        }
        $(`aside`).fadeIn();

        // Disables the Roll button
        $(`#roll_button`).prop(`disabled`, `true`);
        $(`#roll_button`).addClass(`disabled_button`);
}

// Defines the function for having both players roll
function readEmAndWeep(){
    // Rolls dice
    player01.rollDice();
    player02.rollDice();
    // Gets the scores for the current roll
    player01.calculateCurrentScore();
    player02.calculateCurrentScore();
    // Updates the DOM to show current scores
    player01.updateDisplayScore();
    player02.updateDisplayScore();

    rollsLeft--;
    $(`#rolls_left`).text(`Rolls remaining: ${rollsLeft}`);
    if(rollsLeft <= 0){
        endGame();
    }
}


// Upon clicking the roll button
$(`#roll_button`).click(readEmAndWeep)

// Upon clicking the New Game button
$(`#reset_button`).click(resetGame)