var express = require('express');
var bodyParser = require('body-parser')
var logger = require('morgan');
var beautify = require('js-beautify').js_beautify;

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger('dev'));

app.set('port', (process.env.PORT || 5000));

app.post('/question', function (req, res) {
  var response = {
    response_type: 'in_channel',
    attachments: [
      {
        footer: 'Asked by <@'+req.body.user_id+'|'+req.body.user_name + '>',
        title: req.body.text,
        color: "#c41e4b"
      },
      {
        color: "#ffffff",
        actions: [
          {
            name: "answer",
            text: "Answer this question",
            style: "good",
            type: "button",
            value: "/answer abc123 "
          }
        ]
      }
      // ,
      // {
      //   pretext: 'Response JSON',
      //   text: beautify(JSON.stringify(req.body))
      // }
    ]
  }

  res.type('json');
  res.set('Content-type', 'application/json');
  res.send(response);
});

app.post('/answer', function (req, res) {
  var response = {
    response_type: 'in_channel',
    attachments: [
      {
        footer: 'Answered by <@'+req.body.user_id+'|'+req.body.user_name + '>',
        title: req.body.text,
        color: "#3AA3E3"
      }
      // ,
      // {
      //   pretext: 'Response JSON',
      //   text: beautify(JSON.stringify(req.body))
      // }
    ]
  }

  res.type('json');
  res.set('Content-type', 'application/json');
  res.send(response);
});

app.listen(app.get('port'), function () {
  console.log('Example app listening on port ' + app.get('port'));
});
