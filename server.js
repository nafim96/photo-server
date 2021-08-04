const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const PORT = process.env.PORT || 5000;
const app = express();

const uri = `mongodb+srv://${process.env.DB_ADMIN}:${process.env.DB_PASS}@cluster0.oli9n.mongodb.net/${process.env.DB_DATABASE}?retryWrites=true&w=majority`;

mongoose.connect(
  uri,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    console.log(`Database Connected Error( ${err})`);
  }
);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res, next) => {
  res.send("getting the new server");
});

// import router
const userRouter = require("./src/routes/user");
const productRouter = require("./src/routes/product");

app.use((req, res, next) => {
  console.log("I'm Middleware function");
  next();
});
//use user router
app.use("/api/users", userRouter);

//use Product router
app.use("/api/products", productRouter);

app.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT}`);
});
