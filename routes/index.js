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
  const promise1 = User.findOne({ _id: req.params.userId });
  const promise2 = Tour.find({ riders: { $in: [req.params.userId] } });
  Promise.all([promise1, promise2])
    .then(values => {
      const userResult = values[0];

      const tourResult = values[1];

      console.log(values);
      const data = {
        user: userResult,
        tour: tourResult,
        javascript:
          `var acc = document.getElementsByClassName("accordion");
            var i;

            for (i = 0; i < acc.length; i++) {
              acc[i].addEventListener("click", function() {
                this.classList.toggle("active");
                var panel = this.nextElementSibling;
                if (panel.style.maxHeight){
                  panel.style.maxHeight = null;
                } else {
                  panel.style.maxHeight = panel.scrollHeight + "px";
                } 
              });
            }`
      };
      res.render('profile', data);
    })
    .catch(next);
});

// POST booking to profile
router.post('/:tour_id/booking', (req, res, next) => {
  Tour.findByIdAndUpdate(req.params.tour_id, {$push: {riders: req.session.user._id}})
    .then((result) => {
      console.log(result);
      res.redirect(`/profile/${req.session.user._id}`);
    })
    .catch(next);
});

module.exports = router;
