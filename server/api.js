/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

const express = require("express");

// import models so we can interact with the database
const User = require("./models/user");
const Entry = require("./models/entry");
const Journal = require("./models/journal");

// import authentication library
const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

//initialize socket
const socketManager = require("./server-socket");

router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/whoami", (req, res) => {
  if (!req.user) {
    // not logged in
    return res.send({});
  }

  res.send(req.user);
});

router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  if (req.user) socketManager.addUser(req.user, socketManager.getSocketFromSocketID(req.body.socketid));
  res.send({});
});

// |------------------------------|
// | write your API methods below!|
// |------------------------------|

router.get("/entries",(req,res) => {
  Entry.find({
    month:req.query.month, 
    year: req.query.year, 
    journal:req.query.journal
  }).then((entries) => {
    res.send(entries);
  });
});

router.post("/entries",(req,res) => {
  const newEntry = new Entry({
    journal: req.body.journal,
    title: req.body.title,
    month: req.body.month,
    year: req.body.year,
    day: req.body.day,
    content: req.body.content,
    lastModDate: req.body.lastModDate,
    tags: req.body.tags,
    colorMood: req.body.colorMood,
    heartRateData: req.body.heartRateData,
    samplingRate: req.body.samplingRate,
  });
  newEntry.save().then(() => {
    console.log("Successfully added new entry!");
  })
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
