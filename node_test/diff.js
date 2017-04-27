var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);
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

//
// // user connected even handler
// io.on('connection', function(socket){
//
//   // log & brodcast connect event
//   console.log('a user connected');
//
//   // log disconnect event
//   socket.on('disconnect', function(){
//     console.log('user disconnected');
//   });
//
  // message received event handler
  
// }); // End socket.io connection





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
