const Todo = require("../models/todo.model");

exports.addTodo = async function (req, res, next) {
  const { text: todoText } = req.body;
  const todo = new Todo(todoText);

  try {
    const result = await todo.create();
    const insertedId = result.insertedId;
    todo.id = insertedId.toString();
    return res.status(201).json({
      message: "Added todo successfully!",
      todo,
    });
  } catch (err) {
    return next(err);
  }
};

exports.getAllTodos = async function (req, res, next) {
  try {
    const todos = await Todo.getAllTodos();
    return res.status(200).json({
      todos,
    });
  } catch (err) {
    return next(err);
  }
};

exports.updateTodo = function (req, res, next) {};

exports.deleteTodo = function (req, res, next) {};
