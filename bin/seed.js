'use strict';
const mongoose = require('mongoose');

const Tour = require('../models/tour');

mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/moto-tours', {
  keepAlive: true,
  reconnectTries: Number.MAX_VALUE
})
  .then(() => {
    return deleteTourCollections();
  })
  .then(() => {
    const fullroute = [{coordinates: [27.7090319, 85.2911132]}, {coordinates: [28.2298558, 83.8865779]}, {coordinates: [28.6378237, 83.5971574]}, {coordinates: [28.8009381, 83.7770043]}, {coordinates: [28.4918295, 83.579959]}, {coordinates: [28.208408, 84.3177056]}, {coordinates: [27.7090319, 85.2911132]}];
    return createNewTour('7 days wonderful motorbike tour in nepal', 'some cool description here', fullroute);
  })
  .then(() => {
    const fullroute = [{coordinates: [45.6942366, 5.8684471]}, {coordinates: [46.2480398, 6.7486877]}, {coordinates: [46.7402635, 7.6031855]}, {coordinates: [46.7427513, 8.7730751]}, {coordinates: [46.5293741, 10.4444522]}, {coordinates: [46.0240991, 9.213247]}, {coordinates: [45.7438747, 7.298168]}, {coordinates: [45.9322165, 6.7888765]}, {coordinates: [45.4105389, 6.3339831]}, {coordinates: [45.6942366, 5.8684471]}];
    return createNewTour('13 Days Grand Alps Motorcycle Tour', 'some cool description here', fullroute);
  })
  .then(() => {
    mongoose.disconnect();
  })
  .catch((err) => {
    console.log(err);
    mongoose.disconnect();
  });

function createNewTour (tripname, tripdescription, triproutes) {
  const name = tripname;
  const description = tripdescription;
  const routes = triproutes;

  const tour = new Tour({
    name,
    description,
    routes
  });
  return tour.save();
}

function deleteTourCollections () {
  return Tour.remove();
}
