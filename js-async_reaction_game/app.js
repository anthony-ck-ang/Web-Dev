//Define variables and Reference DOM elements

const spinner = document.querySelector('.spinner p'); //A reference to our spinner, so we can animate it.

const spinnerContainer = document.querySelector('.spinner'); //A reference to the <div> element that contains the spinner, used for showing and hiding it.

let rotateCount = 0; //A rotate count — how much we want to show the spinner rotated on each frame of the animation.

let startTime = null; //A null start time — will be populated with a start time when the spinner starts spinning.

let rAF; //An uninitialized variable to later store the requestAnimationFrame() call that animates the spinner.

const btn = document.querySelector('button'); //A reference to the Start button.

const result = document.querySelector('.result'); //A reference to the results paragraph.


result.style.display = 'none';
spinnerContainer.style.display ='none';

btn.addEventListener('click', start);


//Generate a random timeout interval
function random(min,max) {
  var num = Math.floor(Math.random()*(max-min)) + min;
  return num;
}

//Draw to animates the spinner
function draw(timestamp) {
  if(!startTime) {
   startTime = timestamp;
  }

  rotateCount = (timestamp - startTime) / 3;
 
  if(rotateCount > 359) {
    rotateCount %= 360;
  }

  spinner.style.transform = 'rotate(' + rotateCount + 'deg)';
  rAF = requestAnimationFrame(draw); //Ref animate frame and animate the spinner
}

//Restart Game
function reset(){
    btn.style.display = 'block';
    result.textContent = '';
    result.style.display = 'none';
}

function start(){
    draw();
    spinnerContainer.style.display = 'block'; // the spinner is shown
    btn.style.display = 'none';
    
    //players are made to wait a random amount of time before they are then asked to press their button
    setTimeout(setEndgame, random(5000,10000));
}

function setEndgame(){
    //Cancel animation and hide spinner
    cancelAnimationFrame(rAF);
    spinnerContainer.style.display = 'none';
    
    //Show to tell players that they can now press their button to win.
    result.style.display = 'block';
    result.textContent = 'PLAYERS GO!!';
    
    //keydown event
    document.addEventListener('keydown', keyDownHandler);
    
    function keyDownHandler(event){
        console.log(event.key);
        
        if(event.key === 'a'){
            result.textContent = 'Player 1 won!!';
        }else if (event.key === 'l'){
            result.textContent = 'Player 2 won!!';
        }else {
            result.textContent = 'Invalid Key! Restarting...'
        }
        
        //No more keyboard input is possible to mess up the final game result
        document.removeEventListener('keydown', keyDownHandler);
        
        //Auto resets the game back to its original state after 5 seconds
        setTimeout(reset, 5000);
    }
}





