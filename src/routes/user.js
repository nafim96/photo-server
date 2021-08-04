const express = require("express");
const router = express.Router();
const {
  getAllUserController,
  createUserController,
  loginUserController,
} = require("../controller/user");

const { protected } = require("../middleware/authenticate");

// get method
router.get("/", protected, getAllUserController);

// login user use post method
router.post("/login", loginUserController);

// register user use post method
router.post("/register", createUserController);

module.exports = router;
