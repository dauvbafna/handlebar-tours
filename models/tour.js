'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const tourSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  routes: [{
    type: {
      type: String,
      default: 'Point'
    },
    coordinates: [Number]
  }],
  riders: [{
    type: ObjectId,
    ref: 'User'
  }]
});

const Tour = mongoose.model('Tour', tourSchema, 'tours');

module.exports = Tour;
