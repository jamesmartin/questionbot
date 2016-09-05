var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.type('json');
  res.send({ text: "Hello" });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
