var displayedImage = document.querySelector('.displayed-img');
var thumbBar = document.querySelector('.thumb-bar');

var btn = document.querySelector('button');
var overlay = document.querySelector('.overlay');

let imgSrc;
let btn_attri;
/* Looping through images */
for(let i=1; i<6; i++){
    var newImg = document.createElement('img');
    newImg.setAttribute('src', './images/pic' + i + '.jpg');
    
    //console.log(newImg);
    thumbBar.appendChild(newImg);
    
    
    newImg.addEventListener('click', function(e){
        
        //get img src from the direct ele
        imgSrc = e.target.getAttribute('src');
        //console.log(imgSrc);
        
        setDisplayImg(imgSrc);
    })
}

function setDisplayImg(src){
    displayedImage.setAttribute('src', src);
}  

/* Wiring up the Darken/Lighten button */
btn.onclick = function(e){
    let eBtn = e.target;
    //console.log(e.target);
    console.log(overlay);
    
    if(eBtn.getAttribute('class') === 'dark'){
        eBtn.setAttribute('class', 'light');
        eBtn.textContent = 'Lighten';
        overlay.style.backgroundColor = 'rgba(0,0,0,0.5)';   
    }else if (eBtn.getAttribute('class') === 'light'){
        eBtn.setAttribute('class', 'dark');
        console.log(eBtn);
        eBtn.textContent = 'Darken';
        overlay.style.backgroundColor = 'rgba(0,0,0,0)';
    }
}