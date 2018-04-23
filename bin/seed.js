const mongoose = require('mongoose');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const bcryptSalt = 10; // This number can be changed - unclear its meaning

mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/moto-tours', {
  keepAlive: true,
  reconnectTries: Number.MAX_VALUE
})
  .then(() => {
    return deleteUserCollections();
  })
  .then(() => {
    return createNewUser('byron', '1234');
  })
  .then(() => {
    return createNewUser('byron2', '1234');
  })
  .then(() => {
    mongoose.disconnect();
  })
  .catch((err) => {
    console.log(err);
    mongoose.disconnect();
  });

function createNewUser (username, pass, mail) {
  const password = pass || '123';
  const firstname = username || 'daaamn';
  const email = mail || 'daamn@damn.com';

  const salt = bcrypt.genSaltSync(bcryptSalt);
  const hashPass = bcrypt.hashSync(password, salt);
  const user = new User({
    firstname,
    email,
    password: hashPass
  });
  return user.save();
}

function deleteUserCollections () {
  return User.remove();
}
