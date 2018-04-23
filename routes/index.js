'use strict';

const express = require('express');
const router = express.Router();
const Tour = require('../models/tour');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index');
});

/* GET tour details page */
router.get('/tours/:tourId', (req, res, next) => {
  Tour.findOne({_id: req.params.tourId})
    .then((result) => {
      const data = {
        tour: result
      };
      res.render('tours-detail', data);
    });
});

module.exports = router;
