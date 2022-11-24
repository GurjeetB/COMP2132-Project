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
        this.die1.value = 0;
        this.die2.value = 0;
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
    }
    updateDisplayScore(){
        // Updates the dice rolls
        $(`#${this.name}_die_1`).text(`${this.die1.value}`);
        $(`#${this.name}_die_2`).text(`${this.die2.value}`);
        // Updates the current score
        $(`#${this.name}_current_roll`).text(`${this.currentScore}`);
        // Updates the total score
        $(`#${this.name}_current_total`).text(`Total: ${this.totalScore}`)
    }
}


// Upon page load, initializes two users
// The Player and the CPU
let player01 = new User(`player`);
let player02 = new User(`cpu`);

// Defines the function for resetting all game stats
function resetGame(){
    player01.resetScore();
    player02.resetScore();
    player01.updateDisplayScore();
    player02.updateDisplayScore();
}

// Resets the game, just to be sure
resetGame();


// Upon clicking the roll button
$(`#roll_button`).click(function(){
    // Rolls dice
    player01.rollDice();
    player02.rollDice();
    // Gets the scores for the current roll
    player01.calculateCurrentScore();
    player02.calculateCurrentScore();
    // Updates the DOM to show current scores
    player01.updateDisplayScore();
    player02.updateDisplayScore();
})

// Upon clicking the New Game button
$(`#reset_button`).click(resetGame)