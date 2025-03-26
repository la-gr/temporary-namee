import express from 'express';
import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { Server } from "socket.io";

const app = express();
const server = createServer(app);
const io = new Server(server);

const __dirname = dirname(fileURLToPath(import.meta.url));

//Serve static files (HTML, CSS, JS) from the "public" folder
app.use(express.static(join(__dirname, 'public', 'src')));

//Route for map.html
app.get('/map', (req, res) => {
  res.sendFile(join(__dirname, 'public', 'src', 'map.html'));
});

let players = {};

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

  socket.on('user', ({ username }) => {
    players[username] = {username,x: 0, y: 0, image: "resources/gF.png" };
    io.emit("update players", players);
  });

  socket.on('send image', ({username, imageUrl}) => {
    if (players[username]) {
      players[username].image = imageUrl;
      io.emit("receive image", { username, imageUrl });
      io.emit('update players', players);
    }
  });

  // Listen for movement updates
  socket.on('move character', ({ username, x, y, image}) => {
    if (players[username]) {
      players[username].x = x;
      players[username].y = y;
      io.emit('update players', players); // Broadcast movement updates
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
    delete players[socket.id];
    io.emit("update players", players);
  });
});

//zaras section






//end
server.listen(5000, () => {
  console.log(`Server running at http://localhost:5000`);
});


