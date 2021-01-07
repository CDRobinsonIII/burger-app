const express = require("express");

// Create router for the app.
const router = express.Router();

// Import the model (burger.js) to use its database functions.
const burger = require("../models/burger");

// Create all our routes and set up logic within those routes where required.


// Export routes for server.js to use.
module.exports = router;
