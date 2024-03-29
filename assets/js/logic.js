import {arrays} from './array.js'//import array cointaining quotes

const quoteParent = document.getElementById("quote-parent");
const quote = document.getElementById("quote");//main content
const accuracyHTML = document.getElementById("accuracy");

let theme = undefined;
let arrayPosition = 0;//0 to start the index at the beginning 
let position = 0; //tracks current quote position 
let length = 0; //quote length 
let accuracyScores = [];//array to hold accuracy values for quotes to calculate overall total %
let correct = 0;//tracks correct inputs

//button event listener for cards and replay button
document.onclick = function(event) {
 let target = event.target.id
 switch(target) {//card btns
   case "nietzsche":
   case "shakespeare":
   case "mystery":
   case "sontag":
   case "churchill":
   case "napeleon":
   case "beauvoir":
   case "lawrence":
   case "tolkein":
   case "camus":
   case "tolstoy":
   case "jung":  
    localStorage.setItem("theme", `${target}`);//save theme to local storage
    window.location.assign("main.html");//load main.html page
    break;
   case "replay"://replay btn
    localStorage.clear();//clear loacal storage 
    window.location.assign("cards.html");//load card.html page
    break;
  }
};

//Keyboard input listener 
document.addEventListener('keydown', (event) => {
  event.preventDefault();//prevents space key from moving screen position and accidental ctl + f presses
  
  if (position < length){ 
      inputFilter(event);
  } 
  else if (position >= length) {//Trigger next quote if avaliable and array not at last #
      arrayPosition = arrayPosition + 1;//increase arrayPosition 
      accuracyScores.push(Math.trunc(correct/position*100));//push accuracy value to total array  
      accuracyHTML.innerHTML = "Accuracy: --%";//reset accuracy percentage HTML for next quote
    if(arrayPosition < theme.length){
      let progress = Math.trunc(arrayPosition/theme.length*100);//increase progress bar 
      document.getElementById("progress-bar").setAttribute("value", `${progress}`);
      //Update qoutes left HTML
      document.getElementById("quotes-left").innerHTML = "Quotes Complete: " + arrayPosition + " / " + theme.length;
      position = 0;//reset quote position
      correct = 0;//reset correct inputs
      quote.innerHTML= ""//clear quote inner HTML
      populateText(theme);//call function to set next quote
    } else if(arrayPosition >= theme.length){
      quoteParent.remove();//remove quoteParent div
      restultsHTML();
    }
  } 
})

//checks local storage for saved theme 
function checkStorage() {
  theme = arrays[localStorage.getItem("theme")]; //set array selection
  if (theme !== "" && document.URL.includes("main.html")){//local storage not empty and page is main.html
    themeSelect(theme);//pass value to function to set quotes
  }
}

//function for selecting quotes, randomizing and setting str value for starting quote
function themeSelect(theme){
  let lastElement; //used in the iteration process to hold the last element in the array 
  
    for (let i = theme.length - 1; i > 0; i--) {//iterate through the array reducing its length by 1 untill the first element is reached
      let rand = Math.floor(Math.random() * (i + 1));//used to randomly select an array element
      lastElement = theme[i];//value is the last element in array
      theme[i] = theme[rand];//randomly choose a array element
      theme[rand] = lastElement;//put the randomly slected array element in the place of the last index element 
    }
  quoteParent.classList.remove("hidden");//uhide quote selection cards
  //Update quotes left HTML
  document.getElementById("quotes-left").innerHTML = "Quotes Complete: " + arrayPosition + " / " + theme.length;
  populateText(theme);  //call quote function to set first quote
}

function populateText(theme){
  let tracker = 0;
  let str = theme[arrayPosition];
  // str.split("") will convert our string to characters array. THEN we can loop through them 
  str.split("").map(letter => {
      const span = document.createElement("span");
      span.innerText = letter;
      span.setAttribute("id","character" + `${tracker}`);//add unique add to each span element
      quote.appendChild(span);
      tracker = tracker + 1;//assign unique id number
  })
  length = str.length;//set length counter to str.length
  document.getElementById("character0").classList.add("border", "blink");
  document.getElementById("continue").classList.add("hidden");  //hide continue div
}

//Keyboard input filter for quotes 
function inputFilter(event){
  let test = event.key;
  if (test !== "Shift" && test == document.getElementById("character" + `${position}`).innerHTML){//not shift and equal to innerHTML
      document.getElementById("character" + `${position}`).classList.add("correct"); 
      position = position + 1;
      correct = correct + 1;
      accuracyHTML.innerHTML = "Accuracy: " + Math.trunc(correct/position*100) + "%";
      document.getElementById("character" + `${position-1}`).classList.remove("border", "blink");
  } 
  else if (test !== "Shift" && test !== document.getElementById("character" + `${position}`).innerHTML){//not shift and not equal to innerHTML
      document.getElementById("character" + `${position}`).classList.add("incorrect"); 
      position = position + 1;
      accuracyHTML.innerHTML = "Accuracy: " + Math.trunc(correct/position*100) + "%";
      document.getElementById("character" + `${position-1}`).classList.remove("border", "blink");
  } 
  
  //update border position if position is not equal to length and quote.innerHTML not ""
  if (position !== length && quote.innerHTML !== ""){
    document.getElementById("character" + `${position}`).classList.add("border", "blink");
  } 
  else if (position === length && quoteParent.innerHTML !== ""){//if at last character of quote
    document.getElementById("continue").classList.remove("hidden");//unhide press any key to continue 
  }
}

//calculate user score and make results div 
function restultsHTML(){
  //calculate user score
  let sum = 0;// create a variable for the sum and initialize it
  for (let i = 0; i < accuracyScores.length; i++ ) {// iterate over each item in the array
    sum += accuracyScores[i];
    break;
  }
  let outOf = theme.length *100;//array length *100 to get total score value
  let userResults = Math.trunc(sum/outOf*100); //calculate user overall accuracy%

  //make results div 
  let parent = document.createElement('div');//parent div 
  parent.id = 'results'; //parent id="results"
  parent.className = 'j-center';//parent class="j-center"
  let h1 = document.createElement('h1');//create h1 tag 
  h1.id = 'user-score'; 
  h1.className = 'title is-1 has-text-white';  
  h1.textContent = "Overall Accuracy: " + `${userResults}` + "%";
  let button = document.createElement('button');//create button
  button.id = 'replay';
  button.className = 'button is-large is-responsive button is-link';
  button.textContent = 'Replay';
  parent.appendChild(h1);//add h1 to div
  parent.appendChild(button);//add button to div
  document.body.appendChild(parent);//add div to the document
}

checkStorage();//check if local storage is empty


