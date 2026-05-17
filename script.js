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
    score: 10,
    urgent: false,
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
        score: 15,
        urgent: false,
        done: false,
      },
    ];
  }

  return JSON.parse(saved);
}

function saveTodos() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

function getScoreLabel(score) {
  if (score >= 80) {
    return "Extrem";
  }

  if (score >= 50) {
    return "Hoch";
  }

  if (score >= 20) {
    return "Mittel";
  }

  return "Klein";
}

function renderTodos() {
  todoList.innerHTML = "";

  todos.forEach((todo) => {
    const card = template.content.firstElementChild.cloneNode(true);

    const doneButton = card.querySelector(".done-button");
    const deleteButton = card.querySelector(".delete-button");
    const titleInput = card.querySelector(".title-input");
    const detailsInput = card.querySelector(".details-input");
    const scoreInput = card.querySelector(".score-input");
    const scoreBadge = card.querySelector(".score-badge");
    const urgentInput = card.querySelector(".urgent-input");

    card.dataset.id = todo.id;

    card.classList.toggle("done", todo.done);
    card.classList.toggle("urgent", todo.urgent);

    titleInput.value = todo.title;
    detailsInput.value = todo.details;
    scoreInput.value = todo.score;
    urgentInput.checked = todo.urgent;
    scoreBadge.textContent = getScoreLabel(todo.score);

    titleInput.addEventListener("input", (event) => {
      todo.title = event.target.value;
      saveTodos();
    });

    detailsInput.addEventListener("input", (event) => {
      todo.details = event.target.value;
      saveTodos();
    });

    scoreInput.addEventListener("input", (event) => {
      let value = Number(event.target.value);

      if (value < 1) {
        value = 1;
      }

      if (value > 100) {
        value = 100;
      }

      todo.score = value;
      scoreBadge.textContent = getScoreLabel(value);
      saveTodos();
    });

    urgentInput.addEventListener("change", (event) => {
      todo.urgent = event.target.checked;
      saveTodos();
      renderTodos();
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
