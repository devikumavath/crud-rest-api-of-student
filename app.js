const express = require("express");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const mongoose = require("mongoose");
const dburl = process.env.DATABASE;

const app = express();

app.use(express.json());

const routes = require("./routes/studentrouter");

app.use("/api", routes);

mongoose
  .connect(dburl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connected to MongoDB Atlas!");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB Atlas: ", error);
  });

app.listen(3000, () => {
  console.log("server listening on port 3000");
});
