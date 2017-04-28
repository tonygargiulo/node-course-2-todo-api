// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MondoDB server.');
  }
  console.log('Connected to MondoDB server.');

  // db.collection('Todos').findOneAndUpdate({
  //   _id: new ObjectID('58fff29ed277955d473a54c1')
  // }, {
  //   $set: {
  //     completed: false
  //   }
  // }, {
  //   returnOriginal: false
  // }).then((result) => {
  //   console.log(result);
  // });

  db.collection('Users').findOneAndUpdate({
    _id: new ObjectID('58ffe885d79d7e0cc0e25bb8')
  }, {
    $set: {
      name: 'Bob'
    },
    $inc: {
      age: 1
    }
  }, {
    returnOriginal: false
  }).then((result) => {
    console.log(result);
  });


  // db.close();
});
