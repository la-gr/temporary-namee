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

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(5000, () => {
  console.log(`Server running at http://localhost:5000`);
});
