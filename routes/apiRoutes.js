const router = require("express").Router();
const axios = require("axios");
const db = require("../models")
const passport = require("../config/passport");
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
  console.log('The user is, api routes: ', user);
  console.log(req.body);
  db.User.findById(user._id).then(userData => {
    console.log(userData);
    userData['events'].push(req.body);
    userData.save();
  })
  res.json();
})

router.get('/events', (req, res) => {
  // get all data except username and password. this will be the events data.
  let user = req.user;
  if (user) {
    db.User.findById(user._id).then(userData => {
      const { username, password, ...data } = userData._doc;
      return res.json(data).end();
    }).catch(err=> console.error(err))
  } else {
    res.json(null)
  }
})

module.exports = router;