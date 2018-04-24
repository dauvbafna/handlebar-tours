'use strict';

const express = require('express');
const router = express.Router();
const Tour = require('../models/tour');

/* GET tour details page */
router.get('/:tourId', (req, res, next) => {
  Tour.findOne({_id: req.params.tourId})
    .then((result) => {
      const data = {
        tour: result
      };
      res.json(data);
    })
    .catch(next);
});

module.exports = router;
