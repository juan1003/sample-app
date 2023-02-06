const express = require("express")
const router = express.Router()

const users = [
    { id: 1, name: "John" },
    { id: 2, name: "Jane" },
]

router.get("/", function(req, res) {
    res.json(users)
})

router.post('/add', function(req, res) {
    const {name} = req.body;
    console.log(name)
    users.push({ id: users.length + 1, name })
    res.json(users)
})

router.delete('/:id', function(req, res) {
    const { id } = req.params;
    const user = users.find(user => user.id === parseInt(id));
    const index = users.indexOf(user);
    users.splice(index, 1);
})


module.exports = router