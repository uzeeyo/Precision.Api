const express = require('express');
const { getDevices, deleteDevice, addDevice, editDevice } = require('../controllers/deviceController.js');

const router = express.Router();

router.get('/', getDevices);
router.post('/', addDevice);
router.put('/:id', editDevice);
router.delete('/:id', deleteDevice);


module.exports = router