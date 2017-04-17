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

// Text parser for ecode360 print pages
var statParser = htmlToJson.createParser(
  ['.printHeader,a.titleLink,a.litem_number,.para,.history', {
  'type': function ($a) {
    return $a.attr('class');
  },
  'text': function ($a) {
    return $a.text();
  },
}]);


// Start update statutes
fs.readFile('./toc.json', 'utf8', (err, data) => {
  if (err) throw err;
  obj = JSON.parse(data);

  // Iterate through JSON list of all statutes
  for (var key in obj) {
    (function(cntr) { // Start function closure
      if (obj.hasOwnProperty(key)) {
        var targetURL = obj[key];
        var targetTitle = key;
        console.log("Updating " + key + " with information from " + obj[key]);
        // Make html-to-json request
        statParser.request(targetURL).done(function (stats) {
          // Write to current file in fs
          var filename = targetTitle + ".json";
          fs.writeFile(filename, JSON.stringify(stats), (err) => {
            if (err) throw err;
            console.log('Successfully wrote to ' + targetTitle + '.json');
          });
        });
      }
    })(key); // End function closure
  }// End status iteration
});// End update statutes



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
