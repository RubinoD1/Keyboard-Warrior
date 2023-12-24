const startBTN = document.getElementById("start-btn");
const settingsBTN = document.getElementById("settings-btn");
const homeBTNs = document.getElementById("home-btns");
const cards = document.getElementById("cards");
const quote = document.getElementById("quote");//main content


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


//keyboard input event listener -- check if quote is active THEN trigger check function


//main content function
function quoteCheck(){
  
}

//Qoute logs for refrence 
//console.log(quote.textContent); //quote text content
//console.log(quote.textContent.charAt(0)); //get specefic character
//console.log(quote.textContent.length); //qoute length

//const str = quote.textContent;
const str = "Ut venenatis, nisl scelerisque sollicitudin fermentum, quam libero hendrerit ipsum, ut blandit est tellus sit amet turpis."
console.log(str);



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
        tracker = tracker + 1;
        //console.log(tracker);
    })
}
populateText(str);