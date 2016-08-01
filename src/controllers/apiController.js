var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Todos = require('./../models/todoModel.js');

module.exports = function(app) {
    app.use(bodyParser.json());

    app.get('/api/todos', function(req, res) {
        Todos.find({}, function(err, todos) {
            if (err) console.log("Error gettings todos");
            console.log("Used GET to retreive todos");
            res.json(todos);
        });
    });

    app.post('/api/todos', function(req, res) {
        if (!req.body) console.log("Nothing sent in body of POST");
        Todos.create({"todo": req.body.todo, "completed": false});
        res.send("I'm supposed to " + req.body.todo);
    });

    app.delete('/api/todos', function(req, res) {
        if (!req.body) console.log("Nothing sent in body of DELETE");
        console.log(req.body._id);
        Todos.findByIdAndRemove(req.body._id, function(err) {
            if (err) console.log("Error deleting document");
            //console.log(req.body);
            res.send("Document deleted: " + req.body._id) ;
        });
    });
};