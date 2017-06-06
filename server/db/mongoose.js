var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/node-todo-api');
// process.env.MONGODB_URI
module.exports = {
  mongoose
};
