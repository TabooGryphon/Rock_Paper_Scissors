// Creating webserver

var express = require('express');

var app = express();
var server = app.listen(3000);

app.use(express.static('public'));

console.log("It\'s Alive!!! It\'s Alive!!");

// Websocket and websocket events

var socket = require('socket.io');

var io = socket(server);

io.sockets.on('connection', newConnection);


function newConnection(socket) {
    console.log(socket.id + ' has connected');

    socket.on('connectPlayer', connectPlayer);

    function connectPlayer(user){
        var newPlayer = {
            name: user.name,
            id: socket.id,
        }
        socket.broadcast.emit('newPlayer', newPlayer);
    }

    socket.on('fill', fill)

    function fill(obj){
        socket.broadcast.to(obj.toID).emit('allUsers', obj);
    }

    socket.on('requestGame', requestGame);

    function requestGame(obj){
        console.log("Request Received");
        socket.broadcast.to(obj.toID).emit('gameRequest', obj);
    }

    socket.on('disconnect', disconnected);

    function disconnected(){
        var leave = {
            id: socket.id,
        }
        console.log(socket.id + " has disconnected");
        socket.broadcast.emit('userDisconnect', leave);
    }

    socket.on('game', setGame);

    function setGame(obj) {
        console.log(obj.address)
        socket.broadcast.to(obj.address).emit("player2join", obj);
    }

socket.on('myPick', playerPick);
var opponent;
function playerPick(player){
    opponent = {
        pick: player.pick,
    } 
    socket.broadcast.emit('opponent', opponent);
    }

    socket.on("playerJoin", playerJoin);

    function playerJoin(){

    }

}