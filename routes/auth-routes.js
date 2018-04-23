'use strict';

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
// BCrypt to encrypt passwords
const bcrypt = require('bcrypt');
const bcryptSalt = 10; // This number can be changed - unclear its meaning

// Connect schema
const User = require('../models/user');

// Mongoose configuration
mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/moto-tours', {
  keepAlive: true,
  reconnectTries: Number.MAX_VALUE
});

// Routes
router.get('/signup', (req, res, next) => {
  if (req.session.user) {
    res.redirect('/');
  } else {
    const data = ({
      errorMessage: req.flash('signup-error')
    });
    res.render('./auth/signup', data);
  }
});

router.post('/signup', (req, res, next) => {
  const firstname = req.body.firstname;
  const email = req.body.email;
  const password = req.body.password;

  if (firstname === '' || email === '' || password === '') {
    req.flash('signup-error', 'Fill out all fields to sign up.');
    res.redirect('/auth/signup');
    return;
  }

  User.findOne({ email: email })
    .then(result => {
      if (result) {
        req.flash('signup-error', 'That email is already in use');
        res.redirect('/auth/signup');
      } else {
        const salt = bcrypt.genSaltSync(bcryptSalt);
        const hashPass = bcrypt.hashSync(password, salt);
        const user = new User({
          firstname,
          email,
          password: hashPass
        });
        user.save()
          .then(() => {
            req.session.user = user;
            res.redirect('/'); // note that this refers to the URL of the route, not where the template is
          })
          .catch(next);
      }
    });
});

router.get('/login', (req, res, next) => {
  if (req.session.user) {
    res.redirect('/');
  } else {
    const data = ({
      errorMessage: req.flash('login-error')
    });
    res.render('./auth/login', data); // refers to where the template is located
  }
});

router.post('/login', (req, res, next) => { // In this post & gets, you dont need the /auth, because it is built into the router in app.js already
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    req.flash('login-error', 'Enter both a username and a password to login.');
    res.redirect('/auth/login');
    return;
  }

  User.findOne({ email: email })
    .then(result => {
      if (!result) {
        req.flash('login-error', 'There is no user with that username. Try again.');
        res.redirect('/auth/login');
      } else if (!bcrypt.compareSync(password, result.password)) {
        req.flash('login-error', 'That password does not match our records for this username. Try again.');
        res.redirect('/auth/login');
      } else {
        req.session.user = result;
        res.redirect(`/`);
      }
    })
    .catch(next);
});

router.post('/logout', (req, res, next) => {
  if (req.session.user) {
    req.session.user = null;
  }
  res.redirect('/'); // When you have a redirect, always put in the full path, bc a redirect directly tells the browser what URL to go to. So if you wanted to redirect to an auth path, need `/auth/login`
});

module.exports = router;
