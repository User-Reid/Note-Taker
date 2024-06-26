const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

// Helper function to read data from db.json
const readData = () => {
  const data = fs.readFileSync(path.join(__dirname, "../db/db.json"), "utf8");
  return JSON.parse(data);
};

// Helper function to write data to db.json
const writeData = (data) => {
  fs.writeFileSync(
    path.join(__dirname, "../db/db.json"),
    JSON.stringify(data),
    "utf8"
  );
};

// GET /api/notes - Retrieve all notes
router.get("/notes", (req, res) => {
  const notes = readData();
  res.json(notes);
});

// POST /api/notes - Add a new note
router.post("/notes", (req, res) => {
  const notes = readData();
  const newNote = req.body;
  newNote.id = notes.length.toString(); // Simple ID generation
  notes.push(newNote);
  writeData(notes);
  res.json(newNote);
});

// DELETE /api/notes/:id - Delete a note by ID
router.delete("/notes/:id", (req, res) => {
  let notes = readData();
  notes = notes.filter((note) => note.id !== req.params.id);
  writeData(notes);
  res.json({ msg: "Note deleted" });
});

module.exports = router;
