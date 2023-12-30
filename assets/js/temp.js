const homeBTNs = document.getElementById("home-btns");
const cards = document.getElementById("cards");

//sorts user clicks  
document.onclick = function(event) {
   let target = event.target.id
   //var target = event.target.innerHTML; 
   //event.target.id
   //console.log(target);
   if(target === "start-btn"){
    console.log("start");
    //delete homeBTNs cointainer
    homeBTNs.remove();
    //uhide qoute selection cards
    cards.classList.remove("hidden");
   } else if (target === "nietzsche" || target === "shakespeare" || target === "mystery"){
     console.log(target, "has been clicked");
     //open settings menu 
     
     let theme = arrays[target]; //set array selection
     //console.log(theme);
     themeSelect(theme);//pass value to function to set quotes
   }
};


//function for selecting qoutes, randomizing and setting str value for starting qoute
function themeSelect(theme){
  console.log(theme, "is in theme select");
  //***RE-ADD HIDDEN CLASS???***
  cards.remove();//delete cards div 
  //randomize array 
     //theme = array choice

  //set first qoute 
  //call qoute function
  
 
  //set str
  //unhide || load qoute html file
}





//arrays
const arrays = {
  shakespeare: ["shakespeare0", "shakespeare1", "shakespeare2","shakespeare3", "shakespeare4", "shakespeare5"],
  nietzsche: ["nietzsche0" ,"nietzsche1", "nietzsche2", "nietzsche3", "nietzsche4", "nietzsche5"],
  mystery: ["mystery0" ,"mystery1", "mystery2", "mystery3", "mystery4", "mystery5"]
}


//console.log(arrays.mystery);