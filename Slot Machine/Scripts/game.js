﻿/// <reference path="objects/Button.ts" />
//Declare the Canvas and stage
var canvas;
var stage;

//Declare bitmaps
var background;
var blank;
var bell;
var bar;

//Declare buttons
var spinButton;
var resetButton;
var bet1Button;
var bet10Button;
var bet100Button;

//Declare Game Objects
var game;
var reels = [];

//Declare game Texts
var betText;
var jackpotText;
var playerCreditText;

//Declare Game Variables
var spinResult;
var playerBet = 10;

//Jackpot will start at 500
var jackpot = 500;

//Player will start with 250 credits
var playerCredit = 10;

function init() {
    canvas = document.getElementById("canvas");
    stage = new createjs.Stage(canvas);
    stage.enableMouseOver(20);
    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", gameLoop);

    main();
}

function initReel() {
    var initReelResult = setReels();

    for (var reel = 0; reel < 3; reel++) {
        game.removeChild(reels[reel]);

        reels[reel] = new createjs.Bitmap("assets/images/" + initReelResult[reel] + ".png");
        reels[reel].x = 82 + (reel * 100);
        reels[reel].y = 236;

        game.addChild(reels[reel]);
    }
}

function gameLoop() {
    stage.update();
}

function checkForWinnings(spinResult) {
    var blanks = false;
    var winnings = 0;

    //Reel face variables
    var imperial = 0;
    var rebel = 0;
    var tiefighter = 0;
    var xwing = 0;
    var falcon = 0;
    var vader = 0;
    var yoda = 0;

    for (var reel = 0; reel < 3; reel++) {
        if (spinResult[reel] == "blank") {
            blanks = true;
        }
    }

    //If there are not any blanks, count how many of each reel face appeared and calculate the winnings
    if (!blanks) {
        for (var reel = 0; reel < 3; reel++) {
            switch (spinResult[reel]) {
                case "imperial":
                    imperial++;
                    break;
                case "rebel":
                    rebel++;
                    break;
                case "tiefighter":
                    tiefighter++;
                    break;
                case "xwing":
                    xwing++;
                    break;
                case "falcon":
                    falcon++;
                    break;
                case "vader":
                    vader++;
                    break;
                case "yoda":
                    yoda++;
                    break;
            }
        }

        //Set the winnings (Lots of if and else if statements ahead... Reader beware)
        if (yoda == 3) {
            winnings = playerBet * 100; //Change this to jackpot later once it's implemented
        } else if (vader == 3) {
            winnings = playerBet * 75;
        } else if (falcon == 3) {
            winnings = playerBet * 50;
        } else if (xwing == 3) {
            winnings = playerBet * 40;
        } else if (tiefighter == 3) {
            winnings = playerBet * 30;
        } else if (rebel == 3) {
            winnings = playerBet * 20;
        } else if (imperial == 3) {
            winnings = playerBet * 10;
        } else if (yoda == 2) {
            winnings = playerBet * 20;
        } else if (vader == 2) {
            winnings = playerBet * 10;
        } else if (falcon == 2) {
            winnings = playerBet * 5;
        } else if (xwing == 2) {
            winnings = playerBet * 4;
        } else if (tiefighter == 2) {
            winnings = playerBet * 3;
        } else if (rebel == 2) {
            winnings = playerBet * 2;
        } else if (imperial == 2) {
            winnings = playerBet * 2;
        } else {
            winnings = playerBet;
        }

        //If player gets a 7, they will automatically get this reward
        if (yoda == 1) {
            winnings = playerBet * 5;
        }
    } else {
        //If there are blanks, winnings are equal to the bet, so the player losses money
        winnings = playerBet * -1;
    }

    playerCredit += winnings;

    console.log("You won: " + winnings);
}

function spinReels() {
    if (!spinButton.isDisabled()) {
        spinResult = setReels();

        checkForWinnings(spinResult);

        for (var reel = 0; reel < 3; reel++) {
            game.removeChild(reels[reel]);

            reels[reel] = new createjs.Bitmap("assets/images/" + spinResult[reel] + ".png");
            reels[reel].x = 82 + (reel * 100);
            reels[reel].y = 236;

            game.addChild(reels[reel]);
        }

        jackpot += playerBet;
    }

    updateText();
}

function updateText() {
    //update the Jackpot text variable
    jackpotText.text = "" + jackpot;

    //Remove the current jackpotText child
    game.removeChild(jackpotText);

    //Add the updated jackpotText
    game.addChild(jackpotText);

    //If player's credit is 0, set the spin button to be disabled
    if (playerCredit <= 0) {
        playerCredit = 0;
        spinButton.setDisabled(true);
    }

    //Update Player Credit
    playerCreditText.text = "" + playerCredit;

    //Remove current child
    game.removeChild(playerCreditText);

    //Add the updated text back in
    game.addChild(playerCreditText);

    //Update Players Bet Text
    betText.text = "" + playerBet;
    game.removeChild(betText);
    game.addChild(betText);
}

function setReels() {
    var outcome = [0, 0, 0];
    var reelOutcome = ["", "", ""];

    for (var spin = 0; spin < 3; spin++) {
        outcome[spin] = Math.floor((Math.random() * 65) + 1);

        switch (outcome[spin]) {
            case checkRange(outcome[spin], 1, 27):
                reelOutcome[spin] = "star";
                break;
            case checkRange(outcome[spin], 28, 37):
                reelOutcome[spin] = "imperial";
                break;
            case checkRange(outcome[spin], 38, 46):
                reelOutcome[spin] = "rebel";
                break;
            case checkRange(outcome[spin], 47, 54):
                reelOutcome[spin] = "tiefighter";
                break;
            case checkRange(outcome[spin], 55, 59):
                reelOutcome[spin] = "xwing";
                break;
            case checkRange(outcome[spin], 60, 62):
                reelOutcome[spin] = "falcon";
                break;
            case checkRange(outcome[spin], 63, 64):
                reelOutcome[spin] = "vader";
                break;
            case checkRange(outcome[spin], 65, 65):
                reelOutcome[spin] = "yoda";
                break;
        }
    }

    return reelOutcome;
}

function checkRange(spinValue, lowEnd, highEnd) {
    if (spinValue >= lowEnd && spinValue <= highEnd) {
        return spinValue;
    } else {
        return !spinValue;
    }
}

function resetGame() {
    playerBet = 10;
    playerCredit = 250;
    jackpot = 500;

    updateText();

    spinButton.setDisabled(false);

    console.log("reset pressed");
}

function bet1() {
    playerBet = 1;
    updateText();
}

function bet10() {
    playerBet = 10;
    updateText();
}

function bet100() {
    playerBet = 100;
    updateText();
}

function updateUI() {
    background = new createjs.Bitmap("assets/images/Slot-machine.png");
    game.addChild(background);

    initReel();

    //Initiate the buttons
    spinButton = new objects.Button("assets/images/spin.png", 368, 390, false);
    game.addChild(spinButton.getImage());

    resetButton = new objects.Button("assets/images/reset.png", 30, 390, false);
    game.addChild(resetButton.getImage());

    //Set a onClick event handler for the spin button
    spinButton.getImage().addEventListener("click", spinReels);

    //Add an onClick event handler for the rest button
    resetButton.getImage().addEventListener("click", resetGame);

    //Set Jackpot text
    jackpotText = new createjs.Text("" + jackpot, "20px Arial", "#298A91");
    jackpotText.x = 218;
    jackpotText.y = 115;
    jackpotText.textBaseline = "alphabetic";
    game.addChild(jackpotText);

    //Set player Credit Text
    playerCreditText = new createjs.Text("" + playerCredit, "20px Arial", "#298A91");
    playerCreditText.x = 310;
    playerCreditText.y = 470;
    game.addChild(playerCreditText);

    //Set Player bet Text
    betText = new createjs.Text("" + playerBet, "20px Arial", "#298A91");
    betText.x = 230;
    betText.y = 470;
    game.addChild(betText);

    //Set up the Betting Buttons
    bet1Button = new objects.Button("assets/images/bet1.png", 60, 432, false);
    bet10Button = new objects.Button("assets/images/bet10.png", 100, 432, false);
    bet100Button = new objects.Button("assets/images/bet100.png", 140, 432, false);

    //Add bet buttons
    game.addChild(bet100Button.getImage());
    game.addChild(bet10Button.getImage());
    game.addChild(bet1Button.getImage());

    //Add functions to the Bet Buttons
    bet100Button.getImage().addEventListener("click", bet100);
    bet10Button.getImage().addEventListener("click", bet10);
    bet1Button.getImage().addEventListener("click", bet1);
}

function main() {
    game = new createjs.Container();
    game.x = 25;
    game.y = 10;

    updateUI();

    stage.addChild(game);
}
//# sourceMappingURL=game.js.map
