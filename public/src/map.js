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

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (input.value) {
      socket.emit('chat message', input.value);
      input.value = '';
    }
  });
  socket.on('chat message', (msg, serverOffset) => {
    const item = document.createElement('li');
    item.textContent = msg;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
    socket.auth.serverOffset = serverOffset;
  });

  console.log("pee");

  window.onload = function() {
    let but = document.getElementById("but");
    if (but) {
      //alien map is clicked
      but.onclick = function() {
        sessionStorage.setItem("pam", "1");
        window.location.href = "game.html";
      };
    }
  };
});