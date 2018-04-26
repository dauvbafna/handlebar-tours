'use strict';

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
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

// get profile page

router.get('/profile/:userId', (req, res, next) => {
  User.findOne({ _id: req.params.userId })
    .then((result) => {
    // find Tours where the user is a rider
    // Tour.find
      console.log(result);
      const data = {
        user: result
      };
      res.render('profile', data);
    })
    .catch(next);
});

// POST booking to profile
router.post('/:tour_id/booking', (req, res, next) => {
  Tour.findOne({ _id: req.params.tour_id })
    .then((result) => {
      console.log(result);

      // Tour.update({ _id: req.params.tour_id },
      //   { $push: { riders: req.session.user._id } }
      // );

      res.redirect(`/`); // @todo either direct to Thank you for booking page with link to /profile or figure out how to mkae line below work
      // res.redirect(`profile/${req.session.user._id}`);
    })
    .catch(next);
});

module.exports = router;
