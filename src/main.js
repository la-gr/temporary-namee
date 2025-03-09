let n = 0;
const want = ["../resources/wanted2.png", "../resources/wanted3.png"]; // array of people wanted posters
const ppl = ["../resources/preson.png", "../resources/ppl2.png", "../resources/ppl3.png"];
let money = 0;

// the person is found
function pplSelect(r) {
  if (r === n) {
    document.getElementById("want").src = want[n];
    n++;
  }
}

function makePpl(a, w, h, l, t, mon){
  //create div container
  let div = document.createElement("div");
  div.classList.add("one");
  div.style.position = "absolute";
  div.style.left = l;
  div.style.top = t;
  let button = document.createElement("button");
  button.onclick= function() {
    pplSelect(a);
    money += mon;
  }
  //create image
  let image = document.createElement("img");
  image.src = ppl[a];
  image.alt = "person";
  image.width = w;
  image.height = h;

  button.appendChild(image); //add image to button
  div.appendChild(button); //add button to the div
  document.body.appendChild(div); //add div to html/body
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
    } else if (sec < 0){
      sec = 59;
      min--;
    }
  }, 1000);
}

// Make the DIV element draggable:
dragElement(document.getElementById("bg"));

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  /*if (document.getElementById(elmnt.id + "header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }*/
  elmnt.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}


timer(5,0o00);

makePpl(0, 20, 50, "500px", "400px", 2);
makePpl(1, 20, 50, "800px", "300px", 4);
makePpl(2, 20, 50, "700px", "200px", 6);