const express = require('express');
const db = require('../db');

const router = express.Router();

router.get('/sales', (req, res) => {
  db.query('SELECT * FROM sales', (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

router.get('/sales/:id', (req, res) => {
  db.query(`SELECT * FROM sales WHERE id='${req.params.id}'`, (error, results) => {
    if (error) throw error;
    res.send(results[0]);
  });
});

router.post('/sales', (req, res) => {
  const { code_transaksi, tanggal_transaksi, customer, item, qty, total_bayar } = req.body;

  let total_diskon = 0;
  let total_harga = 0;
  item.forEach((elem) => {
    total_diskon += elem.diskon;
    total_harga += (elem.harga_satuan * elem.qty) - elem.diskon;
  });

  const sales = { code_transaksi, tanggal_transaksi, customer, item: JSON.stringify(item), qty, total_diskon, total_harga, total_bayar };
  db.query('INSERT INTO sales SET ?', sales, (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

router.put('/sales/:id', (req, res) => {
  const { code_transaksi, tanggal_transaksi, customer, item, qty, total_bayar } = req.body;

  let total_diskon = 0;
  let total_harga = 0;
  item.forEach((elem) => {
    total_diskon += elem.diskon;
    total_harga += (elem.harga_satuan * elem.qty) - elem.diskon;
  });

  const sales = { code_transaksi, tanggal_transaksi, customer, item: JSON.stringify(item), qty, total_diskon, total_harga, total_bayar };
  db.query(`UPDATE sales SET ? WHERE code_transaksi='${req.params.code_transaksi}'`, sales, (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

router.delete('/sales/:id', (req, res) => {
  db.query(`DELETE FROM sales WHERE id='${req.params.id}'`, (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

module.exports = router;
