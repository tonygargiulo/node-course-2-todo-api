const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');


// todo queries

// var id = '59092adf679b91742be5925ff';
//
// if (!ObjectID.isValid(id)) {
//   console.log('ID not valid.');
// }

// find method returns array with object(s) inside
// Todo.find({
//   _id: id
// }).then((todos) => {
//   console.log('Todos', todos);
// });
//
// // findOne method returns object
// Todo.findOne({
//   _id: id
// }).then((todo) => {
//   console.log('Todo', todo);
// });
//
// // probably easiest, returns object too
// Todo.findById(id).then((todo) => {
//   if (!todo) {
//     return console.log('Id not found');
//   }
//   console.log('Todo by ID', todo);
// }).catch((e) => console.log(e));




// Users queries

userId = '5902bf45c1529b002550c72b';

if (!ObjectID.isValid(userId)) {
  console.log('Invalid ID');
}

User.findById(userId).then((user) => {
  if (!user) {
    return console.log('ID not found');
  }
  console.log(JSON.stringify(user, undefined, 2));
}).catch((e) => console.log(e));
