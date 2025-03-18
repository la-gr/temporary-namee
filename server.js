require("dotenv").config(); // loads environment variables (keep sensitive information (like database credentials) out of code)
const express = require("express"); // web framework for handling routes and HTTP requests.
const mongoose = require("mongoose"); // connects to MongoDB (tool that helps manage databases) and manages the database.
const bcrypt = require("bcryptjs"); // hashes passwords securely before saving them.
const jwt = require("jsonwebtoken"); // generates authentication tokens (JWT) to verify users
const cors = require("cors"); //allows the frontend (running on a different port) to communicate with the backend.

const app = express(); //handles requests and responses
app.use(express.json()); // parses JSON requests (a tool that is used to store and transport data)
app.use(cors()); //allows our server to handle requests from different origins
