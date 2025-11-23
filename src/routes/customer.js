const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/customerController');

router.post('/add', ctrl.addCustomer);
router.get('/view/:id', ctrl.getCustomer);
router.delete('/delete/:id', ctrl.deleteCustomer);
router.get('/edit/:id', ctrl.getCustomerForEdit);
router.post('/edit/:id', ctrl.updateCustomer);
router.get('/search', ctrl.searchCustomers);
module.exports = router;
