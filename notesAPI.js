const LOCAL_STORAGE_KEY = "notizapp-notizen";

function getNotes() {
  return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
}

function saveNote(title, content, id = null) {
  const notes = getNotes();
  const existingNote = notes.find((note) => note.id === id);

  if (existingNote) {
    existingNote.title = title;
    existingNote.content = content;
    existingNote.lastUpdated = new Date().getTime();
  } else {
    notes.push({
      title,
      content,
      id: getNextId(),
      lastUpdated: new Date().getTime(),
    });
  }

  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(notes));
}

function getNextId() {
  const notes = getNotes();

  const sortedNotes = notes.sort((a, b) => {
    return a.id - b.id;
  });

  let nextId = 1;

  for (let note of sortedNotes) {
    if (nextId < note.id) break;

    nextId = note.id + 1;
  }

  return nextId;
}
