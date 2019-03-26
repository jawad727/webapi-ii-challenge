const express = require('express');

const pr = require('./posts-router');

const server = express();

server.use(express.json());


server.get('/', (req, res) => {
    res.send(
        `<h1>HOMEPAGE</h1>`
    );
});


server.use('/api/posts', pr)

module.exports = server
