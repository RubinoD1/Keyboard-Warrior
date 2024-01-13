const homeBTNs = document.getElementById("home-btns");
const cards = document.getElementById("cards");
const qouteParent = document.getElementById("qoute-parent");
const quote = document.getElementById("quote");//main content
const accuracyHTML = document.getElementById("accuracy");

let theme = undefined;
let arrayPosition = 0;//0 will start the index at the beginning 
let position = 0; //tracks current qoute position 
let length = 0; //qoute length 
let accuracy = "--";//-- by default -- changed after first user input (qoute)
let accuracyScores = [];//array to hold accuracy values for qoutes to calculate overall total %
let correct = 0;//tracks correct inputs

//sorts user clicks  
document.onclick = function(event) {
   let target = event.target.id
   if(target === "start-btn"){
    homeBTNs.remove();//delete homeBTNs cointainer
    cards.classList.remove("hidden");//uhide qoute selection cards
   } else if (target === "nietzsche" || target === "shakespeare" || target === "mystery"){
     theme = arrays[target]; //set array selection
     themeSelect(theme);//pass value to function to set quotes
   }else if(target === "replay"){//replay button
     location.reload();//reload page -- resets values and returns to homepage
   }
};

//Keyboard input listener -- WILL NEED TO CHECK TABLET COMPATIBILITY
document.addEventListener('keydown', (event) => {
    if (position < length){ 
      inputFilter(event);
  } else if (position >= length) {//Trigger next qoute if avaliable and array not at last #
      arrayPosition = arrayPosition + 1;//increase arrayPosition 
      //Update qoutes left HTML
      document.getElementById("qoutes-left").innerHTML = "Quotes left: " + arrayPosition + " / " + theme.length;
      accuracyScores.push(Math.trunc(correct/position*100));//push accuracy value to total array  
      accuracyHTML.innerHTML = "Accuracy: --%";//reset accuracy percentage HTML for next qoute
    if(arrayPosition < theme.length){
      let progress = Math.trunc(arrayPosition/theme.length*100);//increase progress bar --calculate bar completion %
      document.getElementById("progress-bar").setAttribute("value", `${progress}`);
      position = 0;//resets qoute position
      correct = 0;//reset correct inputs
      quote.innerHTML= ""//clear qoute inner HTML
      populateText(theme);//call function to set next quote
    
    } else if(arrayPosition >= theme.length){
        qouteParent.remove();
        restultsHTML();
   
      }
    } 
})

//function for selecting qoutes, randomizing and setting str value for starting qoute
function themeSelect(theme){
  cards.remove();//delete cards div 
  let lastElement; //used in the iteration process to hold the last element in the array 
  
    for (let i = theme.length - 1; i > 0; i--) {//iterate through the array reducing its length by 1 untill the first element is reached
      let rand = Math.floor(Math.random() * (i + 1));//used to randomly select an array element
      lastElement = theme[i];//value is the last element in array
      theme[i] = theme[rand];//randomly choose a array element
      theme[rand] = lastElement;//put the randomly slected array element in the place of the last index element 
    }
  qouteParent.classList.remove("hidden");//uhide qoute selection cards
  //Update qoutes left HTML
  document.getElementById("qoutes-left").innerHTML = "Quotes left: " + arrayPosition + " / " + theme.length;

  populateText(theme);  //call qoute function to set first qoute
}

function populateText(theme){
  let tracker = 0;
  let str = theme[arrayPosition];
  // str.split("") will convert our string to characters array
  // Then we can loop through them
  str.split("").map(letter => {
      const span = document.createElement("span");
      span.innerText = letter;
      span.setAttribute("id","character" + `${tracker}`);//add unique add to each span element
      quote.appendChild(span);
      tracker = tracker + 1;//assign unique id number
  })
  length = str.length;//set length counter to str.length
  //ADD border class to character0 id || set timer that changes style
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
  } else if (test !== "Shift" && test !== document.getElementById("character" + `${position}`).innerHTML){//not shift and not equal to innerHTML
      document.getElementById("character" + `${position}`).classList.add("incorrect"); 
      position = position + 1;
      accuracyHTML.innerHTML = "Accuracy: " + Math.trunc(correct/position*100) + "%";
      document.getElementById("character" + `${position-1}`).classList.remove("border", "blink");
  } 
  
  //update border position if position is not equal to length and qoute.innerHTML not ""
  if (position !== length && quote.innerHTML !== ""){
    document.getElementById("character" + `${position}`).classList.add("border", "blink");
  } else if (position === length && qouteParent.innerHTML !== ""){//if at last character of qoute
    document.getElementById("continue").classList.remove("hidden");//unhide press any key to continue 
  }
}

//calculate user score and make results div 
function restultsHTML(){
  //calculate user score
  let sum = 0;// create a variable for the sum and initialize it
  for (let i = 0; i < accuracyScores.length; i++ ) {// iterate over each item in the array
    sum += accuracyScores[i];
  }
  let outOf = theme.length *100;//array length *100 to get total score value
  let userResults = Math.trunc(sum/outOf*100); //calculate user overall accuracy%

  //make results div 
  let parent = document.createElement('div');//parent div 
  parent.id = 'results'; //parent id="results"
  let h1 = document.createElement('h1');//create h1 tag 
  h1.id = 'user-score'; 
  h1.className = 'title is-1 has-text-white';  
  h1.textContent = "Overall Accuracy: " + `${userResults}` + "%";
  let newLine = document.createElement('br');//create br tag (break)
  let button = document.createElement('button');//make button
  button.id = 'replay';
  button.className = 'button is-large is-responsive button is-link';
  button.textContent = 'Replay';
  parent.appendChild(h1);//add h1 to div
  parent.appendChild(newLine);//add br to div
  parent.appendChild(button);//add button to div
  document.body.appendChild(parent);//add div to the document
}




//arrays
const arrays = {
  shakespeare: ["shakespeare0", "shakespeare1", "shakespeare2","shakespeare3", "shakespeare4", "shakespeare5"],
  nietzsche: ["nietzsche0" ,"nietzsche1", "nietzsche2", "nietzsche3", "nietzsche4", "nietzsche5"],
  mystery: ["mystery0" ,"mystery1", "mystery2", "mystery3", "mystery4", "mystery5"]
}


//console.log(arrays.mystery.length);