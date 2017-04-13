var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app);
var jsdiff = require('diff');
var fs = require('fs');
var htmlToJson = require('html-to-json');
require('colors')


app.get('/', function (req, res) {
  res.sendFile(__dirname + '/diff.html');
})

app.use(express.static(__dirname));

// Parse text from ecode360
var statParser = htmlToJson.createParser(
  ['.printHeader,a.titleLink,a.litem_number,.para,.history', {
  'type': function ($a) {
    return $a.attr('class');
  },
  'text': function ($a) {
    return $a.text();
  },

}]);

//http://ecode360.com/print/GL1564?guid=11768279&children=true
var targetURL = "http://ecode360.com/print/OY1221?guid=26874722&children=true"

statParser.request(targetURL).done(function (stats) {
  console.log(stats);
  // Write to File
  var filename = "./statuteEx.json";
  fs.writeFile(filename, JSON.stringify(stats), (err) => {
    if (err) throw err;
    console.log('Successfully wrote to statuteEx.json');
  });
});

// Demo for text comparison
var json1 = JSON.parse(fs.readFileSync('filecmp1.json'));
var json2 = JSON.parse(fs.readFileSync('filecmp2.json'));

console.log(json1);
console.log(json2);

diff = jsdiff.diffJson(json1, json2);

diff.forEach(function(part){
  // green for additions, red for deletions
  // grey for common parts
  var color = part.added ? 'green' :
  part.removed ? 'red' : 'grey';
  console.log(part.value[color]);
  // console.log("Added: " + part.added);
  // console.log("Removed: " + part.removed);
});

server.listen(3000, function () {
  console.log('Server up on *:3000');
})
