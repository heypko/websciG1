// server init + mods
var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);
var jsdiff = require('diff');
var fs = require('fs');
var htmlToJson = require('html-to-json');
require('colors')

// server route handler
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.get('/public/OfficerMap.html', function(req, res) {
  res.sendFile(__dirname + '/public/OfficerMap.html')
});

app.get('/public/diff.html', function(req, res) {
  res.sendFile(__dirname + '/public/diff.html')
});

app.use(express.static(__dirname));

// start server
server.listen(3000, function(){
  console.log('Server up on *:3000');
});

// Need to change to some struct w/ a callback-timeout that updates
// officer location every ___.
var livingOfficers = {};

// user connected even handler
io.on('connection', function(socket){

  // log & brodcast connect event
  console.log('An officer connected');

  // log disconnect event
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  // message received event handler
  socket.on('location', function(msg){
    // log chat msg
    console.log('Received ' + msg.name + '/\'s location' + ': ' + msg.location);

    livingOfficers[msg.name] = msg.location;

    socket.emit('receivedLocation', livingOfficers);
  });

  socket.on('message', function(msg, res){
    // Display msg sent
    console.log(msg);

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
  });// End message received
});

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


statParser.request('http://ecode360.com/print/GL1564?guid=11768279&children=true').done(function (stats) {
  console.log(stats);
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
