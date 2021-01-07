const express = require("express");
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");

const app = express();

const PORT = process.env.PORT || 3000;

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// Parse request body as JSON.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Setup handlebars.
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import routes and give the server access to them.
var routes = require("./controllers/burgers_controller");
app.use(routes);

app.listen(PORT, function() {
    console.log("Server is listening on: http://localhost:" + PORT);
});