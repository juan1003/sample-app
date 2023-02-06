const express = require('express');
const logger = require('morgan')('common');
const path = require('path');
const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static('public'))
app.use(logger)

const usersRoutes = require('./routes/users');

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, '/index.html'));
});

app.use('/users', usersRoutes);

app.listen(8888, () => console.log("Running on http://localhost:8888"))