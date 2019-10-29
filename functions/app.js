const express = require('express');
const userid = require('uuid/v4');
const app = express();

app.get('/', (req, res) => {
  res.json({ msg: id() });
});

app.listen(2000, () => {
  console.log('started on 2000');
});
