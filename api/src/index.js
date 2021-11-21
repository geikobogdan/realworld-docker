const express = require("express");
const mongoose = require("mongoose");
const { port, authApiUrl } = require("./configuration");
const { connectDb } = require("./helpers/db");
const axios = require("axios");
const app = express();

const postSchema = new mongoose.Schema({
  name: String,
});

const Post = mongoose.model("Post", postSchema);

const startServer = () => {
  app.listen(port, () => {
    console.log(`Started api service on port: ${port}`);

    // Post.find((err, posts) => {
    //   if (err) return console.error(err);
    //   console.log("posts", posts);
    // });

    const silence = new Post({ name: "Silence2" });
    // silence.save((err) => {
    //   if (err) return console.error(err);
    // });
  });
};

app.get("/test", (req, res) => {
  res.send("Our api server is working correctly");
});

app.get("/api/testapidata", (req, res) => {
  res.json({
    testwithapi: true,
  });
});

app.get("/testwithcurrentuser", (req, res) => {
  axios.get(authApiUrl + "/currentUser").then((response) => {
    res.json({
      testwithcurrentuser: true,
      currentUserFromAuth: response.data,
    });
  });
});

connectDb()
  .on("error", console.log)
  .on("disconnected", connectDb)
  .once("open", startServer);
