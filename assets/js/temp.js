const homeBTNs = document.getElementById("home-btns");
const cards = document.getElementById("cards");
const qouteParent = document.getElementById("qoute-parent");
const quote = document.getElementById("quote");//main content
const accuracyHTML = document.getElementById("accuracy");

let theme = undefined;
let arrayPosition = 0;//0 will start the index at the beginning 
let position = 0; //tracks current qoute position 
let length = 0; //qoute length --MAY NOT BE NEEDED 
let accuracy = "--";//-- by default -- changed after first user input (qoute)
let correct = 0;//tracks correct inputs

//sorts user clicks  
document.onclick = function(event) {
   let target = event.target.id
   if(target === "start-btn"){
    //console.log("start");
    homeBTNs.remove();//delete homeBTNs cointainer
    cards.classList.remove("hidden");//uhide qoute selection cards
   } else if (target === "nietzsche" || target === "shakespeare" || target === "mystery"){
     //console.log(target, "has been clicked");
     //open settings menu 
     
     theme = arrays[target]; //set array selection
     //console.log(theme.length);
     themeSelect(theme);//pass value to function to set quotes
   }//settings menu --if needed
};

//Keyboard input listener -- WILL NEED TO CHECK TABLET COMPATIBILITY
document.addEventListener('keydown', (event) => {
  console.log(event.key); //event.code alternative  
  //CHECK IF qoute is empty -- if it is NOT then call flter function
  //pass event into inputFilter function 
  //console.log(length);
  if (position < length){ //NEED TO ALSO CHECK IF QOUTE IS EMPTY OR NOT
      inputFilter(event);
  } else if (position >= length) {//Trigger next qoute if avaliable and array not at last #
      console.log("END of qoute");
      arrayPosition = arrayPosition + 1;//increase arrayPosition 
      //increase progress bar --calculate bar completion %
      let progress = Math.trunc(arrayPosition/theme.length*100);
      //console.log(progress);
      document.getElementById("progress-bar").setAttribute("value", `${progress}`);
      position = 0;//resets qoute position
      correct = 0;//reset correct inputs
      //push accuracy value to total array  
      
      //reset html value for next qoute --maybe set in populateText?

      //update qoute position number for html (0/1, etc)--populateText it may be better to set there
      
      quote.innerHTML= ""//clear qoute inner HTML
      //increase arrayPosition and call function to set next quote
      populateText(theme);
  }//arrayPosition === arrayPosition.length && position >= length
})

//function for selecting qoutes, randomizing and setting str value for starting qoute
function themeSelect(theme){
  //console.log(theme, "is in theme select");
  //***RE-ADD HIDDEN CLASS???***
  cards.remove();//delete cards div 
  //randomize array 
     //theme = array choice
  let lastElement; //used in the iteration process to hold the last element in the array 
  
    for (let i = theme.length - 1; i > 0; i--) {//iterate through the array reducing its length by 1 untill the first element is reached
      let rand = Math.floor(Math.random() * (i + 1));//used to randomly select an array element
      lastElement = theme[i];//value is the last element in array
      theme[i] = theme[rand];//randomly choose a array element
      theme[rand] = lastElement;//put the randomly slected array element in the place of the last index element 
    }
  //console.log(theme, "randomized"); 
  //console.log(theme[arrayPosition], "is current quote");
  
  //** Hide Header and create footer with return home link  **

  //unhide || load qoute html file
  qouteParent.classList.remove("hidden");//uhide qoute selection cards
  //call qoute function to set first qoute
  populateText(theme);
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
      length = length +1;//log qoute length 
      //console.log(tracker);
  })
  //ADD border class to character0 id || set timer that changes style
  document.getElementById("character0").classList.add("border", "blink");
  //TO-DO: position, accuracy and correct reset values
}

//Keyboard input filter for quotes 
function inputFilter(event){
  //NEED to track current position and increase after input
  let test = event.key;
  //console.log(document.getElementById("character" + `${position}`).innerHTML, event.key, "filter");
  // ** DO THE CLASSES RESET ON CHANGING QOUTES? ** CHECK WHEN POSSIBLE
  if (test !== "Shift" && test == document.getElementById("character" + `${position}`).innerHTML){//not shift and equal to innerHTML
      console.log("correct");
      document.getElementById("character" + `${position}`).classList.add("correct"); 
      position = position + 1;
      correct = correct + 1;
      accuracyHTML.innerHTML = "Accuracy: " + Math.trunc(correct/position*100) + "%";
      document.getElementById("character" + `${position-1}`).classList.remove("border", "blink");
  } else if (test !== "Shift" && test !== document.getElementById("character" + `${position}`).innerHTML){//not shift and not equal to innerHTML
      console.log("incorrect");
      document.getElementById("character" + `${position}`).classList.add("incorrect"); 
      position = position + 1;
      accuracyHTML.innerHTML = "Accuracy: " + Math.trunc(correct/position*100) + "%";
      document.getElementById("character" + `${position-1}`).classList.remove("border", "blink");
  } //ADD check for qoute at end and input entered --call change qoute || end game
  
  //update border position if position is not equal to length and qoute.innerHTML not ""
  if (position !== length && quote.innerHTML === ""){
      document.getElementById("character" + `${position}`).classList.add("border", "blink");
  }
 
}



//arrays
const arrays = {
  shakespeare: ["shakespeare0", "shakespeare1", "shakespeare2","shakespeare3", "shakespeare4", "shakespeare5"],
  nietzsche: ["nietzsche0" ,"nietzsche1", "nietzsche2", "nietzsche3", "nietzsche4", "nietzsche5"],
  mystery: ["mystery0" ,"mystery1", "mystery2", "mystery3", "mystery4", "mystery5"]
}


//console.log(arrays.mystery.length);