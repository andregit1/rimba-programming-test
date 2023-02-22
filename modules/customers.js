const express = require('express');
const multer = require('multer');
const upload = multer({ dest: '../uploads/customers' });
const db = require('../db');

const router = express.Router();

router.get('/customers', (req, res) => {
  db.query('SELECT * FROM customers', (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

router.get('/customers/:id', (req, res) => {
  db.query(`SELECT * FROM customers WHERE id=${req.params.id}`, (error, results) => {
    if (error) throw error;
    res.send(results[0]);
  });
});

router.post('/customers', upload.single('ktp'), (req, res) => {
  const { nama, contact, email, alamat, diskon, tipe_diskon } = req.body;
  const ktp = req.file.filename;

  const customer = { nama, contact, email, alamat, diskon, tipe_diskon, ktp };
  db.query('INSERT INTO customers SET ?', customer, (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

router.put('/customers/:id', (req, res) => {
  const { nama, contact, email, alamat, diskon, tipe_diskon } = req.body;
  const customer = { nama, contact, email, alamat, diskon, tipe_diskon };
  db.query(`UPDATE customers SET ? WHERE id=${req.params.id}`, customer, (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

router.delete('/customers/:id', (req, res) => {
  db.query(`DELETE FROM customers WHERE id=${req.params.id}`, (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

module.exports = router;
