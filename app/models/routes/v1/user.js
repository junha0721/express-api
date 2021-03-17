var express = require("express");
var router = express.Router();
var UserModel = require("../../../models/userModel.js");

router.post("/", function (req, res) {
  var User = new UserModel();

  User.name = req.body.name;
  User.screen_name = req.body.screen_name;
  User.bio = req.body.bio;

  User.save(function (err) {
    if (err) {
      res.send(err);
    } else {
      res.json({ message: "Success!!" });
    }
  });
});

router.get("/", function (req, res) {
  UserModel.find().then(function (users) {
    res.json(users);
  });
});

router.get("/:id", function (req, res) {
  var Userid = req.params.id;
  UserModel.findById(Userid, function (err, user) {
    res.json(user);
  });
});

router.put("/:id", function (req, res) {
  var Userid = req.params.id;

  UserModel.findById(Userid, function (err, user) {
    if (err) {
      res.send(err);
    } else {
      user.name = req.body.name;
      user.screen_name = req.body.screen_name;
      user.bio = req.body.bio;

      user.save(function (err) {
        if (err) {
          res.send(err);
        } else {
          res.json({ message: "Success!" });
        }
      });
    }
  });
});

router.delete("/:id", function (req, res) {
  var Userid = req.params.id;
  UserModel.deleteMany({ _id: Userid }).then(function () {
    res.json({ message: "Success!!" });
  });
});

module.exports = router;
