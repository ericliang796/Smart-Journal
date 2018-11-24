const express = require('express');
const bodyParser = require('body-parser');

const app = express();

//middleware

app.set("view engine", "pug");
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.get('/', function(request, response) {
  return response.redirect('/post');
});

app.get('/post', function(request, response) {
  return response.render('post');
});

app.get('/new', function(request, response) {
  return response.render('index', { title: 'Hey', message: 'Hello there!' });
});

//Hook up to API
var ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');

var toneAnalyzer = new ToneAnalyzerV3({
  version: '2018-10-29',
  iam_apikey: '1sE5yZ-OywQd5JgJ4dOwGkbu-sCc-QRW9EbVm4tGI1pK',
  url: 'https://gateway-wdc.watsonplatform.net/tone-analyzer/api'
});


app.post('/submit', urlencodedParser, function(request, response) {
  var text = request.body.entry;
  var toneParams = {
    tone_input: { 'text': text },
    content_type: 'application/json'
  }

  toneAnalyzer.tone(toneParams, function (error, toneAnalysis) {
    if (error) {
      console.log(error);
    } else {
      var tone_id = toneAnalysis;
      console.log(tone_id.document_tone.tones[0].tone_id);
      if(tone_id.document_tone.tones[0].tone_id == "sadness"){
        return response.render('sad');
      }
      else if(tone_id.document_tone.tones[0].tone_id == "joy"){
        return response.render('happy');
      }
    }
  });
})


app.listen(3000, function(){
  console.log("Server is running on port 3000");
});
