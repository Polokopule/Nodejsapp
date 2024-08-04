const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const db = require('./database');
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/save-note', (req, res) => {
    const content = req.body.content;
const title = req.body.title;

    db.insert({ content,title }, (err, newDoc) => {
        if (err) {
            console.error(err.message);
            res.status(500).send('Database error');
        } else {
            res.redirect('/');
        }
    });
});

app.get('/get-notes', (req, res) => {
    db.find({}, (err, docs) => {
        if (err) {
            console.error(err.message);
            res.status(500).send('Database error');
        } else {
            res.json(docs);
        }
    });
});

app.post('/update-note', (req, res) => {
    const { id, content1,title2 } = req.body;
    db.update({ _id: id }, { $set: { content1,title2 }}, {}, (err, numReplaced) => {
        if (err) {
            console.error(err.message);
            res.status(500).send('Database error');
        } else {
            res.redirect('/');
        }
    });
});

app.post('/delete-note', (req, res) => {
    const { id } = req.body;
    db.remove({ _id: id }, {}, (err, numRemoved) => {
        if (err) {
           alert(err.message);
            res.status(500).send('Database error');
            
        } else {
            res.redirect('/');
            //alert("deleted")
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
