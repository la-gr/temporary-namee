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
app.use(express.static(join(__dirname, 'public')));

//Route for serv.html
app.get('/serv', (req, res) => {
  res.sendFile(join(__dirname, 'public', 'serv.html'));
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

server.listen(4000, () => {
  console.log(`Server running at http://localhost:4000`);
});






/*require("dotenv").config(); // loads environment variables (keep sensitive information (like database credentials) out of code)
const express = require("express"); // web framework for handling routes and HTTP requests.
const mongoose = require("mongoose"); // connects to MongoDB (tool that helps manage databases) and manages the database.
const bcrypt = require("bcryptjs"); // hashes passwords securely before saving them.
const jwt = require("jsonwebtoken"); // generates authentication tokens (JWT) to verify users
const cors = require("cors"); //allows the frontend (running on a different port) to communicate with the backend.

const app = express(); //handles requests and responses
app.use(express.json()); // parses JSON requests (a tool that is used to store and transport data)
app.use(cors()); //allows our server to handle requests from different origins*/
