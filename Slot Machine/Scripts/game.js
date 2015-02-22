/// <reference path="objects/Button.ts" />
//Declare the Canvas and stage
var canvas;
var stage;

//Declare bitmaps
var background;
var blank;
var bell;
var bar;
var spinButton;

//Declare Game Objects
var game;
var reels = [];

//Declare Game Variables
var spinResult;
var playerBet = 10;
var playerCredit = 250;

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
    var grape = 0;
    var banana = 0;
    var orange = 0;
    var cherries = 0;
    var bar = 0;
    var bell = 0;
    var seven = 0;

    for (var reel = 0; reel < 3; reel++) {
        if (spinResult[reel] == "blank") {
            blanks = true;
        }
    }

    //If there are not any blanks, count how many of each reel face appeared and calculate the winnings
    if (!blanks) {
        for (var reel = 0; reel < 3; reel++) {
            switch (spinResult[reel]) {
                case "grape":
                    grape++;
                    break;
                case "banana":
                    banana++;
                    break;
                case "orange":
                    orange++;
                    break;
                case "cherry":
                    cherries++;
                    break;
                case "bar":
                    bar++;
                    break;
                case "bell":
                    bell++;
                    break;
                case "seven":
                    seven++;
                    break;
            }
        }

        //Set the winnings (Lots of if and else if statements ahead... Reader beware)
        if (seven == 3) {
            winnings = playerBet * 100; //Change this to jackpot later once it's implemented
        } else if (bell == 3) {
            winnings = playerBet * 75;
        } else if (bar == 3) {
            winnings = playerBet * 50;
        } else if (cherries == 3) {
            winnings = playerBet * 40;
        } else if (orange == 3) {
            winnings = playerBet * 30;
        } else if (banana == 3) {
            winnings = playerBet * 20;
        } else if (grape == 3) {
            winnings = playerBet * 10;
        } else if (seven == 2) {
            winnings = playerBet * 20;
        } else if (bell == 2) {
            winnings = playerBet * 10;
        } else if (bar == 2) {
            winnings = playerBet * 5;
        } else if (cherries == 2) {
            winnings = playerBet * 4;
        } else if (orange == 2) {
            winnings = playerBet * 3;
        } else if (banana == 2) {
            winnings = playerBet * 2;
        } else if (grape == 2) {
            winnings = playerBet * 2;
        } else {
            winnings = playerBet;
        }

        //If player gets a 7, they will automatically get this reward
        if (seven == 1) {
            winnings = playerBet * 5;
        }
    } else {
        //If there are blanks, winnings are equal to the bet, so the player losses money
        winnings = playerBet * -1;
    }

    console.log("You won: " + winnings);
}

function spinReels() {
    spinResult = setReels();

    checkForWinnings(spinResult);

    for (var reel = 0; reel < 3; reel++) {
        game.removeChild(reels[reel]);

        reels[reel] = new createjs.Bitmap("assets/images/" + spinResult[reel] + ".png");
        reels[reel].x = 82 + (reel * 100);
        reels[reel].y = 236;

        game.addChild(reels[reel]);
    }
}

function setReels() {
    var outcome = [0, 0, 0];
    var reelOutcome = ["", "", ""];

    for (var spin = 0; spin < 3; spin++) {
        outcome[spin] = Math.floor((Math.random() * 65) + 1);

        switch (outcome[spin]) {
            case checkRange(outcome[spin], 1, 27):
                reelOutcome[spin] = "blank";
                break;
            case checkRange(outcome[spin], 28, 37):
                reelOutcome[spin] = "grapes";
                break;
            case checkRange(outcome[spin], 38, 46):
                reelOutcome[spin] = "banana";
                break;
            case checkRange(outcome[spin], 47, 54):
                reelOutcome[spin] = "orange";
                break;
            case checkRange(outcome[spin], 55, 59):
                reelOutcome[spin] = "cherry";
                break;
            case checkRange(outcome[spin], 60, 62):
                reelOutcome[spin] = "bar";
                break;
            case checkRange(outcome[spin], 63, 64):
                reelOutcome[spin] = "bell";
                break;
            case checkRange(outcome[spin], 65, 65):
                reelOutcome[spin] = "seven";
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

function updateUI() {
    background = new createjs.Bitmap("assets/images/Slot-machine.png");
    game.addChild(background);

    initReel();

    spinButton = new objects.Button("assets/images/spin.png", 368, 390);
    game.addChild(spinButton.getImage());

    //Set a onClick event handler for the spin button
    spinButton.getImage().addEventListener("click", spinReels);
}

function main() {
    game = new createjs.Container();
    game.x = 25;
    game.y = 10;

    updateUI();

    stage.addChild(game);
}
//# sourceMappingURL=game.js.map
