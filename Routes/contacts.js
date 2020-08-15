const express = require('express');
const Contact = require('../Models/Contact');

const router = express.Router();

// Contact List - GET /contacts
router.get('/', async ( req, res ) => {

    try {
        const contacts = await Contact.find({ user: req.user.id });
        const username = req.user.name;
        res.render('Contacts/index', { contacts, username });

    } catch (error) {
        console.log(error);
        res.render('Contacts/index', { errorMsg: 'Failed to get contacts' });
    }
    
})

// Render new contact form - GET /contacts/new
router.get('/new', ( req, res ) => {
    res.render('Contacts/newContact');
})

// Add new contact - POST /contacts/new
router.post('/new', async ( req, res ) => {

    try {
        req.body.user = req.user.id;

        await Contact.create(req.body);
        res.redirect('/contacts');

    } catch (error) {
        console.error('error');
        res.redirect('/contacts');
    }
})

// Render contact edit form - GET /contacts/edit/:id
router.get('/edit/:id', async ( req, res ) => {

    try {
        const contact = await Contact.findById( req.params.id );
        res.render('Contacts/edit', { contact });

    } catch (error) {
        res.redirect('/contacts');
    }
})

// Update contact info - PUT /contacts/edit/:id
router.put('/edit/:id', async ( req, res ) => {
    
    let contact;
    try {
        contact = await Contact.findById( req.params.id );
        contact.set(req.body);
        await contact.save();

        res.redirect('/contacts');

    } catch (error) {
        
        if (author == null) {
            res.redirect('/contacts');
        } else {
            console.log(error);
            res.render('Contacts/edit', { 
                contact,  
                errorMsg: 'There was an error updating the contact info' 
            });
        }
    }
})

// Delete contact - DELETE /contacts/:id
router.delete('/:id', async ( req, res ) => {

    let contact;
    try {
        contact = await Contact.findById( req.params.id );
        await contact.remove();

        res.redirect('/contacts');

    } catch (error) {
        console.log(error);
        res.redirect('/contacts');
    }
})

module.exports = router;