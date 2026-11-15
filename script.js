const container = document.getElementById("card-container");
const saveButtonEl = document.querySelector(".save-button");
const titleInputEl = document.getElementById("heading-input");
const contentInputEl = document.getElementById("text-input");
const newNoteEl = document.querySelector(".new-note");
const deleteNoteEl = document.querySelector(".delete-button");

let currentNoteId = null;

saveButtonEl.addEventListener("click", clickSaveButton);
newNoteEl.addEventListener("click", createNewNote);
deleteNoteEl.addEventListener("click", clickDeleteButton);

loadTextToCard();

function loadTextToCard() {
  container.innerHTML = "";

  const notes = getNotes();

  const sortedNotes = notes.sort((a, b) => {
    return b.lastUpdated - a.lastUpdated;
  });

  sortedNotes.forEach((item) => {
    const card = document.createElement("button");
    card.classList.add("card");

    card.id = item.id;

    card.addEventListener("click", () => {
      document.querySelectorAll(".card").forEach((c) => {
        c.classList.remove("selected");
      });

      card.classList.add("selected");
      currentNoteId = item.id;
      titleInputEl.value = item.title;
      contentInputEl.value = item.content;
    });

    const cardHeader = document.createElement("div");
    cardHeader.classList.add("card-header");
    card.appendChild(cardHeader);
    cardHeader.textContent = item.title;

    const cardText = document.createElement("div");
    cardText.classList.add("card-text");
    card.appendChild(cardText);
    cardText.textContent = item.content;

    const cardDate = document.createElement("div");
    cardDate.classList.add("card-date");
    card.appendChild(cardDate);
    cardDate.textContent = new Date(item.lastUpdated).toLocaleString(`de-DE`);

    container.appendChild(card);
  });
}

function clickSaveButton() {
  const title = titleInputEl.value;
  const content = contentInputEl.value;

  if (!title || !content) {
    alert("Bitte Titel und Inhalt eingeben");
    return;
  }
  saveNote(title, content, currentNoteId);

  currentNoteId = null;
  titleInputEl.value = "";
  contentInputEl.value = "";

  loadTextToCard();
}

function createNewNote() {
  currentNoteId = null;
  document.querySelectorAll(".card").forEach((c) => {
    c.classList.remove("selected");
  });
  titleInputEl.value = "";
  contentInputEl.value = "";
}

function clickDeleteButton() {
  deleteNote(currentNoteId);
  currentNoteId = null;
  titleInputEl.value = "";
  contentInputEl.value = "";
  loadTextToCard();
}

function deleteNote(id) {
  const notes = getNotes();

  const filteredNotes = notes.filter((note) => note.id !== id);

  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(filteredNotes));
}

/* escapeHtml benötig meine code nicht, da .textContent jede eingabe automatisch als reinen Text behandelt*/
/* function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
 */
