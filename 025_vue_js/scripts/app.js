const { createApp } = Vue;

const TodosApp = {
  data() {
    return {
      todos: [],
      enteredTodoText: "",
      editedTodoId: null,
    };
  },
  methods: {
    saveTodo(event) {
      event.preventDefault();
      if (this.editedTodoId) {
        this.updateTodo();
        return;
      }
      const newTodo = {
        text: this.enteredTodoText,
        id: new Date().toISOString(),
      };
      this.todos.push(newTodo);
      this.enteredTodoText = "";
    },
    startEditTodo(todoId) {
      this.editedTodoId = todoId;
      const todo = this.todos.find((item) => item.id === todoId);
      this.enteredTodoText = todo.text;
    },
    updateTodo() {
      if (!this.editedTodoId) {
        return;
      }
      const todoIndex = this.todos.findIndex(
        (item) => item.id === this.editedTodoId
      );
      const updatedTodoItem = {
        id: this.todos[todoIndex].id,
        text: this.enteredTodoText,
      };

      this.todos[todoIndex] = updatedTodoItem;
      this.editedTodoId = null;
      this.enteredTodoText = "";
    },
  },
};

createApp(TodosApp).mount("#todos-app");
