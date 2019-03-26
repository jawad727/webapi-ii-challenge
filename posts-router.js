const express = require('express')

const db = require('./data/db')

const router = express.Router();



// ================================== POST =================================

router.post('/', (req, res) => {
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

router.get('/', (req, res) => {
    
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

router.get('/:id', (req, res) => {

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

router.delete('/:id', (req, res) => {
    const id = req.params.id;

        if (id) {
    db
        .remove(id)

        .then(users => {
                res.status(204).end();   
        })
        .catch(error => {
            res.status(500).json({
                error: "post cant be removed"
            })
        }) } 
        
        else {
            res.status(404).json({
                message: "The post with the specified ID does not exist."
            })
        }

})


// ================================== UPDATE ===============================

router.put('/:id', (req, res) => {

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


module.exports = router