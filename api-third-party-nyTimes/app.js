      // Defining a baseURL and key to as part of the request URL

      let baseURL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';
      let key = 'sHSEaRDxZGxL8pJQ2m3oKS6TDRcEOQtU';
      let url;

      // Grab references to all the DOM elements to be manipulated

      let searchTerm = document.querySelector('.search');
      let startDate = document.querySelector('.start-date');
      let endDate = document.querySelector('.end-date');
      let searchForm = document.querySelector('form');
      let submitBtn = document.querySelector('.submit');

      let nextBtn = document.querySelector('.next');
      let previousBtn = document.querySelector('.prev');

      let section = document.querySelector('section');
      let nav = document.querySelector('nav');

      // Hide the "Previous"/"Next" navigation in the beginning
      nav.style.display = 'none';

      // Define the initial page number and status of the navigation
      let pageNumber = 0;
      let displayNav = false;


        // Event listeners to control the functionality

        searchForm.addEventListener("submit", submitSearch);
    
        // Wiring up the pagination buttons

        //New value included in the page URL parameter. NYTimes API only returns 10 results at a time — if more than 10 results are available, it will return the first 10 (0-9) if the page URL parameter is set to 0 (or not included at all — 0 is the default value), the next 10 (10-19) if it is set to 1, and so on.

        nextBtn.addEventListener('click', nextPage);
        previousBtn.addEventListener('click', previousPage);
        
        //Increment the pageNumber variable, then run the fetchResults() function again to display the next page's results.
        function nextPage(e) {
          pageNumber++;
          fetchResults(e);
        };

        function previousPage(e) {
          if(pageNumber > 0) {
            pageNumber--;
          } else {
            return;
          }
          fetchResults(e);
        };

        function submitSearch(e) {
          pageNumber = 0; //sets the page number back to 0 to begin with
          fetchResults(e);
        }

        function fetchResults(e) {
          // Use preventDefault() to stop the form submitting
          e.preventDefault();

          //https://developer.nytimes.com/docs/articlesearch-product/1/overview
          // Assemble the full URL
          // pageNumber is appended in the url
          url = baseURL + '?api-key=' + key + '&page=' + pageNumber + '&q=' + searchTerm.value + '&fq=document_type:("article")';

          if(startDate.value !== '') {
            url += '&begin_date=' + startDate.value;
          };

          if(endDate.value !== '') {
            url += '&end_date=' + endDate.value;
          };
            
             console.log(url);
            
            fetch(url).then((res) =>{
                return res.json();
            }).then((json) =>{
                console.log(json);
                displayResults(json);
            }).catch((err) =>{
                console.log(err);
            });
        }

function displayResults(json) {
    //Common pattern to delete DOM element in section
  while (section.firstChild) {
      section.removeChild(section.firstChild);
  }
    
 //Array of obj
  let articles = json.response.docs; 

  if(articles.length === 10) {
    nav.style.display = 'block'; //display nav
  } else {
    nav.style.display = 'none';
  }

  if(articles.length === 0) {
    let para = document.createElement('p');
    para.textContent = 'No results returned.'
    section.appendChild(para);
  } else {
    
    //for each article
    for(let i = 0; i < articles.length; i++) {
        
    //Create all elements to display each news story
      let article = document.createElement('article');
      let heading = document.createElement('h2');
      let link = document.createElement('a');
      let img = document.createElement('img');
      let para1 = document.createElement('p');
      let para2 = document.createElement('p');
      let clearfix = document.createElement('div');

      let current = articles[i];
      console.log(current);
    
    //Grab data from each obj (article) and set it to respective DOM elements
      link.href = current.web_url;
      link.textContent = current.headline.main;
        
      para1.textContent = current.snippet;
      para2.textContent = 'Keywords: ';
    
    //Loop through the array of keywords and add keyword to each created span element and append to p tag
      for(let j = 0; j < current.keywords.length; j++) {
        let span = document.createElement('span');
        span.textContent += current.keywords[j].value + ' ';
        para2.appendChild(span);
      }
        
    //The multimedia key's value is an array of obj that points to an img.
    // An array of images associated with each article
      if(current.multimedia.length > 0) {
        img.src = 'http://www.nytimes.com/' + current.multimedia[0].url; // take the first img
        img.alt = current.headline.main;
      }

      clearfix.setAttribute('class','clearfix'); //apply clearing -> refer to css

      article.appendChild(heading);
      heading.appendChild(link);
      article.appendChild(img);
      article.appendChild(para1);
      article.appendChild(para2);
      article.appendChild(clearfix);
      section.appendChild(article);
    }
  }
}





















