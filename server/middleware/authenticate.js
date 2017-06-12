var {User} = require('./../models/user');

var authenticate = (req, res, next) => {
  var token = req.header('x-auth');

  User.findByToken(token).then((user) => {
    if (!user) {
      return Promise.reject(); // bumps it down to catch block
    }

    req.user = user;
    req.token = token;
    next();
  }).catch((e) => { // fires on Promise reject in user.js
    res.status(401).send();
  });
};

module.exports = {authenticate};
