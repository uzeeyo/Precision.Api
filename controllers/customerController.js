const validator = require('validator');
const { pool } = require('../config/dbconfig.js');

//Gets all customers
const getCustomers = async (req, res) => {
    if (req.perms.getCustomers != true || !req.perms.getCustomers) return res.status(403).send('Not authorized.');
    try {
        const p = await pool.connect();
        const rows = await p.request()
            .execute('getCustomers')
        res.send(rows.recordset);
    } catch (err) {
        console.log(err);
        return res.status(500).send('An error has occured.');
    }
}

//Gets customer by CustomerID
const getCustomerDetails = async (req, res) => {
    if (req.perms.getCustomers != true || !req.perms.getCustomers) return res.status(403).send('Not authorized.');
    const id = req.params.id;

    try {
        const p = await pool.connect();
        const rows = await p.request()
            .input('id', id)
            .execute('getCustomerDetails')

        res.send(rows.recordset[0]);
    } catch (err) {
        console.log(err);
        return res.status(500).send('An error has occured.');
    }
}

const getCustomerDevices = async (req, res) => {
    if (req.perms.getDevices != true || !req.perms.getDevices) return res.status(403).send('Not authorized.')
    const deviceID = req.params.id;
    

    try {
        const p = await pool.connect();
        const row = await p.request()
            .input('id', deviceID)
            .execute('getDevicesByCustomer')
        
        res.send(row.recordset);
    } catch (err) {
        console.log(err);
        return res.status(500).send('An error has occured.');
    }
}

const addCustomer = async (req, res) => {
    if (req.perms.addCustomers != true || !req.perms.addCustomers) return res.status(403).send('Not authorized.');
    const customer = req.body;
    if (!(customer.firstName && customer.lastName && customer.phoneNumber && customer.emailAddress)) return res.status(400).send('Invald input.')
    if (!validator.isEmail(customer.emailAddress)) return res.status(400).send('Invalid email.');
    if (!validator.isMobilePhone(customer.phoneNumber)) return res.status(400).send('Invalid phone number.');

    try {
        const p = await pool.connect();
        const affected = await p.request()
            .input('fname', customer.firstName)
            .input('lname', customer.lastName)
            .input('pNumber', customer.phoneNumber)
            .input('eAddress', customer.emailAddress)
            .execute('addCustomer')
    
            res.status(201).send(`${affected.rowsAffected} customer added.`);
    } catch (err) {
        console.log(err);
        return res.status(500).send('An error has occured.');
    }
}

const editCustomer = async (req, res) => {
    if (req.perms.editCustomers != true || !req.perms.editCustomers) return res.status(403).send('Not authorized.');
    const customerID = req.params.id;
    const customer = req.body;
    if (!(customer.customerID && customer.firstName && customer.lastName && customer.phoneNumber && customer.emailAddress)) return res.status(400).send('Invald input.')
    if (!validator.isEmail(customer.emailAddress)) return res.status(400).send('Invalid email.');
    if (!validator.isMobilePhone(customer.phoneNumber)) return res.status(400).send('Invalid phone number.');

    try {
        const p = await pool.connect();
        const affected = await p.request()
            .input('id', customer.customerID)
            .input('fname', customer.firstName)
            .input('lname', customer.lastName)
            .input('num', customer.phoneNumber)
            .input('email', customer.emailAddress)
            .execute('editCustomer')
        
            res.send(`${affected.rowsAffected} customer edited.`);
    
    } catch (err) {
        console.log(err);
        return res.status(500).send('An error has occured.');
    }

    
}

const deleteCustomer = async (req, res) => {
    if (req.perms.deleteCustomers != true || !req.perms.deleteCustomers) return res.status(403).send('Not authorized.');
    const customerID = req.params.id;

    try {
        const p = await pool.connect();
        const affected = await p.request()
            .input('id', customerID)
            .input('date', Date.now())
            .execute('deleteCustomer')

        res.send('Customer deleted.');
        console.log(`${affected.rowsAffected} customer deleted.`);
    } catch (err) {
        console.log(err);
        return res.status(500).send('An error has occured.');
    }

}

module.exports = {getCustomers, getCustomerDetails, getCustomerDevices, addCustomer, editCustomer, deleteCustomer}