//all the images pertaining to the alien map
export function getAlienImages(){
  return [
    '../resources/timerBg.png',
    '../resources/bgEx.png',
    '../resources/wantedPoster.png',
    '../resources/confBg.gif',
    '../resources/preson.png',
    '../resources/ppl2.png',
    '../resources/ppl3.png',
    '../resources/talkTemp.mp3',
    '../resources/tempSong.mp3',
    '../resources/catTalkTemp.gif',
  ];
}

window.onload = function () {
  let but = document.getElementById("but");
  if (but) {
    //alien map is clicked
    but.onclick = function () {
      //const socket = new WebSocket("https://la-gr.github.io/temporary-namee/src/");
      //socket.send("User clicked!");
      sessionStorage.setItem("pam", "1");
      window.location.href = "game.html";
    };
  }
};