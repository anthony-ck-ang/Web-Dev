//1. XMLHttpRequest
//Good cross-browser support

//let chooseVerse = document.querySelector('select');
//let displayPoem = document.querySelector('pre');
//
//chooseVerse.addEventListener('click', () =>{
//   let verse = chooseVerse.value;
//    updateDisplay(verse);
//});
//
//function updateDisplay(verse){
//    verse = verse.replace(" ", ""); //replace space to no space
//    verse = verse.toLowerCase();
//    let url = "./rsc/" + verse + ".txt";
//    
//    let req = new XMLHttpRequest();
//    req.open("GET", url)
//    req.responseType = "text";
//
//    req.onload = () =>{
//        displayPoem.textContent = req.response;
//    }
//    
//    req.send();
//}
//
//updateDisplay("Verse 1");
//chooseVerse.value = "Verse 1";

//-------------------------------------------------------------------
//https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch

//2. Fetch
//Uses Promises and supported well except IE

//let chooseVerse = document.querySelector('select');
//let displayPoem = document.querySelector('pre');
//
//chooseVerse.addEventListener('click', () =>{
//   let verse = chooseVerse.value;
//    updateDisplay(verse);
//});
//
//function updateDisplay(verse){
//    verse = verse.replace(" ", ""); //replace space to no space
//    verse = verse.toLowerCase();
//    let url = "./rsc/" + verse + ".txt";
//    
//    fetch(url)
//        .then((res) =>{
//        //text() -> return res as raw text
//        return res.text();        
//        }).then((txt) =>{
//            displayPoem.textContent = txt;
//        });
//}
//
//updateDisplay("Verse 1");
//chooseVerse.value = "Verse 1";

//-------------------------------------------------------------------
//A more complex example

//Create a ref that store products 'database'
let products;

//Use fetch -> resolved -> return response + format as a JSON obj
fetch("./products.json")
    .then((res) =>{
    console.log(res);
    return res.json();
})
    .then((json)=>{
    products = json; //Save fetched data
    console.log(products);
    
    initialize(); // Run initialize
})
    .catch((err) =>{
    console.log(err.message);
});

//Ref UI elements
    let selectedCat = document.querySelector("#category");
    let srchInput = document.querySelector("#searchTerm");
    let srchBtn = document.querySelector("button");
    let main = document.querySelector("main");

    let catGrp; //Contains category filtered results
    let finalGrp //Contains final pdts to be displayed including search filter
    
    let previousCat;
    let previousSrch;

function initialize(){
    
    //Record the previous cat and srch value
    previousCat = selectedCat.value;
    //no search yet
    previousSrch = " ";

    //To start, set finalGrp to entire pdt 'DB'
    finalGrp = products; //pass by ref
    console.log(finalGrp);
    //1. Display all products initially
    updateDisplay();
    
    //Re-ref them both to an empty array obj
    catGrp = [];
    finalGrp = [];
    
    console.log(products);
    console.log(finalGrp);
    
//    srchBtn.addEventListener("click", selectCategory);
    srchBtn.onclick = selectCategory;
    selectedCat.onchange = selectCategory;
                                
}

function selectCategory(e) {
    e.preventDefault(); //stop form from submitting
    
    //reset to clear previous search
    catGrp = [];
    finalGrp = [];
    
    //just return if it is the same
    if(selectedCat.value === previousCat && srchInput.value.trim() === previousSrch){
        return;
    }else {
        
        // update the record of last category and search term
        previousCat = selectedCat.value;
        console.log(previousCat)
        
        previousSrch = srchInput.value.trim();
        
        //Cat filter 1
        if(selectedCat.value === 'All'){
            catGrp = products; //all products
            selectProducts(); //invoke for search filter 2
            
        }else {
            let lowerCaseProductType = selectedCat.value.toLowerCase();
            
            //loop through all products and compare
            for(let i=0 ; i< products.length; i++){
                if(products[i].type === lowerCaseProductType){
                    catGrp.push(products[i]); // if match push to catGrp []
                }
            }
            
            selectProducts();
        }
    }
}

//Further filters products with search term
  function selectProducts() {
      
    //no search input
    if(srchInput.value.trim() === "") {
      finalGrp = catGrp;
        
      updateDisplay();
        
    }else {
          let lowerCaseSrchInput = srchInput.value.trim().toLowerCase();
          // For each product in categoryGroup, see if the search input exist inside the product name
          // if exist, push into the empty finalGrp []
          for(let i = 0; i < catGrp.length ; i++) {
            if(catGrp[i].name.indexOf(lowerCaseSrchInput) !== -1) { 
              finalGrp.push(catGrp[i]);
            }
          }

      // run updateDisplay() after this second round of filtering has been done
      updateDisplay();
    }
}

function updateDisplay(){
    //remove previous contents in main
    while(main.firstChild){
        main.removeChild(main.firstChild);
    }
    
    //if no pdt match srch term
    if(finalGrp.length === 0){
        let para = document.createElement("p");
        para.textContent = "No results to display!";
        main.appendChild(para);
        
    } else {
        //for each pdt -> fetch it's img
        for(let i=0; i < finalGrp.length; i++){
            fetchBlob(finalGrp[i]);
        }
    }
    
}

function fetchBlob(pdt){
    let url = "rsc/images/" + pdt.image;
    //console.log(url);
    
    fetch(url).then((res) =>{
        return res.blob(); //return blob to browser
    }).then((blob) =>{
        let objURL = URL.createObjectURL(blob); //returns a url that points to blob obj in browser
        
        showProduct(objURL, pdt);// show in DOM
    });
}

function showProduct(objURL, pdt){
    //create element
    let section = document.createElement('section');
    let heading = document.createElement('h2');
    let para = document.createElement('p');
    let image = document.createElement('img');
    
    //console.log(pdt.type)
    section.setAttribute("class", pdt.type); // set class attribute to section
    
    //set h2 pdt name
    heading.textContent = pdt.name.replace(pdt.name.charAt(0), pdt.name.charAt(0).toUpperCase()); 
    //console.log(heading);
    
    para.textContent = "$" + pdt.price.toFixed(2);  //2 dec
    
    image.src = objURL; //*set img src
    //console.log(image);
    image.alt = pdt.name;
    
    //add to DOM
    section.appendChild(heading);
    section.appendChild(para);
    section.appendChild(image);
    
    main.appendChild(section);
   
}
