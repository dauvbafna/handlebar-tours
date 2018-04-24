'use strict';

const express = require('express');
const router = express.Router();
const Tour = require('../models/tour');
const User = require('../models/user');

/* GET home page. */
router.get('/', (req, res, next) => {
  Tour.find({})
    .then((result) => {
      const data = {
        tour: result
      };
      res.render('index', data);
    })
    .catch(next);
});

/* GET tour details page */
router.get('/tours/:tourId', (req, res, next) => {
  Tour.findOne({_id: req.params.tourId})
    .then((result) => {
      const data = {
        tour: result
      };
      res.render('tours-detail', data);
    })
    .catch(next);
});

router.get('/profile/:userId', (req, res, next) => {
  User.findOne({ _id: req.params.userId })
    .then((result) => {
      const data = {
        user: result
      };
      res.render('profile', data);
    })
    .catch(next);
});

module.exports = router;
