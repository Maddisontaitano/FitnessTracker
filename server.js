//adding requiring dependencies 
var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");

//adding required files 
var db = require("./models");

//setting port number
var PORT = 3000;
var PORT = process.env.PORT || 3001;

var app = express();

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

//connects database 
mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost/tranquil-earth',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }
);
//requiring routes
app.use(require("./routes/api-routes.js"));
app.use(require("./routes/html-routes.js"));

//making sure app is running with a console 
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});