let n = 0;
const want = ["../resources/wanted2.png", "../resources/wanted3.png"]; // array of people wanted posters
const ppl = ["../resources/preson.png", "../resources/ppl2.png", "../resources/ppl3.png"];

// the person is found
function pplSelect(r) {
  if (r === n) {
    document.getElementById("want").src = want[n];
    n++;
  }
}

function makePpl(a, w, h, l, t){
  //create div container
  let div = document.createElement("div");
  div.classList.add("one");
  div.style.position = "absolute";
  div.style.left = l;
  div.style.top = t;
  let button = document.createElement("button");
  button.onclick= function() {
    pplSelect(a);
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

makePpl(0, 20, 50, "500px", "400px");
makePpl(1, 20, 50, "800px", "300px");
makePpl(2, 20, 50, "700px", "200px");


/*<button onClick="pplSelect(0)">
  <img src="../resources/preson.png" alt="buttonpng" width="20" height="50" />
</button>*/