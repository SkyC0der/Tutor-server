const express = require("express");
const app = express();
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const categoryRoutes = require("./routes/category")
const {endpoint , port } = require("./config");
mongoose.connect(
  "mongodb+srv://skycoder:skycoding@cluster0-bzh78.mongodb.net/test?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  ).then(result => {
    console.log("Database connected");
    app.listen(port);
  })
  .catch(err => console.log(err));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(authRoutes);
  app.use(categoryRoutes);

app.use((req, res) => {
    res.send("<h1>Welcome to Tutor Server</h1>");
  });


