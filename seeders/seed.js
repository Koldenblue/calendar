let mongoose = require("mongoose");
let db = require("../models");

mongoose.connect("mongodb://localhost/calendar", {
  useNewUrlParser: true,
  useFindAndModify: false
});

// username 1, password 1.
let seeder = 
{
  "username" : "1",
  "password" : "$2b$10$u/6wwHmHTj7Q5q48De1/FO.UT2FQ7DvvO2ptjUx8/NYWyHUlAbhSq",
  "events" : [],
}

// delete all user data then insert username and password above.
  db.User.deleteMany({})
  .then(() => db.User.insertMany(seeder))
  .then(data => {
    console.log(data + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
