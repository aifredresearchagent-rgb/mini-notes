const STORAGE_KEY = "mini-notes";

const notesList = document.querySelector("#notes-list");
const newNoteButton = document.querySelector("#new-note");
const deleteNoteButton = document.querySelector("#delete-note");
const titleInput = document.querySelector("#note-title");
const bodyInput = document.querySelector("#note-body");
const saveStatus = document.querySelector("#save-status");

let notes = loadNotes();
let activeNoteId = notes[0]?.id || null;

function loadNotes() {
  const savedNotes = localStorage.getItem(STORAGE_KEY);

  if (!savedNotes) {
    return [createNote("Willkommen", "Deine Notizen werden automatisch auf diesem Gerät gespeichert.")];
  }

  return JSON.parse(savedNotes);
}

function saveNotes() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  saveStatus.textContent = "Automatisch gespeichert";
}

function createNote(title = "Neue Notiz", body = "") {
  const now = new Date().toISOString();

  return {
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    title,
    body,
    createdAt: now,
    updatedAt: now,
  };
}

function getActiveNote() {
  return notes.find((note) => note.id === activeNoteId);
}

function formatDate(dateText) {
  return new Intl.DateTimeFormat("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(dateText));
}

function renderNotesList() {
  notesList.innerHTML = "";

  if (notes.length === 0) {
    notesList.innerHTML = '<p class="empty-state">Noch keine Notizen. Tippe auf „Neue Notiz“.</p>';
    return;
  }

  notes.forEach((note) => {
    const noteButton = document.createElement("button");
    noteButton.className = `note-card${note.id === activeNoteId ? " active" : ""}`;
    noteButton.type = "button";
    const title = document.createElement("span");
    title.className = "note-card-title";
    title.textContent = note.title || "Ohne Titel";

    const date = document.createElement("span");
    date.className = "note-card-date";
    date.textContent = formatDate(note.updatedAt);

    noteButton.append(title, date);
    noteButton.addEventListener("click", () => selectNote(note.id));
    notesList.appendChild(noteButton);
  });
}

function renderEditor() {
  const activeNote = getActiveNote();
  const hasNote = Boolean(activeNote);

  titleInput.disabled = !hasNote;
  bodyInput.disabled = !hasNote;
  deleteNoteButton.disabled = !hasNote;

  titleInput.value = activeNote?.title || "";
  bodyInput.value = activeNote?.body || "";
}

function render() {
  renderNotesList();
  renderEditor();
}

function selectNote(noteId) {
  activeNoteId = noteId;
  render();
}

function addNote() {
  const note = createNote();
  notes.unshift(note);
  activeNoteId = note.id;
  saveNotes();
  render();
  titleInput.focus();
}

function updateActiveNote() {
  const activeNote = getActiveNote();

  if (!activeNote) {
    return;
  }

  activeNote.title = titleInput.value.trim();
  activeNote.body = bodyInput.value;
  activeNote.updatedAt = new Date().toISOString();
  saveStatus.textContent = "Speichere ...";
  saveNotes();
  renderNotesList();
}

function deleteActiveNote() {
  if (!activeNoteId) {
    return;
  }

  notes = notes.filter((note) => note.id !== activeNoteId);
  activeNoteId = notes[0]?.id || null;
  saveNotes();
  render();
}

newNoteButton.addEventListener("click", addNote);
deleteNoteButton.addEventListener("click", deleteActiveNote);
titleInput.addEventListener("input", updateActiveNote);
bodyInput.addEventListener("input", updateActiveNote);

saveNotes();
render();
