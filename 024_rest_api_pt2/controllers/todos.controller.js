const Todo = require("../models/todo.model");

exports.addTodo = async (req, res, next) => {
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

exports.getAllTodos = async (req, res, next) => {
  try {
    const todos = await Todo.getTodos();
    return res.status(200).json({
      todos,
    });
  } catch (err) {
    return next(err);
  }
};

exports.updateTodo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { newText } = req.body;

    const todo = new Todo(newText, id);
    await todo.update();
    return res.status(200).json({
      message: "Todo updated!",
      updatedTodo: todo,
    });
  } catch (err) {
    return next(err);
  }
};

exports.deleteTodo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const todo = new Todo(null, id);
    await todo.delete();
    return res.status(200).json({
      message: "Todo deleted!",
    });
  } catch (err) {
    return next(err);
  }
};
