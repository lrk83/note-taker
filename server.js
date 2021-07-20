const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const fs = require('fs');
const path = require('path');
const {notes} = require('./Develop/db/db.json');
const {validateNote, createNewNote} = require('./Develop/lib/notes');

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//API Routes
app.get('/api/notes', (req,res) =>{
    let results = notes;
    res.json(results);
});

app.post('/api/notes', (req,res) =>{
    console.log(`
    
    =====================
    Here is the res.body
    =====================

    `);
    
    console.log(req.body);

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
    res.sendFile(path.join(__dirname, './Develop/public/notes.html'))
});

app.get('/*', (req,res) =>{
    res.sendFile(path.join(__dirname, './Develop/public/index.html'))
});

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
  });

