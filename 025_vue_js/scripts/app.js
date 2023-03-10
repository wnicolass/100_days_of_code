const { createApp } = Vue;

const TodosApp = {
  data() {
    return {
      isLoading: false,
      todos: [],
      enteredTodoText: "",
      editedTodoId: null,
    };
  },
  async created() {
    let response;

    this.isLoading = true;
    try {
      response = await fetch("http://localhost:3000/todos");
    } catch (error) {
      alert("Something went wrong!");
      this.isLoading = false;
      return;
    }
    this.isLoading = false;

    if (!response.ok) {
      alert("Something went wrong!");
      return;
    }

    const responseData = await response.json();
    this.todos = responseData.todos;
  },
  methods: {
    async saveTodo(event) {
      event.preventDefault();
      if (this.editedTodoId) {
        return this.updateTodo();
      }

      let response;
      try {
        response = await fetch("http://localhost:3000/todos", {
          method: "POST",
          body: JSON.stringify({
            text: this.enteredTodoText,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
      } catch (error) {
        alert("Something went wrong!");
        return;
      }

      if (!response.ok) {
        alert("Something went wrong!");
        return;
      }

      const responseData = await response.json();
      const newTodo = {
        text: this.enteredTodoText,
        id: responseData.todo.id,
      };

      this.todos.push(newTodo);
      this.enteredTodoText = "";
    },

    startEditTodo(todoId) {
      this.editedTodoId = todoId;
      const todo = this.todos.find((item) => item.id === todoId);
      this.enteredTodoText = todo.text;
    },

    async updateTodo() {
      if (!this.editedTodoId) {
        return;
      }

      const todoIndex = this.todos.findIndex(
        (item) => item.id === this.editedTodoId
      );
      const updatedTodoItem = {
        text: this.enteredTodoText,
        id: this.todos[todoIndex].id,
      };

      this.todos[todoIndex] = updatedTodoItem;
      let response;

      try {
        response = await fetch(
          "http://localhost:3000/todos/" + this.editedTodoId,
          {
            method: "PATCH",
            body: JSON.stringify({
              newText: this.enteredTodoText,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      } catch (error) {
        alert("Something went wrong!");
        console.log(error.message);
        return;
      }

      if (!response.ok) {
        alert("Something went wrong!");
        return;
      }

      this.editedTodoId = null;
      this.enteredTodoText = "";
    },

    async deleteTodo(todoId) {
      this.todos = this.todos.filter((item) => item.id !== todoId);
      let response;

      try {
        response = await fetch("http://localhost:3000/todos/" + todoId, {
          method: "DELETE",
        });
      } catch (error) {
        alert("Something went wrong!");
        return;
      }

      if (!response.ok) {
        alert("Something went wrong!");
        return;
      }
    },
  },
};

createApp(TodosApp).mount("#todos-app");
