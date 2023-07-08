const express = require('express');
const { addTransaction, editTransaction, deleteTransaction, getAllTransactions } = require('../controllers/transactionController');


//router object
const router = express.Router();

//routes
//Add transaction POST METHOD
router.post('/add-transaction', addTransaction);
//Edit transaction POST METHOD
router.post('/edit-transaction', editTransaction);
//Delete transaction POST METHOD
router.post('/delete-transaction', deleteTransaction);

//get transactions
router.post('/get-transaction', getAllTransactions);


module.exports = router; 