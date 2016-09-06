var express = require('express');
var bodyParser = require('body-parser')
var logger = require('morgan');

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
        text: req.body.text,
        footer: 'To answer: /answer [question_id] [your response]',
        "actions": [
          {
            "name": "upvote",
            "text": "+1",
            "type": "button",
            "value": "upvote"
          },
          {
            "name": "answer",
            "text": "Answer",
            "type": "button",
            "value": "answer"
          }
        ]
      },
      {
        pretext: 'Response JSON',
        text: JSON.stringify(req.body)
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
