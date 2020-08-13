const express = require("express");
const Contact = require('../Models/Contact');

const router = express.Router();

// Homepage - GET /
router.get('/', async ( req, res ) => {

    try {
        const contacts = await Contact.find();
        res.render('index', { contacts });

    } catch (error) {
        console.log(error);
        res.render('index', { errorMsg: 'Failed to get contacts' });
    }
    
})

// Render new contact form - GET /new
router.get('/new', ( req, res ) => {
    res.render('newContact');
})

// Add new contact - POST /new
router.post('/new', async ( req, res ) => {

    try {
        await Contact.create(req.body);
        res.redirect('/');

    } catch (error) {
        console.error('error');
        res.redirect('/');
    }
})

module.exports = router;