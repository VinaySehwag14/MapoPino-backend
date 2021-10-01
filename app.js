require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const pinRoute = require("./routes/pins");
const userRoute = require("./routes/users");
const cors = require("cors");
app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => {
    console.log(err);
  });

//*, Authorization (removed)
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin , X-Requested-With, Content-Type , Accept"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE");

  next();
});

app.use("/api/pins", pinRoute);
app.use("/api/users", userRoute);

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server is running on ${port} PORT`);
});
