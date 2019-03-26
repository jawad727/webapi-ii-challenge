const express = require('express');

const db = require('./data/db.js');

const server = express();

server.use(express.json())

// ================================== POST =================================

server.post('/api/posts', (req, res) => {
    const userInfo = req.body;


        if (userInfo.title && userInfo.contents) {
    db
        .insert(userInfo)
        .then(user => {
            res.status(201).json(user);
        })
        .catch(error => {
            res.status(500).json({ error: "There was an error while saving the post to the database" })
        }) } else {
            res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
        }
})

// ================================== GET =================================

server.get('/api/posts', (req, res) => {
    
    db
        .find()
        .then( user => {
            res.status(200).json(user)
        })
        .catch(error => {
            res.status(500).json({
                error: "The posts information could not be retrieved."
            })
        })
})

// ================================== GET BY ID ============================

server.get('/api/posts/:id', (req, res) => {

        const id = req.params.id;

        if (id) {
    db
        .findById(id)

        .then( user => {
            res.status(200).json(user)
        })
        .catch(error => {
            res.status(500).json({
                error: "The post information could not be retrieved."
            });
        }) } 
        
        else {
            res.status(404).json({
                message: "The post with the specified ID does not exist."
            });
        }
});

// ================================== DELETE ===============================

server.delete('/api/posts/:id', (req, res) => {
    const id = req.params.id;

        if (id) {
    db
        .remove(id)

        .then(users => {
                res.status(204).end();   
        })
        .catch(error => {
            res.status(500).json({
                error: "user cant be removed"
            })
        }) } 
        
        else {
            res.status(404).json({
                message: "The post with the specified ID does not exist."
            })
        }

})


// ================================== UPDATE ===============================

server.put('/api/posts/:id', (req, res) => {

    const id = req.params.id
    const changed = req.body

    if (changed.title && changed.contents) {

    
    db
        .update(id, changed)

        .then(updated => {
            if (updated) {
                res.status(200).json(updated);
            } else {
                res.status(404).json({
                    message: "The post with the specified ID does not exist."
                })
            }

        })

        .catch(error => {
            res.status(500).json({
                error: "The post information could not be modified."
            });
        })
    }
        else {
            res.status(400).json({
                errorMessage: "Please provide title and contents for the post."
            })
        }
})



















server.listen(4000, () => {
    console.log('\n *** server running on 4000 *** \n')
});