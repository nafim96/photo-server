const { User } = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { restart } = require("nodemon");
const saltRound = 16;
require("dotenv").config({ path: "../../.env" });

// Get all User from api
const getAllUserController = (req, res, next) => {
  User.find()
    .then((user) => {
      res.status(201).json({
        message: "Get All User Successfully",
        user,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Something Error From Your",
        Error: err.message,
      });
    });
};

// create new user
const createUserController = (req, res, next) => {
  const name = req.body.name;
  const phone = req.body.phone;
  const email = req.body.email;
  const password = req.body.password;

  bcrypt.hash(password, saltRound, (err, hash) => {
    if (err) {
      res.json({
        error: err.message,
      });
    } else {
      const user = new User({
        name,
        phone,
        email,
        password: hash,
      });

      user
        .save()
        .then((result) => {
          res.status(201).json({
            message: "User Successfully Created",
            result,
          });
        })
        .catch((err) => {
          res.status(500).json({
            message: "Please Provide Unique Phone and Email",
            error: err.message,
          });
        });
    }
  });
};

// Login user
const loginUserController = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email: email }).then((user) => {
    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          res.status(500).json({
            error: err.message,
          });
        }
        if (result) {
          let token = jwt.sign(
            { email: user.email, _id: user.id },
            `${process.env.TOKEN_SECRET}`,
            { expiresIn: "3h" }
          );

          res.status(200).json({
            message: "User Login Successfully Done",
            token,
          });
        } else {
          res.status(404).json({
            message: "Login Failed Password Don't Match",
          });
        }
      });
    } else {
      res.json({
        message: "Authentication Failed",
      });
    }
  });
};

module.exports = {
  getAllUserController,
  createUserController,
  loginUserController,
};
