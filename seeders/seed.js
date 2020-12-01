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
  "password" : "$2b$10$krPrXpq6wZZ5LF2hp6yjhewdJ.Uv9f5QtG5FIz97PzFQp2RViehxm",
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
