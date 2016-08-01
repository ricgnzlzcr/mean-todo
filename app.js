'use strict';

var express = require('express');
var app = express();
var mongoose = require('mongoose');
var apiController = require('./src/controllers/apiController.js');

mongoose.connect('mongodb://localhost/todos');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("We're connected to the todo database");
});

app.use('/', express.static('public'));

/*
app.get('/', function(req, res) {
    res.send("Homepage loaded");
}); */

//Sets up API routes
apiController(app);



app.listen(3000, function() {
    console.log("Express server listening on port 3000");
})