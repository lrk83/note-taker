const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();

// Sets up the Express app to handle data parsing
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const {notes} = require('./db/db.json');
const {validateNote, createNewNote} = require('./lib/notes');
const path = require('path');
const fs = require('fs');

//API Routes
app.get('/api/notes', (req,res) =>{
    let results = notes;
    res.json(results);
});

app.post('/api/notes', (req,res) =>{

    req.body.id = notes.length.toString();

    if (!validateNote(req.body)) {
        res.status(400).send('The note is not properly formatted.');
    } else {
        const note = createNewNote(req.body, notes);
        res.json(note);
    }
});

// HTML Routes
app.get('/notes', (req,res) =>{
    res.sendFile(path.join(__dirname, './public/notes.html'))
});

app.get('/', (req,res) =>{
    res.sendFile(path.join(__dirname, './public/index.html'))
});

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
  });