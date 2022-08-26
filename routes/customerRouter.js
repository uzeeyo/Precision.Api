const express = require('express');
const {getCustomers, getCustomerDetails, addCustomer, editCustomer, deleteCustomer, getCustomerDevices} = require('../controllers/customerController.js');
const router = express.Router();

router.get('/', getCustomers);
router.get('/:id', getCustomerDetails);
router.get('/:id/devices', getCustomerDevices);
router.post('/', addCustomer);
router.put('/:id', editCustomer);
router.delete('/:id', deleteCustomer);

module.exports = router;