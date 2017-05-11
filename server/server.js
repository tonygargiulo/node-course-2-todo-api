var express = require('express');
var bodyParser = require('body-parser');
var {MongoClient, ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();
const port = process.env.PORT || 3000;


app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos})
  }, (e) => {
    res.status(400).send(e);
  });
});

// GET /todos/1234567
app.get('/todos/:id', (req, res) => {
  var id = req.params.id;


  // validate id using isValid
    // 404 - send back empty body

  // findById
    // success
      // if todo - send it back
      // if no todo - send back 404 with empty body
    // error
      // 400 -
    if (ObjectID.isValid(id)) {
      id = new ObjectID(id);
      Todo.findById(id).then((todo) => {
        if (todo) {
          res.send({todo});
        } else {
          res.status(404).send();
        }
      }).catch((e) => {
        res.status(400).send();
      });
    } else {
      return res.status(404).send();
    }


});










app.listen(port, () => {
  console.log(`Started on port ${port}`);
});

module.exports = {app};
