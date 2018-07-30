const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const user = require('../models/user');
const bcrypt = require('bcryptjs');

class UserController {
  static register(req, res) {
    bcrypt.hash(req.body.password, 10)
      .then((encryptedPsw) => {
        user.create({
            email: req.body.email,
            name: req.body.name,
            password: encryptedPsw,
          })
          .then((response) => {
            res
              .status(200)
              .send(response);
          })
          .catch((err) => {
            res
              .status(400)
              .send(err);
          });
      })
      .catch((err) => {
        res
          .status(500)
          .send(err);
      });
  }

  static login(req, res) {
    user.find({
      email: req.body.email,
    })
    .then((userData) => {
      bcrypt.compare(req.body.password, userData[0].password, function (err, response) {
        console.log(response);
        if (err) {
          res
            .status(500)
            .send(err)
        } else {
          if (response === false) {
            res
              .status(401)
              .send(err)
          } else {
            jwt.sign({
              _id: userData[0]._id,
              name: userData[0].name,
              email: userData[0].email,
            }, process.env.JWT_SECRET_KEY, function (err, newlyCreatedJwtToken) {
              if (err) {
                res
                  .status(500)
                  .send(err)
              } else {
                console.log(newlyCreatedJwtToken);
                res
                  .status(200)
                  .send(newlyCreatedJwtToken)
              }
            });
          }
        }
      });
    })
    .catch((err) => {
      res
        .status(400)
        .send(err)
    })
  }
}

module.exports = UserController;
