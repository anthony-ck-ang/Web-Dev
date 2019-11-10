// setup canvas

//https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Drawing_graphics

var canvas = document.querySelector('canvas');
//get a special reference to the drawing area called a context
var ctx = canvas.getContext('2d'); 

//set canvas w/h === browser w/h
var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;

// function to generate random number

function random(min,max) {
  var num = Math.floor(Math.random()*(max-min)) + min;
  return num;
}

//Many balls thus represent with obj
//x, y coordinates
//hori and verti velocity
//ball color
//ball size in radius
function Ball(x, y, velX, velY, color, size){
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.size =size;
}

//Draw a ball
Ball.prototype.draw = function(){
    ctx.beginPath();
    ctx.fillStyle = this.color;
    //x, y posiiton of arc's center
    //radius of arc
    ctx.arc(this.x, this.y, this.size, 0, 2*Math.PI);
    ctx.fill(); //finish drawing the path
}

//Update ball location
Ball.prototype.update = function(){
 // first four parts of the function checks whether the ball has reached the edge of the canvas
//size of ball is included as x/y coordinates are in the center of the ball, but we want the edge of the ball to bounce off the perimeter
    
  //if the x coordinate is greater than the width of the canvas (the ball is going off the right edge, reverse (-) the polarity of relevant velocity
  if ((this.x + this.size) >= width) {
    this.velX = -(this.velX);
  }
    
  //if the x coordinate is smaller than 0 (the ball is going off the left edge).
  if ((this.x - this.size) <= 0) {
    this.velX = -(this.velX);
  }
    
  //if the y coordinate is greater than the height of the canvas (the ball is going off the top edge).
  if ((this.y + this.size) >= height) {
    this.velY = -(this.velY);
  }
    
  //if the y coordinate is smaller than 0 (the ball is going off the bottom edge).
  if ((this.y - this.size) <= 0) {
    this.velY = -(this.velY);
  }
    
  //add the velX value to the x coordinate, and the velY value to the y coordinate — the ball is in effect moved each time this method is called.
  this.x += this.velX;
  this.y += this.velY;
}

//Animate balls
//create an array to store balls then populate
let balls = [];
while(balls.length < 25){
    let size = random(10,20);
    let ball = new Ball(
    // ball position always drawn at least one ball width
    // away from the edge of the canvas, to avoid drawing errors
        random(0 + size, width - size),
        random(0 + size, height - size),
        random(-7, 7),
        random(-7, 7),
        'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')',
        size
    );
    
    balls.push(ball);  
}

//collision detection
Ball.prototype.collisionDetection = function(){
    for(let j=0; j < balls.length; j++){
        //check whether the current ball being looped through is the same ball as the one we are currently checking
        //don't want to check whether a ball has collided with itself
        if(!(this === balls[j])){
            //common algorithm to check the collision of two circles.
            //checking whether any of the two circle's areas overlap.
            var dx = this.x - balls[j].x;
            var dy = this.y - balls[j].y;
            var distance = Math.sqrt(dx * dx + dy * dy);
            //if collide -> inside code will run
            if(distance < this.size + balls[j].size){
                //change color
                balls[j].color = this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) +')';
            }
        }
    }
}

//set a fill color using the canvas' fillStyle property, then drawing a rectangle that covers the entire area of the canvas with thefillRect method
function loop(){
    ctx.fillStyle = 'rgba(0, 0, 0, 0.25)'; //semi-transparent black
    //first two parameters are the coordinates of the rectangle's top left hand corner; the last two are the width and height you want the rectangle drawn at
    ctx.fillRect(0, 0, width, height);
    
    for(let i=0; i < balls.length; i++){
        let currentBall = balls[i];
        currentBall.draw();
        currentBall.update();
        currentBall.collisionDetection();
    }
    
    //allow you to run functions repeatedly, several times a second
    //takes one parameter — the name of the function you want to run for each frame.
    //Animation loop
    //to update the information in the program and then render the resulting view on each frame of the animation
    requestAnimationFrame(loop); //recusive
}

loop(); //invoke to start animation


//let testBall = new Ball(50, 100, 4, 4, 'blue', 10);
//console.log(testBall);
//testBall.draw();

// ------------------------------------------
