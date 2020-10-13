const mongoose = require('mongoose');
const Note = require('./../../models/note.js');

module.exports = function(app, db) {
    // GET ROUTE
    app.get('/notes', async function(req, res) {
        try {
            const notes = await Note.find();
            res.json(notes);
    
        } catch(err) {
            res.status(500).json({ message: err  });
        }
    });

    //GET ROUTE
    app.get('/notes/:id', async function(req, res) {
        try {
            const note = await Note.findById(req.params.id);
            res.json(note);
        } catch(err) {
            res.status(500).json({ message: err  });
        }
    });

    // POST ROUTE
    app.post('/notes', async function(req, res) {
        const note = new Note({
            title: req.body.title,
            body: req.body.body
        });
        try {
            const newNote  = await note.save(function (err, notes) {
                if (err) return console.error("save error: " + err);
              });
            res.status(201).json(newNote);
        } catch(err) {
            res.status(400).json({ message: err.message  });
        }
    });

    // DELETE ROUTE
    app.delete('/notes/:id', async function(req, res) {
        try {
            const note = await Note.deleteOne({_id: req.params.id}, function(err, removed) {
                if(err)
                    console.log(err)
                else 
                    console.log(removed)
            });
            res.json(note);
        } catch(err) {
            res.status(500).json({ message: err  });
        }
    });

    // UPDATE ROUTE
    app.patch('/notes/:id', async function(req, res) {
        var query = {'title': req.body.title, 'body': req.body.body};
        try {
            const note = await Note.updateOne(
                {_id: req.params.id},
                {$set: {body: req.body.body, title: req.body.title}}
                , function(err, removed) {
                    if(err)
                        console.log(err)
                    else 
                        console.log(removed)
                });
            res.json(note);
        } catch(err) {
            res.status(500).json({ message: err  });
        }
    });
}

