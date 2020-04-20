const path = require('path');
const fs = require('fs');

const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

const port = 8099;

app.get('/api/products', (req, res) => {
  res.sendFile(path.join(__dirname, 'data', 'products.json'));
});

app.get('/api/failedOrders', (req, res) => {
  const dirPath = 'C:/Camunda/failed_order/';
  const failedOrders = [];
  fs.readdir(dirPath, function (err, files) {
    if (err) {
      console.log('Could not read files. Try again later.');
    }
    if (files && files.length===0) {
      res.json([]);
    }
    if (files) {
    for (var i = 0; i < files.length; i++) {
      let file = files[i];
      const filePath = dirPath + file;
      fs.readFile(filePath, 'utf-8', function (err, data) {
        if (err) {
          console.log('Could not read file content. Try again later.');
        }
        failedOrders.push(JSON.parse(data.trim()));
        if (failedOrders.length === files.length) {
          res.json(failedOrders);
        }
      });
    } }
  });
});

app.get('/api/updateFailedOrders', async (req, res) => {
  const fileName = req.query.fileName;
  const dirPath = 'C:/Camunda/failed_order/';
  const filePath = dirPath + fileName;
  fs.unlink(filePath, function (err) {
    if (err) throw err;
    console.log('File deleted!');
    res.send(true);
  });
});

app.listen(port, () => {
  console.log(`[products] API listening on port ${port}.`);
});
