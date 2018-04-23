const mongoose = require('mongoose');
const User = require('../models/user');
const Tour = require('../models/tour');
const bcrypt = require('bcrypt');
const bcryptSalt = 10; // This number can be changed - unclear its meaning

mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/moto-tours', {
  keepAlive: true,
  reconnectTries: Number.MAX_VALUE
})
  .then(() => {
    const fullroute = [{coordinates: [27.7090319, 85.2911132]}, {coordinates: [28.2298558, 83.8865779]}, {coordinates: [28.6378237, 83.5971574]}, {coordinates: [28.8009381, 83.7770043]}, {coordinates: [28.4918295, 83.579959]}, {coordinates: [28.2298558, 83.8865779]}, {coordinates: [27.7090319, 85.2911132]}];
    return createNewTour('7 days wonderful motorbike tour in nepal', 'some cool description here', fullroute);
  })
  .then(() => {
    mongoose.disconnect();
  })
  .catch((err) => {
    console.log(err);
    mongoose.disconnect();
  });

function createNewTour (tripName, tripDescription, tripRoutes) {
  const name = tripName;
  const description = tripDescription;
  const routes = tripRoutes;

  const tour = new Tour({
    name,
    description,
    routes
  });
  return tour.save();
}

// mongoose.Promise = Promise;
// mongoose.connect('mongodb://localhost/moto-tours', {
//   keepAlive: true,
//   reconnectTries: Number.MAX_VALUE
// })
//   .then(() => {
//     return deleteUserCollections();
//   })
//   .then(() => {
//     return createNewUser('dauv', '12345','dauv@gmail.com');
//   })
//   .then(() => {
//     return createNewUser('lennie', '12345','lennie@gmail.com');
//   })
//   .then(() => {
//     mongoose.disconnect();
//   })
//   .catch((err) => {
//     console.log(err);
//     mongoose.disconnect();
//   });

// function createNewUser (username, pass, mail) {
//   const password = pass || '12345';
//   const firstname = username || 'user';
//   const email = mail || 'user@gmail.com';

//   const salt = bcrypt.genSaltSync(bcryptSalt);
//   const hashPass = bcrypt.hashSync(password, salt);
//   const user = new User({
//     firstname,
//     email,
//     password: hashPass
//   });
//   return user.save();
// }

// function deleteUserCollections () {
//   return User.remove();
// }
