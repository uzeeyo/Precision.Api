const { pool } = require("../config/dbconfig.js");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { getPerms } = require("./perms.js");
const { getUser} = require('../controllers/userController')


async function findUser(username) {
    const p = await pool.connect();
    const exists = await p.request()
        .input('getUserPassword', username)
        .execute('getUser')
}

//Validates password then moves to next()
//First step of login
async function validatePassword(req, res, next) {
    const { username, password } = req.body;
    if (!(username && password)) return res.status(400).send('Username and password required.');
    try {
        const p = await pool.connect();
        const user = await p.request()
            .input('username', username)
            .execute('getUserHash')
        const match = await bcrypt.compare(password, user.recordset[0].hashedPassword);
        if (!match) return res.status(401).send('Invalid password.');
        req.userID = user.recordset[0].userID;
        next();
    } catch (err) {
        console.log(err);
    }
}

//Generates token
//2nd step of login
async function generateToken(req, res) {
    const user = await getUser(req.userID);
    const token = jwt.sign({
        ...user
    }, process.env.JWT_SECRET_KEY, {
        expiresIn: '1hr'
    })
    res.send(token);
}

async function validateToken(req, res, next) {
    const token = req.headers["auth-token"];
    if (!(token) || token == "") return res.status(400).send('Token required.')
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if (!verified) return res.status(401).send('Invalid token.')
        else next()
    } catch (err) {
        return res.status(401).send('Invalid token.');
    }



}

async function addUser(username, password) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const p = await pool.connect();
    const affected = await p.request()
        .input('username', username)
        .input('hashedPassword', hashedPassword)
        .execute('addUser')
    if (affected.rowsAffected > 0) return true
    else return false
}

module.exports = { validatePassword, validateToken, addUser, generateToken}