//Declare the Canvas and stage
var canvas;
var stage;

//Declare bitmaps
var background: createjs.Bitmap;
var blank: createjs.Bitmap;
var bell: createjs.Bitmap;
var bar: createjs.Bitmap;
var spinButton: createjs.Bitmap;

//Declare Game Objects
var game;

//Declare Gamer Variables


function init() {
    canvas = document.getElementById("canvas");
    stage = new createjs.Stage(canvas);
    stage.enableMouseOver(20);
    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", gameLoop);

    main();
}

function gameLoop() {
    stage.update();
}

function updateUI() {
    background = new createjs.Bitmap("assets/images/Slot-machine.png");
    game.addChild(background);

    blank = new createjs.Bitmap("assets/images/blank.png");
    blank.x = 120;
    blank.y = 352;

    bell = new createjs.Bitmap("assets/images/bell.png");
    bell.x = 266;
    bell.y = 352;

    bar = new createjs.Bitmap("assets/images/bar.png");
    bar.x = 414;
    bar.y = 352;

    spinButton = new createjs.Bitmap("assets/images/spin.png");
    spinButton.x= 520;
    spinButton.y= 590;

    game.addChild(blank);
    game.addChild(bell);
    game.addChild(bar);
    game.addChild(spinButton);
}

function main() {
    game = new createjs.Container();
    game.x = 25;
    game.y = 10;

    updateUI();

    stage.addChild(game);
}