const bcrypt = require('bcrypt');

const User = require('../Models/User');

const user_signup = async ( req, res ) => {
    const { name, email, password, passwordConfirm } = req.body;
    let formErrors = [];

    if (!name || !email || !password || !passwordConfirm) {
        formErrors.push({ message: 'All fields are required' });
    }

    if (password.length < 8) {
        formErrors.push({ message: 'Password must be at least 8 characters long' });
    }

    if (password !== passwordConfirm) {
        formErrors.push({ message: 'Passwords don\'t match' });
    }

    if (formErrors.length > 0) {

        context = {
            formErrors,
            name,
            email,
            password,
            passwordConfirm,
        };

        res.render('Auth/signup', context);
    } else {

        const user = await User.findOne({ email: email });

        if (user) {
            formErrors.push({ message: 'A user with that email already exists' });

            context = {
                formErrors,
                name,
                email,
                password,
                passwordConfirm,
            };
    
            res.render('Auth/signup', context);
        } else {
            const newUser = new User({
                name, 
                email,
                password,
            });

            bcrypt.genSalt(10, ( error, salt ) => {
                bcrypt.hash( newUser.password, salt, async( error, hash ) => {
                    if (error) throw error;
                    
                    newUser.password = hash;

                    try {
                        await newUser.save();
                        res.redirect('/contacts');
                    } catch (error) {
                        console.log(error);
                    }
                    
                })
            })
        }
    }
}

module.exports = user_signup;