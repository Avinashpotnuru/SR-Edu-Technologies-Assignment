const express = require("express");

const mongoose = require("mongoose");

const cors = require("cors");

mongoose
  .connect("mongodb://127.0.0.1:27017/todos", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connect"))
  .catch((err) => console.log(err));

const app = express();

app.use(express.json());
app.use(cors({ origin: "*" }));

app.use("/api/tasks/", require("./routes/todo"));

app.listen(4000, () => console.log("your server is started"));
