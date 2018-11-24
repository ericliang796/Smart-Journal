const express = require('express');
const bodyParser = require('body-parser');

const app = express();

//middleware

app.set("view engine", "pug");
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(request, response) {
  return response.redirect('/post');
});

app.get('/post', function(request, response) {
  return response.render('post');
});

//Hook up to API
var ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');

var toneAnalyzer = new ToneAnalyzerV3({
  version: '2018-10-29',
  iam_apikey: '1sE5yZ-OywQd5JgJ4dOwGkbu-sCc-QRW9EbVm4tGI1pK',
  url: 'https://gateway-wdc.watsonplatform.net/tone-analyzer/api'
});



app.post('/submit', function(request, response) {
  return response.send(request.body);
})


app.listen(3000, function(){
  console.log("Server is running on port 3000");
});
