var redis = require('redis');
var redisClient = redis.createClient();


var express = require('express');
var http = require('http');
var socket = require('socket.io');

var app = express();
var server = http.createServer(app);
var io = socket.listen(server);
io.set('log level', 1);

server.listen(process.env.PORT || 5000);

var config = require('./config.js')(app, express);

io.sockets.on('connection', function(client) {
  console.log("client connected");
  client.on('elements', function(element) {
    console.log(element);
    var elementString = JSON.stringify(element);
    redisClient.lpush('elements', elementString, function(err, response) {
      console.log(response);
    });

  });
});


