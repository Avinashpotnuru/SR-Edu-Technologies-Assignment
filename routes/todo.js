const express = require("express");

const router = express.Router();

const TodoList = require("../models/todos");

//add contact

router.post("/addtodo", async (req, res) => {
  try {
    const { task } = req.body;
    const existTodo = await TodoList.findOne({ task });

    if (existTodo) {
      return res.status(200).json({ message: "already todo is exist" });
    }

    const newtodo = new TodoList({ task });
    await newtodo.save();
    return res.status(201).json({ message: "successfully add details" });
  } catch (err) {
    console.log(err);

    return res.status(500).json({ err: "Server error" });
  }
});

//get all contacts

router.get("/alltodos", async (req, res) => {
  try {
    const getContacts = await TodoList.find();
    res.status(200).json(getContacts);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Server error" });
  }
});

//delete contact

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await TodoList.findByIdAndDelete(id);
    return res.status(200).json({ message: "todo delete successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ err: "Server error" });
  }
});

//update contact

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const editTodo = await TodoList.findByIdAndUpdate(id, req.body);
    if (!editTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    return res.status(201).json({ message: "Todo edit successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Server error" });
  }
});

//update status

router.put("/updatestatus/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await TodoList.findById(id);
    if (todo) {
      todo.done = !todo.done;
      todo.save();
      return res.status(200).json({ message: `Your todo status is changed` });
    }

    return res.status(200).json(editTodo);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Server error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const getContacts = await TodoList.findById(id);
    if (getContacts) {
      res.status(200).json(getContacts);
    } else {
      return res.status(404).json({ message: "id not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Server error" });
  }
});

module.exports = router;
