'use strict'



var flip=false;
var vertBlackPawn=50;
var vertWhitePawn=300;
var vertWhitePiece = 350;
var vertBlackPiece = 0;

var placementArray = ["x", "x", "x", "x", "x", "x", "x", "x"];

const canvas = document.getElementById('chess960');
const context = canvas.getContext('2d');

const imgNames=[
    "./Chess_Board.jpg", //0
    "./Pawn_Black.png", //1
    "./Pawn_White.png", //2
    "./Bishop_White.png", //3
    "./Bishop_Black.png", //4
    "./Queen_Black.png", //5
    "./Queen_White.png",//6
    "./Rook_Black.png", //7
    "./Rook_White.png", //8
    "./King_Black.png", //9
    "./King_White.png", //10
    "./Knight_Black.png", //11
    "./Knight_White.png" //12
     ];

var images = [];

var allLoaded = false;
     
var imgCount = 0;


loadImages();

function draw(){
    if (allLoaded){
        drawBoard();
        drawPawns();
        gen960();
        drawPosition();
        printPlacement();
    }else draw();
}

function loadImages(){
const onImageLoad = function(){ imgCount++; } // onload event
// loads an image an puts it on the image array
const loadImage = function(url){
    images.push(new Image());
    images[images.length-1].src = url
    images[images.length-1].onload = onImageLoad;
}
const waitForLoaded = function(){
    if(imgCount === images.length){
        allLoaded = true;   // flag that the image have loaded
        console.log("allLoaded = true");
        draw();
    }else{
        // display  the progress here
        console.log("loading...");
        setTimeout(waitForLoaded,100); // try again in 100ms
    }
}
// create the images and set the URLS
imgNames.forEach(loadImage);
setTimeout(waitForLoaded,100);  // monitor the image loading
}


function gen960(){
    placementArray = ["x", "x", "x", "x", "x", "x", "x", "x"];
    placementArray[getRandomInt(4)*2]="BB";
    placementArray[getRandomInt(4)*2+1]="WB";
    placementArray[getPieceTarget(getRandomInt(6))]="Q";
    placementArray[getPieceTarget(getRandomInt(5))]="K1";
    placementArray[getPieceTarget(getRandomInt(4))]="K2";
    placementArray[getPieceTarget(0)]="R1";
    placementArray[getPieceTarget(0)]="K";
    placementArray[getPieceTarget(0)]="R2";
}


function printPlacement(){
    var output = " ";
    for (var i = 0; i<8; i++){
    output=output.concat(placementArray[i]);
    output=output.concat("--");
    }
    console.log(output);
}

function drawPawns(){
    var increment = 0;
    for (var i = 0; i<8; i++){
        context.drawImage(images[2], increment, vertWhitePawn, 50, 50);
        increment = increment+50;
    }
    increment = 0;
    for (var i = 0; i<8; i++){
        context.drawImage(images[1], increment, vertBlackPawn, 50, 50);
        increment = increment+50;
    }
    
    

}



function drawBoard(){
    context.drawImage(images[0], 400, 224, 1060, 1060, 0, 0, 400, 400);
}

function getPieceTarget(decrement){
    var target;
    for(var i = 0; i<8; i++){
        if (decrement==0 && placementArray[i]=="x"){
            target=i;
            return target;
        }
        if (placementArray[i]=="x"){
            decrement--;
        }
    }
    return target;
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

function drawPosition(){
for (var k = 0; k<8; k++){
    var string = placementArray[k];
    var bias = 50;
switch (string){
    case "WB":
        context.drawImage(images[4], bias*k, vertBlackPiece, 50, 50);
        context.drawImage(images[3], bias*k, vertWhitePiece, 50, 50);
        break;
    case "BB":
        context.drawImage(images[4], bias*k, vertBlackPiece, 50, 50);
        context.drawImage(images[3], bias*k, vertWhitePiece, 50, 50);
        break;
    case "Q":
        context.drawImage(images[6], bias*k, vertWhitePiece, 50, 50);
        context.drawImage(images[5], bias*k, vertBlackPiece, 50,50);
        break;
    case "K":
        context.drawImage(images[10], bias*k, vertWhitePiece, 50, 50);
        context.drawImage(images[9], bias*k, vertBlackPiece, 50,50);

        break;
    case "K1":
        context.drawImage(images[12], bias*k, vertWhitePiece, 50, 50);
        context.drawImage(images[11], bias*k, vertBlackPiece, 50,50);

        break;
    case "K2":
        context.drawImage(images[12], bias*k, vertWhitePiece, 50, 50);
        context.drawImage(images[11], bias*k, vertBlackPiece, 50,50);
        break;
    case "R1":
        context.drawImage(images[8], bias*k, vertWhitePiece, 50, 50);
        context.drawImage(images[7], bias*k, vertBlackPiece, 50,50);
        break;
    case "R2":
        context.drawImage(images[8], bias*k, vertWhitePiece, 50, 50);
        context.drawImage(images[7], bias*k, vertBlackPiece, 50,50);
        break;
}
}
}
const switcher = document.querySelector('.flip');
switcher.addEventListener('click', function() {flipBoard()});
const switcher2 = document.querySelector('.btn2');
switcher2.addEventListener('click', function() {draw()});

function flipBoard(){
    if (flip){
        vertBlackPawn = 50;
        vertWhitePawn = 300;
        vertWhitePiece = 350;
        vertBlackPiece = 0;
        flip=false;
    }else {
        vertBlackPawn = 300;
        vertWhitePawn = 50;
        vertWhitePiece=0;
        vertBlackPiece = 350;
        flip=true;
    }
    drawPawns();
    drawPosition();
}
/*
function draw2(){
    drawPawns();
    drawPosition();

}



const switcher = document.querySelector('.btn');

switcher.addEventListener('click', function() {
    document.body.classList.toggle('light-theme');

    var className = document.body.className;
    if(className=="light-theme"){
        this.textContent = "Dark";
    } else{
        this.textContent = "Light";
    }   
});
const switcher2 = document.querySelector('.btn2');

switcher2.addEventListener('click', function() {

    if(document.body.classList=="reverse-wave"){

    document.body.classList.toggle('vapor-wave');
    }
    else {
        document.body.classList.toggle('reverse-wave');
    }

    var className = document.body.className;
    if(className=="vapor-wave"){
        this.textContent = "Vapor";
    } 
    else {
        this.textContent = "Reverse";
    }   
});


*/

/*
const chessBoard = new Image();
chessBoard.src='./Chess_Board.jpg';
chessBoard.onload = () => {context.drawImage(chessBoard, 400, 224, 1060, 1060, 0, 0, 400, 400)};

var piece = new Image();
var piece2 = new Image();


piece2.src = './Bishop_Black.png';
piece2.onload = () => {context.drawImage(piece2, 0,0, 50, 50)};


piece.src = './Bishop_White.png';
piece.onload = () => {context.drawImage(piece, 0,0, 50, 50)};
*/

/*
var canvas = document.getElementById("myCanvas");
var draw = canvas.getContext("2d");
draw.fillRect(0,0, 150, 75);
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
ctx.moveTo(0, 0);
ctx.lineTo(200, 100);
ctx.stroke();
*/

/*

loadImages([{
    name: "chessBoard", 
    url: "Chess_Board.jpg"
},{    
    name: "rookWhite",
    url: "Rook_White.png"
},{
    name: "rookBlack",
    url: "Rook_Black.png"
},{
    name: "pawnWhite",
    url: "Pawn_White.png"
},{
    name: "pawnBlack",
    url: "Pawn_Black.png"
},{
    name: "bishopWhite",
    url: "Bishop_White.png"
},{
    name: "bishopBlack",
    url: "Bishop_Black.png"
},{
    name: "knightWhite",
    url: "Knight_White.png"
},{
    name: "knightBlack",
    url: "Knight_Black.png"
},{
    name: "kingWhite",
    url: "King_White.png"
},{
    name: "kingBlack",
    url: "King_Black.png"
},{
    name: "queenWhite",
    url: "Queen_White.png"
},{
    name: "queenBlack",
    url: "Queen_Black.png"
    }]);

    */




    /*
const switcher = document.querySelector('.btn');
var onOff= true;
switcher.addEventListener('click', function()
{
    onOff=false;
    if (onOff){

        document.body.classList.toggle('vapor-wave');
    
    }
    else { document.body.classList.toggle('reverse-wave');
            onOff=true;}
}
);
*/


