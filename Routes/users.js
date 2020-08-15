const express = require('express');

const user_signup = require('../Helpers/userSignup');
const passport = require('passport');

const router = express.Router();

// Login page - GET /users/login
router.get('/login', ( req, res ) => {
    res.render('Auth/login');
})

// Login User - POST /users/login
router.post('/login', ( req, res, next ) => {
    passport.authenticate('local', {
        successRedirect: '/contacts',
        failureRedirect: '/users/login'
    }) ( req, res, next );
})

// Signup page - GET /users/signup
router.get('/signup', ( req, res ) => {
    res.render('Auth/signup');
})

// Handle signup - POST /users/signup
router.post('/signup', user_signup);

// Logout - GET /users/logout
router.get('/logout', ( req, res ) => {
    req.logout();
    res.redirect('/');
})

module.exports = router;