const Product = require("../model/Product");

// get Product controller
const getAllProductController = (req, res, next) => {
  Product.find()
    .then((user) => {
      res.status(200).json({
        message: "Get All Product Successfully",
        user,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Something Error From Your server",
        Error: err.message,
      });
    });
};

// create product controller
const createAllProductController = (req, res, next) => {
  const image = req.body.file[0];
  const title = req.body.title;
  const description = req.body.description;
  const price = req.body.price;

  const product = new Product({
    image,
    title,
    description,
    price,
  });

  product
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Product Successfully Post",
        result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Please Provide All Data",
        error: err.message,
      });
    });
};

// get single product
const getSingleProductController = (req, res, next) => {
  const id = req.prams.id;
  Product.findById(id)
    .then((result) => {
      res.status(200).json({
        message: "Get Product By Single Id",
        result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Something Error from your server",
        error: err.message,
      });
    });
};

// update product by single id
const updateProductController = (req, res, next) => {
  const id = req.prams.id;

  const updateProduct = {
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
  };

  Product.findByIdAndUpdate(id, { $set: updateProduct })
    .then((result) => {
      Product.findById(product._id).then((newProduct) => {
        res.status(205).json({
          message: "Your Product Updated Now",
          result,
        });
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Something Error from your server",
        error: err.message,
      });
    });
};

// delete product by id
const deleteProductController =(req, res, next)=>{
    const id = req.prams.id;

    Product.findByIdAndDelete(id)..then((result) => {
        res.json({
          message: "Product successfully Deleted",
          result,
        });
      })
      .catch((err) => {
        res.status(500).json({
          message: "Something Error from your server",
          error: err.message,
        });
      });
}

module.exports ={
    getAllProductController,
    createAllProductController,
    updateProductController,
    getSingleProductController,
    deleteProductController
}