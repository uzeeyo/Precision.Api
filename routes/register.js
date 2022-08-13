const express = require('express');
const { addUser, validatePassword } = require('../middleware/auth.js');


const router = express.Router();

router.post('/', async (req, res) => {
    const { username, password } = req.body[0];
    if (!(username && password)) return res.status(400).send('username and password required.');

    if (!addUser(username, password)) return res.status(500).send('Error adding user.')
    else return res.send('User added')
})

module.exports = router