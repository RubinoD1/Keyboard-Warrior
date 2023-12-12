const startBTN = document.getElementById("start-btn");
const settingsBTN = document.getElementById("settings-btn");
const homeBTNs = document.getElementById("home-btns");
const cards = document.getElementById("cards");


//btn event listeners 
//TO-DO: Consolidate into one || case selection/ if/else to sort event input 
startBTN.addEventListener("click", startScreen);
settingsBTN.addEventListener("click", startScreen);

//start screen function to hide btns and unhide cards
function startScreen (){
    console.log("Click");
    //delete homeBTNs cointainer
    homeBTNs.remove();
    //uhide qoute selection cards
    cards.classList.remove("hidden");
}