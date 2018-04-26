'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const tourSchema = new Schema({
  name: {
    type: String
  },
  description: {
    type: String
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
  }],
  days: [{
    title: [String],
    daySummary: [String]
  }]
});

const Tour = mongoose.model('Tour', tourSchema, 'tours');

module.exports = Tour;
