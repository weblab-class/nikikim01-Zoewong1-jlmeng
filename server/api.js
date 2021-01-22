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

//for uploading images
const { uploadImagePromise, deleteImagePromise, downloadImagePromise } = require("./storageTalk.js");

const user_name = "Zoe Test"

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

//images

router.post("/uploadImage", auth.ensureLoggedIn, (req, res) => {
  if (typeof (req.body.image) !== 'string') {
    throw new Error("Can only handle images encoded as strings. Got type: "
      + typeof (req.body.image));
  }
  User.findById(req.user._id).then(user => {
    if (user.imageNames.length >= 1) {
      // don't allow anyone to have more than 3 images (not race condition safe)
      res.status(412).send({
        message: "You can't post a new image! You already have 3!"
      });
    }
    // only start uploading the image once we know we really want to, since
    // uploading costs money! (if you do it too much)
    return uploadImagePromise(req.body.image);
  }).then(imageName => {
    return User.updateOne({ _id: req.user._id },
      { $push: { imageNames: imageName } });
  }).then(user => {
    res.send({}); // success!
  }).catch(err => {
    console.log("ERR: upload image: " + err);
    res.status(500).send({
      message: "error uploading",
    });
  })
});

router.get('/getImages', auth.ensureLoggedIn, (req, res) => {
  User.findById(req.user._id).then(user=>{
    Promise.all(
      user.imageNames.map(imageName => downloadImagePromise(imageName).catch( err =>
        "Err: could not find image"))).then(images =>
          {res.send(images);}).catch(err =>{
            console.log("ERR getImages this shouldn't happen!");
            res.status(500).send({
              message: "unknown error"
            });
          });
  })
})


router.post("/deleteImages", auth.ensureLoggedIn, (req, res) => {
  User.findById(req.user._id).then(user=> {
    return Promise.all(user.imageNames.map(imageName => {
      return Promise.all([deleteImagePromise(imageName), Promise.resolve(imageName)])
    }));
  }).then(successesAndNames => {
    //get names of removed images
    return successesAndNames.filter(
      successAndName => successAndName[0]).map(
        successAndName => successAndName[1]);
  }).then((removedNames)=>{
    return User.findOneAndUpdate({_id:req.user._id},
      {$pullAll: { imageNames: removedNames}}); // remove those names
  }).then(user=> {
    // success!
    res.send({});
  }).catch(err => {
    console.log("ERR: failed to delete image: " + err);
    res.status(500).send()
  });
});

// ENTRIES
router.get("/entry",(req,res) => {
  Entry.find({
    _id:req.query._id
  }).then((entry) => {
    res.send(entry);
  })
});

router.get("/entries",(req,res) => {
  Entry.find({
    month:req.query.month, 
    year: req.query.year, 
    // journal:req.query.journal
  }).sort({day: 1}).then((entries) => {
    res.send(entries);
  });
});

router.post("/entries",(req,res) => {
  const newEntry = new Entry({
    user_id: req.body.user_id,
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
    // const response = {
    //   message: "Successfullly sent post request to API\n".concat(req.body.journal),
    //   tags: req.body.tags
    // }
    // res.send(response);
  })
  const response = {
    message: "Successfullly sent post request to API\n".concat(req.body.journal),
    tags: req.body.tags
  }
  res.send(response);
});

// USER
router.get("/user", (req, res) => {
  User.findById(req.query.userid).then((user) => {
    res.send(user);
  });
});

router.post("/user", (req, res) => {
  const newUser = new User({
    name: req.body.name,
    googleid: req.body.googleid,
    avgRBPM: req.body.avgRBPM,
    imageNames: [String],
  });
  newEntry.save().then(()=> {
    console.log("We got a new User!");
  })
});

// JOURNAL

//images
router.post("/uploadImage", auth.ensureLoggedIn, (req, res) => {
  if (typeof (req.body.image) !== 'string') {
    throw new Error("Can only handle images encoded as strings. Got type: "
      + typeof (req.body.image));
  }
  User.findById(req.user._id).then(user => {
    if (user.imageNames.length >= 3) {
      // don't allow anyone to have more than 3 images (not race condition safe)
      res.status(412).send({
        message: "You can't post a new image! You already have 3!"
      });
    }
    // only start uploading the image once we know we really want to, since
    // uploading costs money! (if you do it too much)
    return uploadImagePromise(req.body.image);
  }).then(imageName => {
    return User.updateOne({ _id: req.user._id },
      { $push: { imageNames: imageName } });
  }).then(user => {
    res.send({}); // success!
  }).catch(err => {
    console.log("ERR: upload image: " + err);
    res.status(500).send({
      message: "error uploading",
    });
  })
});

router.get("/getImages", auth.ensureLoggedIn, (req, res) => {
  User.findById(req.user._id).then(user => {
    Promise.all(
      user.imageNames.map(imageName => downloadImagePromise(imageName)
        .catch(err => "Err: could not find image"))
    ).then(images => {
      res.send(images);
    }).catch(err => {
      console.log("ERR getImages this shouldn't happen");
      res.status(500).send({
        message: "unknown error"
      });
    });
  });
});

router.post("/deleteImages", auth.ensureLoggedIn, (req, res) => {
  User.findById(req.user._id).then(user => {
    return Promise.all(user.imageNames.map(imageName => {
      return Promise.all([deleteImagePromise(imageName), Promise.resolve(imageName)])
    }));
  }).then(successesAndNames => {
    // get names of removed images
    return successesAndNames.filter(
      successAndName => successAndName[0]).map(
        successAndName => successAndName[1]);
  }).then((removedNames) => {
    return User.findOneAndUpdate({ _id: req.user._id },
      { $pullAll: { imageNames: removedNames } }); // remove those names from the document
  }).then(user => {
    // success!
    res.send({});
  }).catch(err => {
    console.log("ERR: failed to delete image: " + err);
    res.status(500).send()
  });
});



// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
