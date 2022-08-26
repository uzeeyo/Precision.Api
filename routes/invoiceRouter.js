const express = require("express");
const {
    getInvoiceDetails,
    getInvoices,
    addInvoice,
    addInvoiceProduct,
    editInvoiceProductPrice,
    editInvoiceProductTaxable,
    deleteInvoice,
    deleteInvoiceProduct,
} = require("../controllers/invoiceController.js");

const router = express.Router();

//parent server/api/invoices/*** 
router.get("/", getInvoices);
router.get("/:id", getInvoiceDetails);
router.get("/search", getInvoices) //TODO: Add params to this to search customer details
router.post("/", addInvoice); 
router.post("/product", addInvoiceProduct);
router.put("/product/price", editInvoiceProductPrice);
router.put("/product/taxable", editInvoiceProductTaxable);
router.delete("/:id", deleteInvoice);
router.delete("/product/:id", deleteInvoiceProduct);

module.exports = router;
