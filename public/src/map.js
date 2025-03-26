//map.js

//all the images pertaining to the alien map
export function getAlienImages() {
  return [
    'resources/timerBg.png',
    'resources/mapBg.jpg',
    'resources/wantedPoster.png',
    'resources/confBg.gif',
    'resources/preson.png',
    'resources/ppl2.png',
    'resources/ppl3.png',
    'resources/cowCatTalk.mp3',
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

  if (!localStorage.getItem("loggedInUser")) {
    window.location.href = "index.html"; // Redirect to login if not logged in
  }


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




  //let char = document.getElementById("char");
  let username = localStorage.getItem("namee");
  console.log(username);
  socket.emit("user", {username});

  function sendImage(mag) {
    const imageUrl = mag;
    if (imageUrl) {
      socket.emit("send image", {username, imageUrl}); // Send image URL to server
    }
  }

  socket.on('chat message', (msg, serverOffset) => {
    const item = document.createElement('li');
    item.textContent = msg; //set the item to the user's entered message
    let lis = messages.getElementsByTagName("li"); //get the list in the ul
    //only 3 messages at a time are visible
    if (lis.length > 4) {
      messages.removeChild(lis[0]);
    }
    messages.appendChild(item); //add the message to the ul
    window.scrollTo(0, document.messages.scrollHeight); //scrolls the messages
    socket.auth.serverOffset = serverOffset;
  });


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
      sendImage(newAnim);
      currentAnim=newAnim;
    }

    socket.emit("move character", { username, x, y, image: currentAnim });
  });

  let players = {};

  // Receive updates from server & update character for all players
  socket.on("update players", (serverPlayers) => {
    players = serverPlayers;
    updateCharacters();
  });

  // Function to update characters on screen
  function updateCharacters() {
    const charContainer = document.getElementById("character");
    Object.entries(players).forEach(([username, player]) => {
      let charElem = document.getElementById(`char-${username}`);
      if (!charElem) {
        charElem = document.createElement("img");
        charElem.id = `char-${username}`; // Unique ID for each character
        charElem.style.position = "absolute";
        charElem.style.width = "131px";
        charElem.style.height = "151px";
        charContainer.appendChild(charElem);
      }

      charElem.src = player.image || "resources/gF.png"; // Default image
      charElem.style.transform = `translate(${player.x}px, ${player.y}px)`;
    });
    Array.from(charContainer.children).forEach((child) => {
      if (!players[child.id.replace("char-", "")]) {
        charContainer.removeChild(child);
      }
    });
  }

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
      }else{
        console.log("EORRIR");
      }
      currentAnim="resources/gF.png";
    }

  });
  // Listen for image updates
  socket.on("receive image", ({ username, imageUrl }) => {
    if (players[username]) {
      players[username].image = imageUrl;
      console.log(players[username].image)
      updateCharacters();
    }
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

});

  const logoutBtn = document.getElementById("logoutBtn");

  // if (logoutBtn) {
  //   logoutBtn.addEventListener("click", function () {
  //     localStorage.removeItem("loggedInUser"); // Remove user session
  //     window.location.href = "index.html"; // Redirect to login page
  //   });
  // }



