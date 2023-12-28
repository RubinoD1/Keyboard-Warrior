const startBTN = document.getElementById("start-btn");
const settingsBTN = document.getElementById("settings-btn");
const homeBTNs = document.getElementById("home-btns");
const cards = document.getElementById("cards");

startBTN.addEventListener("click", startScreen);
settingsBTN.addEventListener("click", startScreen);

function startScreen (){
    console.log("Click");
    //delete homeBTNs cointainer
    homeBTNs.remove();
    //uhide qoute selection cards
    cards.classList.remove("hidden");
}
