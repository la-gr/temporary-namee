let n = 0;
const ppl = ["../resources/wanted2.png", "../resources/wanted3.png"]; // array of people wanted posters
// the person is found
function pplSelect(r){
  if (r === n){
    document.getElementById("want").src=ppl[n];
    n++;
  }

}
