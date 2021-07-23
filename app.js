
require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const mongoose = require('mongoose');
const { removeWhiteSpaceFighters } = require("./fighterFakedata");
const Fighters = require('./models/fighters');
const async = require("async")
mongoose.connect(process.env.DB_HOST_URI, { useNewUrlParser: true, useUnifiedTopology: true });


const saveUser = user => {
  new Fighters(user).save().then(savedUser => {
    if (!savedUser) return console.log("Cant save user")

    return console.log("saved user", savedUser);
    // return res.status(200).json({ "success": savedUser });

  }).catch(error => console.log({ "error": "Can not save fighter at this time." }))
}

const func = () => {
  async.each(removeWhiteSpaceFighters, (fighter) => {
    saveUser(fighter);
  }, (err) => {
    // if any of the saves produced an error, err would equal that error
    return console.log("there was an error ");
  })
}




// app.get("/", (req, res) => {
//   // func();
//   return res.send("hello")
// })

app.get("/fighters", (req, res) => {
  Fighters.find({})
    .select("_id First_Name Last_Name Nickname Record")
    .exec()
    .then(allfighters => {
      // console.log(allfighters);
      return res.status(200).json(allfighters)
    }).catch(e => res.status(400).json({ "error": "Cant get all the fighters for some reason" }));
})

app.get("/fighters/:id", (req, res) => {
  let { id } = req.params;
  Fighters.findById(id)
    .then(foundFighter => {
      if (!foundFighter) {
        return res.status(400).json({ "error": "Cant get the fighter for some reason" });
      }
      return res.status(200).json(foundFighter);
    })
    .catch(e => res.status(400).json({ "error": "Cant get the fighter for some reason" }));
});


if (process.env.NODE_ENV === "production") {
  // set my static folder
  app.use(express.static("client/build"));
  // anything besides the api routes load
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}


app.listen(port, () => {
  console.log(`Listening on port ${port}`);
})