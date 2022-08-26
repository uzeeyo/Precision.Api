const pool = require('../config/dbconfig');


const getAllProducts = async (req, res) => {
    if (!req.perms.getProducts) return res.status(403).send('Not authorized.');

    try {
        const p = await pool.connect();
        const rows = await p.request()
            .execute('getAllProducts')
            
        res.send(rows.recordset);
    }
    catch (err) {
        console.log(err);
        res.status(500).send('An error has occured.');
    }
}

const searchProducts = async (req, res) => {
    if (!req.perms.getProducts) return res.status(403).send('Not authorized.');
    const name = req.body.name;
    if (name.length < 3) return res.status(400).send('3 or more characters required to search.');

    try {
        const p = await pool.connect();
        const rows = await p.request()
            .input("name", name)
            .execute('searchProducts')
            
        res.send(rows.recordset);
    }
    catch (err) {
        console.log(err);
        res.status(500).send('An error has occured.');
    }
}

const addProduct = async (req, res) => {
    if (!req.perms.addProducts) return res.status(403).send('Not authorized.');
    const product = req.body;

    try {
        const p = await pool.connect();
        const rows = await p.request()
            .input('name', product.name)
            .input('price', product.price)
            .input('taxable', product.taxable)
            .input('categoryID', product.categoryID)
            .execute('addProduct')
            
        res.send(`${rows.rowsAffected} product added.`);
    }
    catch (err) {
        console.log(err);
        res.status(500).send('An error has occured.');
    }
}


const editProduct = async (req, res) => {
    if (!req.perms.editProducts) return res.status(403).send('Not authorized.');
    const productID = req.params.id;
    const product = req.body;

    try {
        const p = await pool.connect();
        const rows = await p.request()
            .input("productID", productID)
            .input('name', product.name)
            .input('price', product.price)
            .input('taxable', product.taxable)
            .input('categoryID', product.categoryID)
            .execute('searchProducts')
            
        res.send(`${rows.rowsAffected} products edited.`);
    }
    catch (err) {
        console.log(err);
        res.status(500).send('An error has occured.');
    }
}

const deleteProduct = async (req, res) => {
    if (!req.perms.deleteProducts) return res.status(403).send('Not authorized.');
    const productID = req.params.id;

    try {
        const p = await pool.connect();
        const rows = await p.request()
            .input("productID", productID)
            .execute('deleteProducts')
            
        res.send(rows.rowsAffected);
    }
    catch (err) {
        console.log(err);
        res.status(500).send('An error has occured.');
    }
}

module.exports = { getAllProducts, searchProducts, addProduct, editProduct, deleteProduct }