const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

var UserSchema = new mongoose.Schema({
    email: {
      required: true,
      trim: true,
      type: String,
      minLength: 1,
      unique: true,
      validate: {
        isAsync: true,
        validator: validator.isEmail,
        message: `{VALUE} is not a valid email`
      }
    },
    password: {
      type: String,
      required: true,
      minLength: 6
    },
    tokens: [{
      access: {
        type: String,
        required: true
      },
      token: {
        type: String,
        required: true
      }
    }]

});

UserSchema.methods.toJSON = function () {
  var user = this;
  var userObject = user.toObject();
  return _.pick(userObject, ['_id', 'email']);
};

UserSchema.methods.generateAuthToken = function () {
  var user = this; // individual document the method was called on
  var access = 'auth';
  var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();

  user.tokens.push({access, token});

  return user.save().then(() => {
    return token;
  });
};

// statics are model methods
UserSchema.statics.findByToken = function(token) {
  var User = this; // model, not indivivual doc
  var decoded;

  try {
    decoded = jwt.verify(token, 'abc123');
  } catch (e) {
    return Promise.reject('test');
  }

  return User.findOne({
    // see User schema above
    '_id': decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });
};

var User = mongoose.model('User', UserSchema);


module.exports = {User};
