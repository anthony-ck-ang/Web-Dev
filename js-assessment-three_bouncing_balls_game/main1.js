// define variable for ball count and paragraph
let para = document.querySelector('p');
let count = 0;

//https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Drawing_graphics


// setup canvas
let canvas = document.querySelector('canvas');
//get a special reference to the drawing area called a context
let ctx = canvas.getContext('2d'); 

//set canvas w/h === browser w/h
let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

// function to generate random number

function random(min,max) {
  let num = Math.floor(Math.random()*(max-min)) + min;
  return num;
};

//-----------------------------------------------------------------------------------

function Shape(x, y, velX, velY, exists){
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.exists = exists;
}

function Ball(x, y, velX, velY, exists, color, size){
    Shape.call(this, x, y, velX, velY, exists);
    this.color = color;
    this.size =size;
}

//Ball inherit
Ball.prototype = Object.create(Shape.prototype);
Ball.prototype.constructor = Ball;
console.log(Ball.prototype);


//-----------------------------------------------------------------------------------

function EvilCircle(x, y, exists){
    Shape.call(this, x, y, 40, 0, exists);
    this.color = 'white';
    this.size = 20;
}

EvilCircle.prototype = Object.create(Shape.prototype);
EvilCircle.prototype.constructor = EvilCircle;
console.log(EvilCircle.prototype);


EvilCircle.prototype.draw = function(){
    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 6;
    ctx.arc(this.x, this.y, this.size, 0, 2*Math.PI);
    ctx.stroke();
};

EvilCircle.prototype.checkBounds = function(){
    //if the x coordinate is greater than the width of the canvas (the ec is going off the right edge, move it left by size amount
    if ((this.x + this.size) >= width) {
    this.x -= this.size;
  }
    
  //if the x coordinate is smaller than 0 (the ec is going off the left edge).
  if ((this.x - this.size) <= 0) {
    this.x += this.size;
  }
    
  //if the y coordinate is greater than the height of the canvas (the ec is going off the top edge).
  if ((this.y + this.size) >= height) {
    this.y -= this.size;
  }
    
  //if the y coordinate is smaller than 0 (the ec is going off the bottom edge).
  if ((this.y - this.size) <= 0) {
    this.y += this.size;
  }
    
};

//ArrowUp
//ArrowDown
//ArrowRight
//ArrowLeft
//onKeyDown event
//https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code
//https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode#Browser_compatibility

EvilCircle.prototype.setControls = function(){
    //ref 'this' (ec obj) in this scope
    let _this = this; 
    window.onkeydown = function(e) {
        if(e.code === 'ArrowLeft'){
            _this.x -= _this.velX;
        }else if(e.code === 'ArrowRight'){
            _this.x += _this.velX;
        }
    };
};

//EvilCircle.prototype.setControls = function(){
//    var _this = this;
//    window.onkeydown = function(e) {
//        if(e.code === 'KeyA'){
//            _this.x -= _this.velX;
//        }else if(e.code === 'KeyD'){
//            _this.x += _this.velX;
//        }else if(e.code === 87){
//            _this.y -= this.velY;
//        }else if (e.keyCode === 83){
//            _this.y += _this.velY;
//        }
//    };
//};

EvilCircle.prototype.collisionDetect = function(){
        for(let j = 0; j < balls.length; j++){
            //Do a test to see if the ball that is being checked, exists?
            if(balls[j].exists){
                //Common algorithm to check the collision of two circles.
                //Checking whether any of the two circle's areas overlap.
                let dx = this.x - balls[j].x;
                let dy = this.y - balls[j].y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                
                //If collide, the inside code will run
                if(distance < this.size + balls[j].size){
                    
                    balls[j].exists = false; //set exist prop as false
                    count--; //reduce count
                    para.textContent = 'Ball count: ' + count; // set text
                }
            }
        }
};


//----------------------------------------------------------------------------

//1. Draw a ball
Ball.prototype.draw = function(){
    ctx.beginPath();
    ctx.fillStyle = this.color;
    //x, y posiiton of arc's center
    //radius of arc
    ctx.arc(this.x, this.y, this.size, 0, 2*Math.PI);
    ctx.fill(); //finish drawing the path
}

//2. Update ball's location
Ball.prototype.update = function(){
// First four parts of the function checks whether the ball has reached the edge of the canvas.
// Size of ball is included as x/y coordinates, are in the center of the ball, but we want the edge of the ball to bounce off the perimeter.
    
  //If the x coordinate is greater than the width of the canvas (the ball is going off the right edge, reverse (-) the polarity of relevant velocity.
  if ((this.x + this.size) >= width) {
    this.velX = -(this.velX);
  }
    
  //If the x coordinate is smaller than 0 (the ball is going off the left edge).
  if ((this.x - this.size) <= 0) {
    this.velX = -(this.velX);
  }
    
  //If the y coordinate is greater than the height of the canvas (the ball is going off the top edge).
  if ((this.y + this.size) >= height) {
    this.velY = -(this.velY);
  }
    
  //If the y coordinate is smaller than 0 (the ball is going off the bottom edge).
  if ((this.y - this.size) <= 0) {
    this.velY = -(this.velY);
  }
    
  //Add the velX value to the x coordinate, and the velY value to the y coordinate — the ball is in effect moved each time this method is called.
  this.x += this.velX;
  this.y += this.velY;
}

//3. Create balls

//Create an array to store balls then populate.
let balls = [];
while(balls.length < 25){
    let size = random(10,20);
    
    let ball = new Ball(
    // Ball's position is always drawn at least one ball width (size)
    // away from the edge of the canvas, to avoid drawing errors
        random(0 + size, width - size),
        random(0 + size, height - size),
        random(-7, 7),
        random(-7, 7),
        true,
        'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')',
        size
    );
    
    balls.push(ball);
    count++;
    para.textContent = 'Ball Count: ' + count;
};

//4. Collision Detection
Ball.prototype.collisionDetection = function(){
    
    for(let j=0; j < balls.length; j++){
        //check whether the current ball being looped through is the same ball as the one we are currently checking
        //don't want to check whether a ball has collided with itself
        
        if(!(this === balls[j])){
            
            //common algorithm to check the collision of two circles.
            //checking whether any of the two circle's areas overlap.
            
            let dx = this.x - balls[j].x;
            let dy = this.y - balls[j].y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            
            //if collide -> inside code will run
            if(distance < this.size + balls[j].size){
                //change color
                balls[j].color = this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) +')';
            }
        }
    }
};

//------------------------------------------------------------------------------
    
let ec = new EvilCircle(random(0, width), random(0, height), true);
ec.setControls();

//------------------------------------------------------------------------------

//5. Loop to Animate balls
function loop(){
    
    //Set a fill color using the canvas' fillStyle property, then drawing a rectangle that covers the entire area of the canvas with thefillRect method
    ctx.fillStyle = 'rgba(0, 0, 0, 0.25)'; //semi-transparent black
    //The first two parameters are the coordinates of the rectangle's top left hand corner; the last two are the width and height you want the rectangle drawn.
    ctx.fillRect(0, 0, width, height);
    
    //EvilCircle
    ec.draw();
    ec.checkBounds();
    ec.collisionDetect();
        
    for(let i = 0; i < balls.length; i++){
        let currentBall = balls[i];
        
        //if 'exist' prop is true for currentball, setup current ball will be 'drawn', else will made gone by ec
        if(currentBall.exists){
            currentBall.draw();
            currentBall.update();
            currentBall.collisionDetection();
        }
    }
    

    //Allow you to run functions repeatedly, several times a second.
    //Takes one parameter — the name of the function you want to run for each frame.
    //Animation loop.
    //To update the information in the program and then render the resulting view on each frame of the animation.
    requestAnimationFrame(loop); //recusive
}

    loop(); //invoke to start animation

// ------------------------------------------

//let testBall = new Ball(50, 100, 4, 4, 'blue', 10);
//console.log(testBall);
//testBall.draw();

