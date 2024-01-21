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

//button event listeners
document.onclick = function(event) {
   let target = event.target.id
   if(target === "start-btn"){
    homeBTNs.remove();//delete homeBTNs cointainer
    document.getElementById("site-banner").src = "./assets/images/themeSelect.png"; //change site banner to theme banner 
    cards.classList.remove("hidden");//uhide qoute selection cards
   } else if (target === "nietzsche" || target === "shakespeare" || target === "mystery"){
     theme = arrays[target]; //set array selection
     document.getElementById("site-banner").src = "./assets/images/banner2.png"; //change site banner back to main banner 
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
      accuracyScores.push(Math.trunc(correct/position*100));//push accuracy value to total array  
      accuracyHTML.innerHTML = "Accuracy: --%";//reset accuracy percentage HTML for next qoute
    if(arrayPosition < theme.length){
      let progress = Math.trunc(arrayPosition/theme.length*100);//increase progress bar --calculate bar completion %
      document.getElementById("progress-bar").setAttribute("value", `${progress}`);
      //Update qoutes left HTML
      document.getElementById("qoutes-left").innerHTML = "Quotes Complete: " + arrayPosition + " / " + theme.length;
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
  document.getElementById("qoutes-left").innerHTML = "Quotes Complete: " + arrayPosition + " / " + theme.length;
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
  let button = document.createElement('button');//create button
  button.id = 'replay';
  button.className = 'button is-large is-responsive button is-link';
  button.textContent = 'Replay';
  parent.appendChild(h1);//add h1 to div
  parent.appendChild(button);//add button to div
  document.body.appendChild(parent);//add div to the document
}

//arrays
const arrays = {
  shakespeare: [
  "The fool doth think he is wise, but the wise man knows himself to be a fool.", 
  "The fault, dear Brutus, is not in our stars, but in ourselves.",
  "Words are easy, like the wind; faithful friends are hard to find.",
  "Brevity is the soul of wit.",
  "Listen to many, speak to a few.",
  "We are such stuff as dreams are made on, and our little life is rounded with a sleep.",
  "I wish my horse had the speed of your tongue.",
  "I can see he's not in your good books,' said the messenger. 'No, and if he were I would burn my library.",
  "In time we hate that which we often fear.",
  "When we are born, we cry that we are come to this great stage of fools."],
  
  nietzsche: [
  "Every deep thinker is more afraid of being understood than of being misunderstood.",
  "I am a forest, and a night of dark trees: but he who is not afraid of my darkness, will find banks full of roses under my cypresses.",
  "The surest way to corrupt a youth is to instruct him to hold in higher esteem those who think alike than those who think differently.",
  "No one can construct for you the bridge upon which precisely you must cross the stream of life, no one but you yourself alone.",
  "In individuals, insanity is rare; but in groups, parties, nations and epochs, it is the rule.",
  "He who has a why to live for can bear almost any how.",
  "Sometimes people don't want to hear the truth because they don't want their illusions destroyed.",
  "You must have chaos within you to give birth to a dancing star.",
  "There is always some madness in love. But there is also always some reason in madness.",
  "And those who were seen dancing were thought to be insane by those who could not hear the music."],
  
  mystery: [
  "Those who don't build must burn. It's as old as history and juvenile delinquents.",
  "Everyone seems to have a clear idea of how other people should lead their lives, but none about his or her own.",
  "Freedom is the freedom to say that two plus two make four. If that is granted, all else follows.",
  "All animals are equal, but some animals are more equal than others.",
  "The oldest and strongest emotion of mankind is fear, and the oldest and strongest kind of fear is fear of the unknown.",
  "Deep in the human unconscious is a pervasive need for a logical universe that makes sense, but the real universe is always one step beyond logic.",
  "Courage isn't having the strength to go on - it is going on when you don't have strength.",
  "The reason most people fail instead of succeed is they trade what they want most for what they want at the moment.",
  "It is not death that a man should fear, but he should fear never beginning to live.",
  "It's only after we've lost everything that we're free to do anything."]
}


//console.log(arrays.mystery.length);
