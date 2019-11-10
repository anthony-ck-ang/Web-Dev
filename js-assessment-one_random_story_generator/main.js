var customName = document.getElementById('customname');
var randomize = document.querySelector('.randomize');
var story = document.querySelector('.story');

function randomValueFromArray(array){
  return array[Math.floor(Math.random()*array.length)];
}

let storyText = 'It was 94 fahrenheit outside, so :insertx: went for a walk. When they got to :inserty:, they stared in horror for a few moments, then :insertz:. Bob saw the whole thing, but was not surprised — :insertx: weighs 300 pounds, and it was a hot day.';

let insertX = [
    'Willy the Goblin',
    'Big Daddy',
    'Father Christmas'
];

let insertY = [
    'the soup kitchen',
    'Disneyland',
    'the White House'  
];

let insertZ = [
   'spontaneously combusted',
    'melted into a puddle on the sidewalk',
    'turned into a slug and crawled away' 
];

//ref to button
randomize.addEventListener('click', () =>{
    let newStory = storyText;
//    let xItem = randomValueFromArray(insertX);
//    let yItem = randomValueFromArray(insertY);
//    let zItem = randomValueFromArray(insertZ);
    
    newStory = newStory.replace(':insertx:', randomValueFromArray(insertX));
    newStory = newStory.replace(':inserty:', randomValueFromArray(insertY));
    newStory = newStory.replace(':insertz:', randomValueFromArray(insertZ));
    newStory = newStory.replace(':insertx:', randomValueFromArray(insertX));
    
    //console.log(newStory);
    
    if(customName.value !== ''){
        console.log(customName.value);
        newStory = newStory.replace('Bob', customName.value);
        console.log(newStory);
    }
    
    if(document.getElementById("uk").checked){
        let weight = Math.round(300/14) + ' stone';
        let temperature =  Math.round((94-32)*0.5556) + ' centigrade';
        
        newStory = newStory.replace('94 fahrenheit', temperature);
        console.log(newStory);
        newStory = newStory.replace('300 pounds', weight);
        console.log(newStory);
    }
    
    story.textContent = newStory;
    story.style.visibility = 'visible';
    
});
