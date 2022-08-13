const express = require('express');
const { validatePassword, generateToken } = require('../middleware/auth.js');

const router = express.Router();

router.post('/', validatePassword, generateToken);

module.exports = router