let data = [
  { rank: 0, name: "dog", score: 0, color: "#66bb6a" },
  { rank: 0, name: "horse", score: 0, color: "#a1887f" },
  { rank: 0, name: "dove", score: 0, color: "#42a5f5" },
  { rank: 0, name: "cat", score: 0, color: "#ffa726" },
  { rank: 0, name: "spider", score: 0, color: "#ef5350" },
  { rank: 0, name: "fish", score: 0, color: "#5c6bc0" },
];

data
.sort ((a,b) => {
  if (b.score === a.score) {
    return a.name.localeCompare(b.name); //sort by name if scores are equal
  }
   return b.score - a.score; //sort by score in descending order
}
)