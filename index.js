var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser')
var app = express();

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
app.use(logger('dev'));

app.set('port', (process.env.PORT || 5000));

app.post('/question', function (req, res) {
  var response = {
    response_type: 'in_channel',
    attachments: [
      {
        author_name: req.body.user_name + 'has asked a question',
        text: req.body.text,
        footer: 'To answer: `/answer ' + req.body.response_url + ' [your response]`'
      },
      {
        pretext: 'Response',
        text: req.body
      }
    ]
  }

  res.type('json');
  res.set('Content-type', 'application/json');
  res.send(response);
});

app.listen(app.get('port'), function () {
  console.log('Example app listening on port ' + app.get('port'));
});
