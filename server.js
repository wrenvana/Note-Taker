const express = require("express");
const fs = require("fs");
const path = require("path");
const noteData = require("./db/db.json");
const app = express();
const PORT = process.env.PORT || 3001;
const { v4: uuidv4 } = require("uuid");
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, "./public/notes.html"))
);

//request the API notes/get from the db.json
app.get('/api/notes', (req, res) => {
    //fs to read file from db folder where user's data is saved
    fs.readfile('db/db.json', "utf-8", (err, data) => {
    if (err) throw err;
    res.json(JSON.parse(data));
});
});

app.post('/api/notes', (req, res) => {
    //fs read file and add to HTML
    fs.readfile('db/db.json', "utf-8", (err, data) => { 
        if (err) throw err;
        const createNote = req.body;
        createNote.id = uuidv4();
        const dataNotes = JSON.parse(data);
        dataNotes.push(createNote);
        fs.writeFile("./db/db.json", JSON.stringify(dataNotes), (err) => {
            res.json(createNote);
        err ? console.log(err) : console.log("Note created.")
        });                             
});
});

app.delete("/api/notes/:id", (req, res) =>{
    const deleteNote = req.params.id;
    fs.readfile("db/db.json", "utf-8", (err, data) => {
        if (err) throw err;
        var database = JSON.parse(data);
        var newNote = database.filter((note) => note.id !== deleteNote);
        fs.writeFile("./db/db.json", JSON.stringify(newNote), (err) => {
            err ? console.log(err) : console.log("Note deleted.");
        });
        res.sendFile(path.join(__dirname, "./public/notes.html"));
    })
})

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);