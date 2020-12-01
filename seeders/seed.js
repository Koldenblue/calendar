let mongoose = require("mongoose");
let db = require("../models");

mongoose.connect("mongodb://localhost/calendar", {
  useNewUrlParser: true,
  useFindAndModify: false
});

// username 1, password 1
let seeder = 
{
  "username" : "1",
  "password" : "$2b$10$x0RdS0bqA11R9w/iljOVFe5TJOy5GQVvjiRYCqK4fscNyQAdppheW",
}

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
