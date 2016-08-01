// var socket = require('socket.io');
// var fs = require('fs');

var express = require('express');
var app = express();
var path = require('path');

// dans le dossier public a la racine
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/bower_components'));
console.log(__dirname + '/public');


var server = app.listen(1337, function ()
{
	var host = server.address().address
	var port = server.address().port
	console.log("Example app listening at http://%s:%s", host, port)
	// app.get('/', function (req, res) {
	//    // res.send('ok');
	//    res.sendFile('/paint.html');
	// })
})

app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname + '/paint.html'));
});

// Chargement de socket.io
var io = require('socket.io').listen(server);

// Quand un client se connecte, on le note dans la console
io.sockets.on('connection', function (socket)
{
	socket.on('crayon', function (X,Y, X2, Y2, coont, heights, colors, choix, dataRemplie) {

		socket.X = X;
		socket.Y = Y;
		socket.X2 = X2;
		socket.Y2 = Y2;
		socket.coont = coont;
		socket.heights = heights;
		socket.colors = colors;
		socket.choix = choix;
		socket.dataRemplie = dataRemplie;
		console.log(socket.dataRemplie)

		// console.log('position X: '+X+', position Y: '+Y+' position X2: '+X2+', position Y2: '+Y2)

	// socket.emit('message',socket.X, socket.Y, socket.X2, socket.Y2);
	socket.broadcast.emit('message',socket.X, socket.Y, socket.X2, socket.Y2, socket.coont,socket.heights, socket.colors, socket.choix, socket.dataRemplie);
	});
	console.log('Un client est connecté !');
});

server.listen(1337);