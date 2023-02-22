const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

const customerRoutes = require('./modules/customers');
const itemRoutes = require('./modules/items');
const salesRoutes = require('./modules/sales');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(customerRoutes);
app.use(itemRoutes);
app.use(salesRoutes);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
