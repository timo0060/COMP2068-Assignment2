/// <reference path="objects/Button.ts" />


//Declare the Canvas and stage
var canvas;
var stage;

//Declare bitmaps
var background: createjs.Bitmap;
var blank: createjs.Bitmap;
var bell: createjs.Bitmap;
var bar: createjs.Bitmap;
var spinButton: objects.Button;

//Declare Game Objects
var game;
var reels: createjs.Bitmap[] = [];
var reelContainers: createjs.Container[] = [];

//Declare Gamer Variables
var spinResult;

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

function spinReels() {
    spinResult = setReels();

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
    if(spinValue >= lowEnd && spinValue <= highEnd) {
        return spinValue
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