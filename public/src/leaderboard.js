import {money} from './game.js';

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

displayLeaderboard()
