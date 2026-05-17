const STORAGE_KEY = "todo-kacheln";

const todoList = document.querySelector("#todo-list");
const addTodoButton = document.querySelector("#add-todo");
const template = document.querySelector("#todo-template");

let todos = loadTodos();
let draggedId = null;

function createTodo() {
  return {
    id: crypto.randomUUID(),
    title: "Neue Aufgabe",
    details: "",
    done: false,
  };
}

function loadTodos() {
  const saved = localStorage.getItem(STORAGE_KEY);

  if (!saved) {
    return [
      {
        id: crypto.randomUUID(),
        title: "Willkommen 👋",
        details: "Erstelle neue Kacheln und verschiebe sie per Drag & Drop.",
        done: false,
      },
    ];
  }

  return JSON.parse(saved);
}

function saveTodos() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

function renderTodos() {
  todoList.innerHTML = "";

  todos.forEach((todo) => {
    const card = template.content.firstElementChild.cloneNode(true);

    const doneButton = card.querySelector(".done-button");
    const deleteButton = card.querySelector(".delete-button");
    const titleInput = card.querySelector(".title-input");
    const detailsInput = card.querySelector(".details-input");

    card.dataset.id = todo.id;
    card.classList.toggle("done", todo.done);

    titleInput.value = todo.title;
    detailsInput.value = todo.details;

    titleInput.addEventListener("input", (event) => {
      todo.title = event.target.value;
      saveTodos();
    });

    detailsInput.addEventListener("input", (event) => {
      todo.details = event.target.value;
      saveTodos();
    });

    doneButton.addEventListener("click", () => {
      todo.done = !todo.done;
      saveTodos();
      renderTodos();
    });

    deleteButton.addEventListener("click", () => {
      todos = todos.filter((item) => item.id !== todo.id);
      saveTodos();
      renderTodos();
    });

    card.addEventListener("dragstart", () => {
      draggedId = todo.id;
      card.classList.add("dragging");
    });

    card.addEventListener("dragend", () => {
      card.classList.remove("dragging");
      draggedId = null;
    });

    card.addEventListener("dragover", (event) => {
      event.preventDefault();
    });

    card.addEventListener("drop", () => {
      if (!draggedId || draggedId === todo.id) {
        return;
      }

      const fromIndex = todos.findIndex((item) => item.id === draggedId);
      const toIndex = todos.findIndex((item) => item.id === todo.id);

      const [movedTodo] = todos.splice(fromIndex, 1);
      todos.splice(toIndex, 0, movedTodo);

      saveTodos();
      renderTodos();
    });

    todoList.appendChild(card);
  });
}

addTodoButton.addEventListener("click", () => {
  todos.unshift(createTodo());
  saveTodos();
  renderTodos();
});

saveTodos();
renderTodos();
