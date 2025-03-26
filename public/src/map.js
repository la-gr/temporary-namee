//map.js

//all the images pertaining to the alien map
export function getAlienImages() {
  return [
    'resources/timerBg.png',
    'resources/bgEx.png',
    'resources/wantedPoster.png',
    'resources/confBg.gif',
    'resources/preson.png',
    'resources/ppl2.png',
    'resources/ppl3.png',
    'resources/talkTemp.mp3',
    'resources/tempSong.mp3',
    'resources/catTalkTemp.gif',
    'resources/abducted2.png',
    'resources/cigar1.png',
    'resources/cigar3.png',
    'resources/gun3.png',
    'resources/horse4.png',
    'resources/lasso1.png',
    'resources/newspaper2.2.png',
  ];
}

//setup for the loading screen
let loadingScreen = document.querySelector(".loading");
let mapSelect = document.getElementById("mapSelect");
window.addEventListener('load', function() {
  setTimeout(() => {
    loadingScreen.classList.add("hidden");
    mapSelect.style.visibility = "visible";
    mapSelect.style.display = "block";
    setTimeout(() => {
      loadingScreen.style.display = "none";
    }, 200); //the time makes the transition smoother
  },200);
})

document.addEventListener("DOMContentLoaded", () => {
  const socket = io();

  const form = document.getElementById('form');
  let input = document.getElementById('input');
  input.readOnly = true;
  const messages = document.getElementById('messages');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (input.value) {
      socket.emit('chat message', input.value);
      input.value = '';
      input.readOnly = true;
    }
  });
  input.addEventListener("click", function () {
    input.readOnly = false;
  });

  let char = document.getElementById("char");

  function sendImage(mag) {
    const imageUrl = mag;
    if (imageUrl) {
      socket.emit("send image", imageUrl); // Send image URL to server
    }
  }

  socket.on("receive image", (imageUrl) => {
    char.src = imageUrl; // Change character image
  });

  socket.on('chat message', (msg, serverOffset) => {
    const item = document.createElement('li');
    item.textContent = msg; //set the item to the user's entered message
    let lis = messages.getElementsByTagName("li"); //get the list in the ul
    //only 3 messages at a time are visible
    if (lis.length > 2) {
      messages.removeChild(lis[0]);
    }
    messages.appendChild(item); //add the message to the ul
    window.scrollTo(0, document.messages.scrollHeight); //scrolls the messages
    socket.auth.serverOffset = serverOffset;
  });


  let mon = sessionStorage.getItem("money");
  if (!mon) {
    mon = 0;
  }
  let money = document.getElementById("money");
  money.innerHTML = "TOTAL COINS: " + mon;

  let alien = document.getElementById("alien");
  let mall = document.getElementById("mall");
  if (alien) {
    //alien map is clicked
    alien.onclick = function() {
      sessionStorage.setItem("pam", "1");
      window.location.href = "game.html";
    };
  }
  if (mall) {
    //mall map is clicked
    mall.onclick = function() {
      sessionStorage.setItem("pam", "2");
      window.location.href = "game.html";
    };
  }

  //creating character
  const character = document.querySelector('.character');

  let keysPressed = {}; // Object to track pressed keys
  let currentAnim="";

  //starting position
  let x = 0;
  let y = 0;

  const step = 5; //size of a step

  document.addEventListener("keydown", (e) => {
    if (!["w", "a", "s", "d"].includes(e.key)) return; //ignore keypress if not wasd
    keysPressed[e.key] = true; // Mark key as pressed
    let newAnim="";
    switch (e.key) {
      case 'w': // Move up
        if (y - step >= -200) y -= step;
        newAnim = "resources/gBwalkAnim.gif"
        break;
      case 'a': // Move left
        if (x - step >= -800) x -= step;
        newAnim = "resources/gLwalkAnim.gif"
        break;
      case 's': // Move down
        if (y + step <= 1440) y += step;
        newAnim = "resources/gFwalkAnim.gif"
        break;
      case 'd': // Move right
        if (x + step <= 1075) x += step;
        newAnim = "resources/gRwalkAnim.gif"
        break;
    }

    if (newAnim !== currentAnim){
      //char.src = newAnim;
      sendImage(newAnim);
      currentAnim=newAnim;
    }

    character.style.transform = `translate(${x}px, ${y}px)`;
    socket.emit("move character", { x, y}); // Send movement & image
  });
  // Receive updates from server & update character for all players
  socket.on("update character", ({ x, y }) => {
    character.style.transform = `translate(${x}px, ${y}px)`;
  });

  document.addEventListener("keyup", (e) => {
    if (keysPressed[e.key]) {
      delete keysPressed[e.key]; // Remove key from tracking
    }

    // If no movement keys are pressed, stop the animation
    if (Object.keys(keysPressed).length === 0) {
      if (currentAnim === "resources/gBwalkAnim.gif") {
        sendImage("resources/gB.png");
      } else if (currentAnim === "resources/gLwalkAnim.gif") {
        sendImage("resources/gL.png");
      } else if (currentAnim === "resources/gFwalkAnim.gif") {
        sendImage("resources/gF.png");
      } else if (currentAnim === "resources/gRwalkAnim.gif") {
        sendImage("resources/gR.png");
      }
    }


  });
});

