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

// ENTRIES
router.get("/entry",(req,res) => {
  console.log(req.query._id);
  Entry.find({
    _id:req.query._id
  }).then((entry) => {
    res.send(entry);
  })
});

router.get("/entries",(req,res) => {
  console.log(req.query);
  console.log(req.query.user_id);
  if (req.query.colorMood !== 'null' && req.query.colorMood){
    Entry.find({
      month:req.query.month, 
      year: req.query.year,
      user_id: req.query.user_id, 
      colorMood: req.query.colorMood,
    }).sort({day: -1, creationDate: -1}).then((entries) => {
      res.send(entries);
    });
  } else{
    Entry.find({
      month:req.query.month, 
      year: req.query.year,
      user_id: req.query.user_id, 
      // journal:req.query.journal
    }).sort({day: -1, creationDate: -1}).then((entries) => {
      res.send(entries);
    });
  }
});

router.post("/entries",(req,res) => {
  const newEntry = new Entry({
    user_id: req.body.user_id,
    title: req.body.title,
    month: req.body.month,
    year: req.body.year,
    day: req.body.day,
    content: req.body.content,
    jsonContent: req.body.jsonContent,
    creationDate: req.body.creationDate,
    tags: req.body.tags,
    colorMood: req.body.colorMood,
    heartRateData: req.body.heartRateData,
    timeHRData: req.body.timeHRData,
    avgHR: req.body.avgHR,
    imageName: req.body.imageName,
  });
  newEntry.save().then(() => {
    console.log("Successfully added new entry!");
    // const response = {
    //   message: "Successfullly sent post request to API\n".concat(req.body.journal),
    //   tags: req.body.tags
    // }
    // res.send(response);
  })
});

router.post("/editEntry", (req,res) => {
  Entry.updateOne(
    {_id: req.body._id},
    { $set: {
        title: req.body.title,
        content: req.body.content,
        jsonContent: req.body.jsonContent,
        colorMood: req.body.colorMood,
        imageName: req.body.imageName,
        tags: req.body.tags,
      }
    }).then((response) => {
      console.log(response);
      res.send(response);
    });
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
    tags: [],
  });
  newEntry.save().then(()=> {
    console.log("We got a new User!");
  })
});

// tags
router.get("/tags", auth.ensureLoggedIn, (req,res) => {
  User.findById(req.user._id).then(user => {
    console.log(user.tags);
    res.send(user.tags);
  })
})

router.post("/tags", auth.ensureLoggedIn, (req,res) => {
  console.log(req.body.newTags);
  console.log(Object(req.user._id));
  User.updateOne(
    {_id: Object(req.user._id)},
    { $set: {
      tags: req.body.newTags,
    }}
  ).then((response) => {
    res.send(response);
  })
})

//images
router.post("/uploadImage", auth.ensureLoggedIn, (req, res) => {
  console.log("in /api/uploadImage");
  if (typeof (req.body.image) !== 'string') {
    throw new Error("Can only handle images encoded as strings. Got type: "
      + typeof (req.body.image));
  }
  uploadImagePromise(req.body.image).then(imageName => {
    console.log(imageName);
    res.send({image: imageName});
  }).catch(err => {
      console.log("ERR: upload image: " + err);
      res.status(500).send({
        message: "error uploading",
      });
    })
  // User.findById(req.user._id).then(user => {
  //   if (user.imageNames.length >= 1) {
  //     // don't allow anyone to have more than 3 images (not race condition safe)
  //     res.status(412).send({
  //       message: "You can't post a new image! You already have 1!"
  //     });
  //     console.log("You can't post a new image! You already have 1!");
  //   }
  //   // only start uploading the image once we know we really want to, since
  //   // uploading costs money! (if you do it too much)
  //   return uploadImagePromise(req.body.image);
  // }).then(imageName => {
  //   return User.updateOne({ _id: req.user._id },
  //     { $push: { imageNames: imageName } });
  // }).then(user => {
  //   res.send({}); // success!
  // }).catch(err => {
  //   console.log("ERR: upload image: " + err);
  //   res.status(500).send({
  //     message: "error uploading",
  //   });
  // })
});

router.get("/getImage", auth.ensureLoggedIn, (req, res) => {
  console.log("in /api/getImage");
  console.log(req.query.image);
  downloadImagePromise(req.query.image).catch(err => "Err: could not find image").then(image => {
    // console.log(image);
    res.send({image, imageName:req.query.image});
  }).catch(err => {
        console.log("ERR getImages this shouldn't happen");
        res.status(500).send({
          message: "unknown error"
        });
      });
  // User.findById(req.user._id).then(user => {
  //   Promise.all(
  //     user.imageNames.map(imageName => downloadImagePromise(imageName)
  //       .catch(err => "Err: could not find image"))
  //   ).then(images => {
  //     res.send(images);
  //   }).catch(err => {
  //     console.log("ERR getImages this shouldn't happen");
  //     res.status(500).send({
  //       message: "unknown error"
  //     });
  //   });
  // });
});

router.post("/deleteImage", auth.ensureLoggedIn, (req, res) => {
  console.log("in /api/deleteImage");
  const imageName = req.body.image;
  Promise.all([deleteImagePromise(imageName),Promise.resolve(imageName)]).then(successesAndNames => {
    console.log(successesAndNames);
    return successesAndNames.filter(
      successAndName => successAndName[0]).map(
        successAndName => successAndName[1]);
    }).then((removedNames) => {
      res.send({});
    });
  // User.findById(req.user._id).then(user => {
  //   return Promise.all(user.imageNames.map(imageName => {
  //     return Promise.all([deleteImagePromise(imageName), Promise.resolve(imageName)])
  //   }));
  // }).then(successesAndNames => {
  //   // get names of removed images
  //   console.log(successesAndNames);
  //   return successesAndNames.filter(
  //     successAndName => successAndName[0]).map(
  //       successAndName => successAndName[1]);
  // }).then((removedNames) => {
  //   return User.findOneAndUpdate({ _id: req.user._id },
  //     { $pullAll: { imageNames: removedNames } }); // remove those names from the document
  // }).then(user => {
  //   // success!
  //   res.send({});
  // }).catch(err => {
  //   console.log("ERR: failed to delete image: " + err);
  //   res.status(500).send()
  // });
});


// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
