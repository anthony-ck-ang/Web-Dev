//const link = document.querySelector('a');
//
//link.textContent = 'Mozilla Developer Network';
//link.href = 'https://developer.mozilla.org';
//
////ref
//const sec = document.querySelector("section");
//const para = document.createElement("p");
//para.textContent = "Raaaawwwrrr enjoy!";
//
//sec.appendChild(para);
//
//const txt = document.createTextNode("---Web Development---");
//const linkPara = document.querySelector('.para1');
//linkPara.appendChild(txt);
//
////sec.appendChild(linkPara);
//
////sec.removeChild(linkPara);
//
//linkPara.remove();
//
////manipulate styles
////para.style.color = "white";
////para.style.backgroundColor = "black";
////para.style.padding = "10px"; //add space inside all around
////para.style.width = "250px"; // fix width
////para.style.textAlign = "center";
//
//para.setAttribute("class", "highlight");

//------------------------------------------------------------------

//const div = document.querySelector("div");
//
//window.onresize = () =>{
//    
////grab w/h of viewport 
//let winWidth = window.innerWidth;
//let winHeight = window.innerHeight;
//
//div.style.width = winWidth + 'px';
//div.style.height = winHeight + 'px';
//}

//------------------------------------------------------------------

//ref DOM elements
const ul = document.querySelector("ul");
const input = document.getElementById("item");
const button = document.querySelector(".btn1");


button.addEventListener("click", () =>{
   let inputValue = input.value;
    
    input.value = "";
    
    let li = document.createElement("li");
    let span = document.createElement("span");
    let delButton = document.createElement("button");
      
    span.textContent = inputValue;
    delButton.textContent = 'Delete';
    
    li.appendChild(span);
    li.appendChild(delButton);
    
    ul.appendChild(li);
    
    delButton.addEventListener("click", () =>{
//        ul.removeChild(li);
       li.remove(); 
    });
    
    input.focus();
});






















