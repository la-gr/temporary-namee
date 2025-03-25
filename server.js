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

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

  socket.on("send image", (imageUrl) => {
    io.emit("receive image", imageUrl); // Send to all clients
  });

  // Listen for movement updates
  socket.on("move character", (data) => {
    io.emit("update character", data); // Send movement to all players
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

//zaras section






//end
server.listen(3000, () => {
  console.log(`Server running at http://localhost:3000`);
});


