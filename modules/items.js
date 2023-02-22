const express = require('express');
const multer = require('multer');
const upload = multer({ dest: '../uploads/items' });
const db = require('../db');

const router = express.Router();

router.get('/items', (req, res) => {
  db.query('SELECT * FROM items', (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

router.get('/items/:id', (req, res) => {
  db.query(`SELECT * FROM items WHERE id=${req.params.id}`, (error, results) => {
    if (error) throw error;
    res.send(results[0]);
  });
});

router.post('/items', upload.single('barang'), (req, res) => {
  const { nama_item, unit, stok, harga_satuan } = req.body;
  const barang = req.file.filename;

  const item = { nama_item, unit, stok, harga_satuan, barang };
  db.query('INSERT INTO items SET ?', item, (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

router.put('/items/:id', (req, res) => {
  const { nama_item, unit, stok, harga_satuan } = req.body;
  const item = { nama_item, unit, stok, harga_satuan };
  db.query(`UPDATE items SET ? WHERE id=${req.params.id}`, item, (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

router.delete('/items/:id', (req, res) => {
  db.query(`DELETE FROM items WHERE id=${req.params.id}`, (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

module.exports = router;
