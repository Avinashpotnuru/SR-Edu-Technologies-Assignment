const mongoose = require("mongoose");

const Todo = new mongoose.Schema({
  task: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return value.length >= 1;
      },
      message: "Name must be at least 1 characters long",
    },
  },
  done: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("todos", Todo);
