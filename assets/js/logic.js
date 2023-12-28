const startBTN = document.getElementById("start-btn");
const settingsBTN = document.getElementById("settings-btn");
const homeBTNs = document.getElementById("home-btns");
const cards = document.getElementById("cards");
const quote = document.getElementById("quote");//main content
const accuracyHTML = document.getElementById("accuracy");


let str = "I am a test.";
//console.log(str);
let position = 0; //tracks current qoute position 
let length = 0; //qoute length --MAY NOT BE NEEDED 
let accuracy = "--";//-- by default -- changed after first user input (qoute)
let correct = 0;//tracks correct inputs


//How to modify value bar
//NEED to calculate current qoutes # with total and get percentage -- THEN TEST
document.getElementById("progress-bar").setAttribute("value", "0");




//btn event listeners 
//TO-DO: Consolidate into one || case selection/ if/else to sort event input 
//startBTN.addEventListener("click", startScreen);
//settingsBTN.addEventListener("click", startScreen);

//start screen function to hide btns and unhide cards
function startScreen (){
    console.log("Click");
    //delete homeBTNs cointainer
    homeBTNs.remove();
    //uhide qoute selection cards
    cards.classList.remove("hidden");
}



//Keyboard input listener -- WILL NEED TO CHECK TABLET COMPATIBILITY
document.addEventListener('keydown', (event) => {
    console.log(event.key); //event.code alternative  
    //CHECK IF qoute is empty -- if it is NOT then call flter function
    //pass event into inputFilter function 
    //console.log(length);
    if (position < length){ //NEED TO ALSO CHECK IF QOUTE IS EMPTY OR NOT
        inputFilter(event);
    } else if (position >= length) {//Trigger next qoute if avaliable otherwise end game
        console.log("END");
        //increase progress bar?
    }
})
  
  
//TO-DO: to array value for string
function populateText(str){
    let tracker = 0;
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
    } 
    
    //update border position if position is not equal to length
    if (position !== length){
        document.getElementById("character" + `${position}`).classList.add("border", "blink");
    }
   
}





populateText(str);









