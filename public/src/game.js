//game.js

let n = 0; //used to make sure the user can only click on the correct person
let money = 0; //amount of money the user has earned this round
//putting all necessary html elements into variables
let coins = document.getElementById("coins");
let confirm = document.getElementById("confirmation");
let mainG = document.getElementById("mainGame");
let talk = document.getElementById("talk");
let bgMusic = document.getElementById("bgMusic");
let startBut = document.getElementById("start");
let backBut = document.getElementById("back");
let cowboy = document.getElementById("cowboy");
let ok = document.getElementById("ok");
let time = document.getElementById("timer");
let bg = document.getElementById("bg");
let poster = document.getElementById("poster");
let catTalk = document.getElementById("catTalk");
let gameOver = document.getElementById("game-over");

let images = [];
import { getAlienImages } from "./map.js";
const pam = sessionStorage.getItem("pam");
if (pam === "1") {
  images = getAlienImages(); //puts the alien images into an array
}

let ppl =[images[4], images[5], images[6]] //Images of people

let loadingScreen = document.querySelector(".loading");
loadingScreen.style.display = "block";

//Preload images before setting styles
function preloadImages(urls, callback) {
  let loaded = 0;
  let total = urls.length;
  urls.forEach((url, index) => {
    let img = new Image();
    img.src = url;
    img.onload = () => {
      loaded++;
      if (loaded === total) callback(); // Call callback when all images are loaded
    };
  });
}
// List of images to preload
const imagesToPreload = [
  images[0], images[1], images[2], images[3],
  images[4], images[5], images[6], images[9]
];
// Apply styles before hiding the loading screen
preloadImages(imagesToPreload, function() {
  time.style.backgroundImage = "url(" + images[0] + ")";
  coins.style.backgroundImage = "url(" + images[0] + ")";
  bg.style.backgroundImage = "url(" + images[1] + ")";
  poster.style.backgroundImage = "url(" + images[2] + ")";
  confirm.style.backgroundImage = "url(" + images[3] + ")";
  catTalk.src = images[9];
  //Hide loading screen and show confirm screen
  setTimeout(() => {
    loadingScreen.classList.add("hidden");
    confirm.style.visibility = "visible";
    confirm.style.display = "block";
    setTimeout(() => {
      gameOver.style.display = "none";
      gameOver.style.visibility = "visible";
      mainG.style.visibility = "visible";
      loadingScreen.style.display = "none";
    }, 200);
  },200);
});
//set the audio later because they aren't noticeably behind
talk.src = images[7];
bgMusic.src = images[8];


// confirmation screen (start playing the selected map or go back)
startBut.addEventListener("click", () => { //user clicks start
  //voice message and background music play
  talk.play();
  bgMusic.play();
  //game screen appears
  mainG.style.display = "block";
  confirm.style.display = "none";
  gameOver.style.display = "none";
})
//user clicks back
backBut.addEventListener("click", () => {
  window.location.href = "map.html";
})

//the 'ok' button is clicked on the cowboy talking
ok.addEventListener("click", () => {
  cowboy.style.display="none"; //the block of the cowboy+text disappears
  talk.pause(); //stops the talking
})


// the person is found
function pplSelect(r, mon) {
  if (r === n) {
    document.getElementById("want").src = ppl[n+1];
    document.getElementById("dolar").innerHTML = "$"+mon+" REWARD";
    n++;
  }
}

//makes the people that are meant to be found
function makePpl(a, w, h, l, t, mon, nextMon){
  //get the ppl div
  let div = document.getElementById("ppl");
  //make a button (the person)
  let button = document.createElement("button");
  button.style.position = "absolute";
  button.style.left = l;
  button.style.top = t;
  button.onclick= function() {
    //the user has found all people
    if (nextMon === 0){
      sessionStorage.setItem("money", money);
      // $('overlay');
      gameOver.style.display ="block";
      mainG.style.display="none";
    }
    //user has not yet found all people
    else {
      pplSelect(a, nextMon);
      money += mon; //add the money earned from finding the person to the total money earned
      coins.innerHTML = "Coins: "+money;
    }
  }
  //create image of a person
  let image = document.createElement("img");
  image.src = ppl[a];
  image.alt = "person";
  image.width = w;
  image.height = h;
  button.appendChild(image); //add image to button
  div.appendChild(button); //add button to the div
}

//timer at the top of the screen
function timer(m,s){
  let min = m;
  let sec = s;
  let timer = setInterval(function(){
    if(sec>=10){
      document.getElementById('timerDis').innerHTML='0'+min+":"+sec;
    } else{ //adds a 0 before a single digit number in seconds
      document.getElementById('timerDis').innerHTML='0'+min+":0"+sec;
    }
    sec--;
    if (sec < 0 && min<0) {
      clearInterval(timer);
      sessionStorage.setItem("money", money);
      // $('overlay');
      gameOver.style.display = "block";
      mainG.style.display = "none";
    } else if (sec < 0){
      sec = 59;
      min--;
    }
  }, 1000); //loops every 1 second
}

//make the background draggable
dragElement(document.getElementById("bg"));
document.addEventListener("wheel", (e) => e.preventDefault(), { passive: false }); //prevents scrolling
function dragElement(elmnt) {
  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  elmnt.onmousedown = dragMouseDown;
  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    //get the mouse cursor position at startup
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    //call a function whenever the cursor moves
    document.onmousemove = elementDrag;
  }
  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();

    //get the max x and y values in order to restrict how far the bg can be dragged (only to the end of the image)
    let winW = document.documentElement.clientWidth || document.body.clientWidth;
    let winH = document.documentElement.clientHeight || document.body.clientHeight;
    let maxX = winW - elmnt.offsetWidth - 1;
    let maxY = winH - elmnt.offsetHeight - 1;
    //calculate the new cursor position
    pos1 = pos3 - e.clientX; //change in x position of mouse
    pos2 = pos4 - e.clientY; //change in y position of mouse
    pos3 = e.clientX; //current x position
    pos4 = e.clientY; //current y position

    console.log(pos1, pos2, pos3);

    //set the bg's new position
    //makes sure the bg is restricted to movement within the size of the bg image (vertical)
    if ((elmnt.offsetTop - pos2) >= maxY && (elmnt.offsetTop - pos2) <= 0) {
      elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    }
    //makes sure the bg is restricted to movement within the size of the bg image (horizontal)
    if ((elmnt.offsetLeft - pos1) >= maxX && (elmnt.offsetLeft - pos1) <= 0) {
      elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }
  }
  function closeDragElement() {
    //stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

//start timer and make the people to show up on screen
timer(5,0o00);
makePpl(0, 20, 50, "500px", "400px", 2, 4);
makePpl(1, 20, 50, "800px", "300px", 4, 6);
makePpl(2, 20, 50, "700px", "200px", 6, 0);


//LEADERBOARD STUFF
//display blur

//display score
function displayScore() {
  let score = money;
  document.getElementById('score').innerHTML = score;
}

//array of data stored
let data = [
  {name:"bob", score:10, date:""},
  {name:"jim", score:100, date:""},
  {name:"joe", score:0, date:""},
];

//display leaderboard
function displayLeaderboard() {
  const leaderboard = document.getElementById('leaderboard');
  leaderboard.innerHTML = ''; //clears the previous content in table

  //sort data to be displayed highest score to lowest
  data
    .sort ((a,b) => {
      if (b.score === a.score) {
        return a.name.localeCompare(b.name); //sort by name if scores are equal
      } else
        return b.score - a.score; //sort by score in descending order
    });

  //display the data in the leaderboard
  data.forEach((data, index) => {
    let row = `<tr>
        <td>${index + 1}</td>
        <td>${data.name}</td>
        <td>${data.score}</td>
        <td>${data.date}</td>
    </tr>`;
    leaderboard.innerHTML += row;
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.getElementById('menu');
  const restartButton = document.getElementById('restart');

//redirect user to map selection
  menuButton.addEventListener('click', () => {
    window.location.href = "map.html";
  });

  restartButton.addEventListener('click', () => {
    window.location.href = "game.html";
  });
});

displayLeaderboard();
displayScore();
