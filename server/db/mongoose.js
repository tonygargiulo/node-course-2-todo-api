var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/TodoApp');
// process.env.MONGODB_URI
//  || 'mongodb://localhost/node-todo-api'
module.exports = {
  mongoose
};
