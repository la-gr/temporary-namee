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
  ];
}

document.addEventListener("DOMContentLoaded", () => {
  const socket = io();

  const form = document.getElementById('form');
  const input = document.getElementById('input');
  const messages = document.getElementById('messages');

  let chats = [];

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (input.value) {
      socket.emit('chat message', input.value);
      input.value = '';
    }
  });
  socket.on('chat message', (msg, serverOffset) => {
    const item = document.createElement('li');
    item.textContent = msg; //set the item to the user's entered message
    let lis = messages.getElementsByTagName("li"); //get the list in the ul
    //only 3 messages at a time are visible
    if (lis.length>2) {
      messages.removeChild(lis[0]);
    }
    messages.appendChild(item); //add the message to the ul
    window.scrollTo(0, document.body.scrollHeight); //scrolls the messages
    socket.auth.serverOffset = serverOffset;
  });

  let mon = sessionStorage.getItem("money");
  if(!mon){
    mon=0;
  }
  let money = document.getElementById("money");
  money.innerHTML = "TOTAL COINS: "+mon;

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