'use strict';

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Tour = require('../models/tour');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index');
});

/* GET tour details page */
router.get('/tours/:tourId', (req, res, next) => {
  if (!(mongoose.Types.ObjectId.isValid(req.params.tourId))) {
    return next();
  }
  Tour.findOne({_id: req.params.tourId})
    .then((result) => {
      if (!result) {
        return next();
      }
      const data = {
        tour: result,
        javascript: `window.addEventListener('load', () => {
          tourDetails('${result._id}');
        });`
      };
      res.render('tours-detail', data);
    })
    .catch(next);
});

module.exports = router;
