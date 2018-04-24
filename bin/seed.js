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
