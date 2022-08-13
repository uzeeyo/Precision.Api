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

router.get("/", getInvoices);
router.get("/:id", getInvoiceDetails);
router.post("/", addInvoice);
router.post("/product", addInvoiceProduct);
router.patch("/product/price", editInvoiceProductPrice);
router.patch("/product/taxable", editInvoiceProductTaxable);
router.delete("/:id", deleteInvoice);
router.delete("/product/:id", deleteInvoiceProduct);

module.exports = router;
