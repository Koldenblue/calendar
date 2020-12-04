const router = require("express").Router();
const axios = require("axios");
const db = require("../models")
const passport = require("../config/passport");
const mongoose = require("mongoose");
require("dotenv").config();
// Routes starting with '/api/'

router.post('/login', passport.authenticate("local"), (req, res) => {
  let response = {
    username: req.user.username,
    id: req.user._id,
  }
  res.json(response);
})

router.get('/logout', (req, res) => {
  req.logout();
  res.status(200).end();
})

router.post('/users', (req, res) => {
	db.User.create(req.body).then((data) => {
		res.status(200).end();
	}).catch((err) => {
		try {
			err.errors.password.properties.message === "Password must be at least 6 characters." ? res.json(err.errors.password.properties.message) : null;
		}
		catch (undefErr) {
			if (err.code) {
				err.code === 11000 ? res.json("That username already exists!") : null;
			}
		}
	})
})

router.get("/userdata", (req, res) => {
  let user = req.user;
  // console.log(req)
  // console.log('apiRoutes.js', user)
  if (user) {
    db.User.findById(user._id).then(userData => {
      // separate the password from the rest of the data, and respond with data
      const { password, ...data } = userData._doc;
      return res.json(data).end();
    }).catch(err=> console.error(err))
  } else {
    res.json(null)
  }
})

// post a new event
router.post('/events', (req, res) => {
  let user = req.user;
  // console.log('The user is, api routes: ', user);
  // console.log(req.body);
  db.User.findById(user._id).then(userData => {
    // console.log(userData);
    userData['events'].push(req.body);
    userData.save();
  })
  res.status(200).end();
})

router.get('/events', (req, res) => {
  // get all data except username and password. this will be the events data.
  let user = req.user;
  if (user) {
    db.User.findById(user._id).then(userData => {
      const { _id, username, password, __v, ...data } = userData._doc;
      return res.json(data).end();
    }).catch(err=> console.error(err))
  } else {
    res.json(null)
  }
})
// update an existing event
router.put('/events', (req, res) => {
  let user = req.user;
  console.log(req.body)
  db.User.findById(user._id).then(doc => {
    const eventDoc = doc.events.id(req.body.targetId);
    eventDoc.name = req.body.name;
    eventDoc.location = req.body.location;
    eventDoc.description = req.body.description;
    // Mongoose does not save subdocs. Have to save whole doc.
    doc.save();
    res.status(200).end();
  }).catch(err => console.error(err))
})

router.delete('/events', (req, res) => {
  console.log(req.query.targetId)
  let user = req.user;
  db.User.findById(user._id).then(doc => {
    doc.events.id(req.query.targetId).remove();
    doc.save();
    res.status(200).end();
  })
})

// gets data for one event in order to fill out modal fields
router.get('/fillmodal/:targetid', (req, res) => {
  let targetId = new mongoose.Types.ObjectId(req.params.targetid);
  // Alternative: can also use req.user._id to a doc with findById
  db.User.findOne({ 'events._id': targetId }).then(doc => {
    // doc.events.isMongooseArray  // returns true
    // a Mongoose Array is an array of subdocuments, and can use the method below to find an id of a particular array index
    const eventDoc = doc.events.id(targetId)
    res.json(eventDoc)
  }).catch(err => {
    console.error(err)
  })
})


module.exports = router;