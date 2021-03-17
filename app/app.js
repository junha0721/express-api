var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/ExpressAPI", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("error", function (err) {
  console.error("MongoDB connection error: " + err);
  process.exit(-1);
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 3000;

// app.get("/api/v1/", function (req, res) {
//   res.json({
//     message: "Hello, world",
//   });
// });

var router = require("./models/routes/v1/");
app.use("/api/v1/", router);

app.listen(port, "0.0.0.0");
console.log("listen on port " + port);
