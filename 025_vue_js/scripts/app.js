const { createApp } = Vue;

const TodosApp = {
  data() {
    return {
      newTodo: "Learn Vue.js!",
      enteredTodoText: "",
    };
  },
  methods: {
    saveTodo(event) {
      event.preventDefault();
      this.newTodo = this.enteredTodoText;
      this.enteredTodoText = "";
    },
  },
};

createApp(TodosApp).mount("#todos-app");
