// get the canvas tag using .getElementById() method
const myCanvas = document.getElementById("my-canvas");

// context has all the methods for drawing things
const ctx = myCanvas.getContext("2d");

// global variable for the score 
let score = 0;
let isOver = false;

function drawBackground(){
        ctx.fillStyle = "green";
        // 1000 is the width of the canvas I get from the HTML
        // 500 is the height form the canvas which I also get form HTML
        ctx.fillRect(0, 0, 1000, 500);

        // add some text
        ctx.fillStyle = "white";
        ctx.font = "30px Arial";
        ctx.fillText(`Score: ${score}`, 800, 50);
}
// drawBackground();

const fireballImg = new Image();  // javascript
const supermanImg = new Image();  // instace o f the constructor
const landscape = new Image();   // inheretit
// "src" has has to point as the image is used in HTML file
// one dot like is using an the HTML
fireballImg.src = "./images/fireball.png"; // even if the fire sice a circule is a rectagule
supermanImg.src = "./images/superman.png";
landscape.src = "./images/landscape.png";

let fireballX = 800;
let fireballY = 200;

let supermanX = 0;
let supermanY = 200;

let landscapeX = 0;
let landscapeY = 250;



// fireballImg.onload = function(){
//     // ctx.drawImage(whichImage, x, y, width, height);
//     ctx.drawImage(fireballImg, fireballX, fireballY, 50, 50);
// }
// onload in case we hava a static image.... never be delete 
// supermanImg.onload = function(){
//     // ctx.drawImage(whichImage, x, y, width, height);
//     ctx.drawImage(supermanImg, supermanX, supermanY, 150, 150);
// }

// move the superman!

document.onkeydown = function(event){
    // console.log(event.keyCode);
    switch(event.keyCode){
        case 37:// left
            supermanX -= 10;
            break;
        case 39: // right
            supermanX += 10;
            break;
        case 38: // up
            supermanY -= 10;
            break; 
        case 40: // down
            supermanY += 10;
            break;
    }

}

// animate the canvas   delete - draw all the times

function drawingLoop(){
    // erase the whole canvas before drawing everything again

    //            x  y  width height
    //            ^  ^    ^    ^
    //            |  |    |    |
    ctx.clearRect(0, 0, 1000, 500);

    drawBackground();

    // start moving fireball by changing it X coordinate in every loop call
    fireballX -= 5; 

    // when the fireball disappears from the canvas
    if(fireballX < -50){ // have to be outside of the canvas
        // set its x again to fireballX=1000 create new fireball
        fireballX = 1000;
        // and for each ball pick random Y in range 0 to 500 (which is height of the canvas)
        fireballY = Math.floor(Math.random() * 450);
    }

    drawEverything() ;
    if (isOver === false){  // this control no to execute this animation any more
        // re-draw the whole sceen
        requestAnimationFrame(function(){   // requestAnimationonFrame is like setinterval
        // sets up a recursive loop (function calls itself multiple times)
        drawingLoop();
    });
    }
}


function drawEverything(){ // no to draw this everytime 

        // ctx.drawImage(whichImage, x, y, width, height);
        ctx.drawImage(fireballImg, fireballX, fireballY, 50, 50);
        // ctx.drawImage(whichImage, x, y, width, height);
        ctx.drawImage(supermanImg, supermanX, supermanY, 150, 150);
        ctx.drawImage(landscape, landscapeX, landscapeY, 1000, 250);
 
        if(checkCollision(supermanX,supermanY,fireballX,fireballY)){
              //  console.log("CRASHED !!!!!");
              gameOver();
        }
        if (fireballX === 0 )
        {
            score ++;
        }


}

function checkCollision(obj1X, obj1Y, obj2X, obj2Y){  // compare two objects
 // supermany + superman - height >= firabally

    return obj1Y + 150 -50 >= obj2Y 
     // supermany <= 
     && obj1Y <= obj2Y + 50  
     // supermanx + supermanwidth >= firaballX
     && obj1X + 150 -50 >= obj2X
     // supermanX <= firaballX + fireballwidth
     && obj1X <= obj2X + 50


}

function gameOver(){
    // we need to clear the canvas  to delete superman and fireball
    ctx.clearRect (0,0,1000,500);
    // draw just the backgroud 
    drawBackground();
    // create another instace to draw a defeted superman
    const tiredSupermanImag = new Image();
    // point to the source src where is the image
    tiredSupermanImag.src = "./images/defeated.png";
    // load the image
    tiredSupermanImag.onload = function (){
        ctx.drawImage(tiredSupermanImag , 480 , 300 , 150,150);
    }

    // change the value of the isOver to true
    isOver = true;
    ctx.font= "bold 70px Arial";
    ctx.fillStyle = "red";
    ctx.fillText("Game Over", 400 , 225);

}

// call drawingLoop() to start looping (after this point it will recursively call itself)
drawingLoop();
