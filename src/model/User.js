const mongoose = require("mongoose");
const valid = require("validator");
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
    require: true,
    trim: true,
    minlength: 3,
  },
  phone: {
    type: String,
    unique: true,
    trim: true,
    require: true,
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    require: true,
    validate: {
      validator: (v) => {
        return valid.isEmail(v);
      },
      message: `{VALUE} is not Email`,
    },
  },
  password: {
    type: String,
    trim: true,
    minlength: 6,
    require: true,
  },
});

const User = mongoose.model("User", UserSchema);
module.exports = { User };
