const router = require("express").Router();
const todosController = require("../controllers/todos.controller");

router.get("/", todosController.getAllTodos);
router.post("/", todosController.addTodo);
router.patch("/:id", todosController.updateTodo);
router.delete("/:id", todosController.deleteTodo);

module.exports = router;
