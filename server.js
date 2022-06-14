const express = require("express");
const { fstat } = require("fs");
const path = require("path");
const noteData = require('./db/db.json');
// const notes = require('./notes.html') ?
const app = express();
const PORT = 3001;
const { v4: uuidv4 } = require("uuid");

app.use(express.json());




app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, 'public/notes.html'))
);

//app.get to get request the API notes/get from the db.json
app.get('/api/notes', (req, res) => {
    //fs to read file from db folder where user's data is saved
    fs.readfile('db/db.json', "utf-8", (err, data) => {
    if (err) throw err;
    res.json(JSON.parse(data));
});
})

app.post('/notes', (req, res) => {
    //title text and id that will be inputted and saved by the user
    var createNote = {
        title:req.body.title,
        text:req.body.text,
        id:uuidv4(),
    }
    //fs to read file and add to HTML to display current note
    fs.readfile('db/db.json', "utf-8", (err, data) => {                                   
})

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);