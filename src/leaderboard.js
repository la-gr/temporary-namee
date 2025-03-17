let data = [
  {name:"bob", score:10},
  {name:"jim", score:100},
  {name:"joe", score:0},
];

//display leaderboard
function displayLeaderboard() {
  const leaderboard = document.getElementById('leaderboard');
  leaderboard.innerHTML = ''; //clears the previous content in table


  data
    .sort ((a,b) => {
      if (b.score === a.score) {
        return a.name.localeCompare(b.name); //sort by name if scores are equal
      } else
      return b.score - a.score; //sort by score in descending order
    });

  data.forEach((data, index) => {
    let row = `<tr>
        <td>${index + 1}</td>
        <td>${data.name}</td>
        <td>${data.score}</td>
    </tr>`;
    leaderboard.innerHTML += row;
  });
}

displayLeaderboard()
