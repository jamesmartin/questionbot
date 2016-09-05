var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.get('/', function (req, res) {
  res.type('json');
  res.set('Content-type', 'application/json');
  res.send({ text: "Hello" });
});

app.listen(app.get('port'), function () {
  console.log('Example app listening on port ' + app.get('port'));
});
