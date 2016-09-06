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
        author_name: '<@'+req.body.user_id+'|'+req.body.user_name + '> has asked a question',
        title: req.body.text,
        color: "#c41e4b",
        actions: [
          {
            name: "answer",
            text: "Answer",
            style: "success",
            type: "button",
            value: "answer"
          },
          {
            name: "upvote",
            text: "+1",
            type: "button",
            value: "upvote"
          }
        ]
      },
      {
        pretext: 'Response JSON',
        text: beautify(JSON.stringify(req.body))
      }
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
        author_name: '<@'+req.body.user_id+'|'+req.body.user_name + '> has posted an answer',
        title: req.body.text,
        color: "#3AA3E3"
      },
      {
        pretext: 'Response JSON',
        text: beautify(JSON.stringify(req.body))
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
