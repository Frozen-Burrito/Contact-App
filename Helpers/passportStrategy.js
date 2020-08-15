const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const User = require('../Models/User');

const passportStrategy = async ( passport ) => {
    passport.use(
        new LocalStrategy({ usernameField: 'email' }, async ( email, password, done ) => {

            try {
                let user = await User.findOne({ email: email })
            
                if (!user) {
                    return done( null, false, { message: 'No account found for this e-mail' });
                }

                bcrypt.compare( password, user.password, ( error, isMatch ) => {

                    if (error) throw error;

                    if (isMatch) {
                        return done( null, user );
                    } else {
                        return done( null, false, { message: 'The password is incorrect' });
                    }
                })
            } catch (error) {
                console.log(error);
            }
            
        })
    );

    passport.serializeUser(( user, done ) => {
        done( null, user.id );
    });

    passport.deserializeUser(( id, done) => {
        User.findById( id, ( error, user ) => {
            done( error, user );
        })
    }) 
}

module.exports = passportStrategy;