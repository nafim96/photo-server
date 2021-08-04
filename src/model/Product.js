const mongoose = require("mongoose");
const { Schema } = mongoose;

const ProductSchema = new Schema({
  image: {
    type: String,
    require: true,
  },
  title: {
    type: String,
    require: true,
    trim: true,
  },
  description: {
    type: String,
    require: true,
    trim: true,
  },
  price: {
    type: String,
    trim: true,
    require: true,
  },
});

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;
