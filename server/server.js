var Hapi = require('hapi');
var Inert = require('inert');
var Path = require('path');

// Create Hapi Server
var server = new Hapi.Server();
server.connection({ port: 3000 });

// Register Plugins
server.register(Inert, function (err) {
  if (err) throw err;
});

// Simple HTTP Server for the Public directory
server.route({
  method: 'GET',
  path: '/',
  handler: {
    file: Path.join(__dirname, '../public/index.html')
  }
});

server.route({
  method: 'GET',
  path: '/{file}',
  handler: {
    directory: {
      path: Path.join(__dirname, '../public')
    }
  }
});

// Create Socket Server
var io = require('socket.io')(server.listener);
io.on('connection', function (socket) {

  socket.on('user event', function (data) {

    console.log(data);
  });
});

server.start(function () {
  console.log('Server running at:', server.info.uri);
});