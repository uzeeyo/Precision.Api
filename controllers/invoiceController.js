const { pool } = require("../config/dbconfig.js");

const getInvoices = async (req, res) => {
    if (!req.perms.getInvoices && !(req.perms.getInvoices)) return res.status(403).send('Not authorized.');
    try {
        const p = await pool.connect();
        const rows = await p.request()
            .execute('getInvoices')
    
        res.send(rows.recordset)
    } catch (err) {
        console.log(err);
        res.status(500).send('An error has occured.');
    }
}

const getInvoiceDetails = async (req, res) => {
    if (!req.perms.getInvoices && !(req.perms.getInvoices)) return res.status(403).send('Not authorized.');
    try {
        const id = req.params.id
    
        const p = await pool.connect();
        const rows = await p.request()
            .input('id', id)
            .execute('getInvoiceDetails')
    
        res.send(rows.recordset)
    } catch (err) {
        console.log(err);
        res.status(500).send('An error has occured.');
    }
}

const searchInvoices = async (req, res) => {
    if (!req.perms.getInvoices && !(req.perms.getInvoices)) return res.status(403).send('Not authorized.');
    
    try {    
        const p = await pool.connect();
        const rows = await p.request()
            .input('id', id)
            .execute('searchInvoices')
    
        res.send(rows.recordset)
    } catch (err) {
        console.log(err);
        res.status(500).send('An error has occured.');
    }
}

const addInvoice = async (req, res) => {
    if (!req.perms.addInvoices && !(req.perms.getInvoices)) return res.status(403).send('Not authorized.');
    const customerID = req.body.customerID;
    if (!(customerID)) return res.status(400).send('Invalid input.');

    try {
        const p = await pool.connect();
        const affected = await p.request()
            .input('customerID', customerID)
            .input('currentTime', new Date())
            .execute('addInvoice')
        res.send(`${affected.rowsAffected} invoice added.`)
    } catch (err) {
        console.log(err);
        res.status(500).send('An error has occured.');
    }
}

const addInvoiceProduct = async (req, res) => {
    if (!req.perms.addInvoices) return res.status(403).send('Not authorized.');
    const product = req.body;
    if (!(product.invoiceID && product.productID)) return res.status(400).send('Invalid input.');

    try {
        const p = await pool.connect();
        const affected = await p.request()
            .input('invoiceID', product.invoiceID)
            .input('productID', product.productID)
            .input('createdAt', new Date())
            .execute('addInvoiceProduct')
        res.send(`${affected.rowsAffected} product added.`)
    } catch (err) {
        console.log(err);
        res.status(500).send('An error has occured.');
    }
}

const editInvoiceProductPrice = async (req, res) => {
    if (!req.perms.editInvoices) return res.status(403).send('Not authorized.');
    const product = req.body;
    if (!(product.price && product.entryID)) return res.status(400).send('Invalid input.')

    try {
        const p = await pool.connect();
        const affected = await p.request()
            .input('price', product.price)
            .input('entryID', product.entryID)
            .execute('editInvoiceProductPrice')
        res.send(`${affected.rowsAffected} product edited.`)
    } catch (err) {
        console.log(err);
        res.status(500).send('An error has occured.');
    }
}

const editInvoiceProductTaxable = async (req, res) => {
    if (!req.perms.editInvoices) return res.status(403).send('Not authorized.');
    const product = req.body;
    if (!(product.taxable && product.entryID)) return res.status(400).send('Invalid input.')

    try {
        const p = await pool.connect();
        const affected = await p.request()
            .input('taxable', product.taxable)
            .input('entryID', product.entryID)
            .execute('editInvoiceProductTaxable')
        res.send(`${affected.rowsAffected} product edited.`)
    } catch (err) {
        console.log(err);
        res.status(500).send('An error has occured.');
    }
}

const deleteInvoice = async (req, res) => {
    if (!req.perms.deleteInvoices) return res.status(403).send('Not authorized.');
    id = req.params.id;

    try {
        const p = await pool.connect();
        const affected = await p.request()
            .input('date', new Date())
            .input('invoiceID', id)
            .execute('deleteInvoice')
        res.send(`${affected.rowsAffected} invoice deleted.`)
    } catch (err) {
        console.log(err);
        res.status(500).send('An error has occured.');
    }
}

const deleteInvoiceProduct = async (req, res) => {
    if (!req.perms.deleteInvoices) return res.status(403).send('Not authorized.');
    id = req.params.id;

    try {
        const p = await pool.connect();
        const affected = await p.request()
            .input('entryID', id)
            .execute('deleteInvoiceProduct')
        res.send(`${affected.rowsAffected} product deleted.`)
    } catch (err) {
        console.log(err);
        res.status(500).send('An error has occured.');
    }
}

module.exports = { getInvoices, getInvoiceDetails, addInvoice, addInvoiceProduct, editInvoiceProductPrice, editInvoiceProductTaxable, deleteInvoice, deleteInvoiceProduct }