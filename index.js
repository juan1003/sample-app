const express = require('express');
const logger = require('morgan')('common');
const path = require('path');
const app = express();
const port  = process.env.PORT || 8888;
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static('public'))
app.use(logger)

const usersRoutes = require('./routes/users');

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, '/index.html'));
});

app.use('/users', usersRoutes);

app.listen(port, () => console.log(`Running on http://localhost:${port}`))