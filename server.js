const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./routes/api/user/user");
const tripRouter = require("./routes/api/trip/trip");
require("dotenv").config();

const mongoUrl = process.env.NODE_ENV === "dev" ? process.env.MONGO_URL_DEV : process.env.MONGO_URL_PROD;

console.log(mongoUrl)
console.log(process.env.NODE_ENV, typeof process.env.NODE_ENV, process.env.NODE_ENV.toString()=="dev");

mongoose
  .connect(mongoUrl, { useNewUrlParser: true, useCreateIndex: true })
  .then(() => console.log("Connected sucessfully"))
  .catch(err => console.log(err));

const app = express();

//allow cors nodejs
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization, fingerprint, token'
  );
  res.header(
      'Access-Control-Allow-Methods',
      'PUT, POST, GET, DELETE, OPTIONS'
  );
  next();
});

app.use("/", express.static("public"));

//middleware parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//middleware serve static files
app.use("/upload/avatar", express.static("./upload/avatar"));

const port = process.env.PORT; //biến môi trường //trên terminal để set port: $env:PORT = 1234

//router handle
app.use("/api/users", userRouter);
app.use("/api/trips", tripRouter);

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
