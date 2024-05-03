const passport = require("passport");
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');

//tell passport to use new strategy for google login
passport.use(new googleStrategy({
    // clientId : you will get from google auth page
    // client secret : same you will get it from auth page of google
},

    function (accessToken, refreshToken, profile, done) {
        // finding a user
        User.findOne({ email: profile.emails[0].value })
            .exec()
            .then(user => {
                console.log(profile);
                // if found set this user as req.user
                // req.user means sign-in this user
                if (user) {
                    return done(null, user);
                }
                else {
                    // if not found then create on
                    User.create({
                        name: profile.displayName,
                        email: profile.emails[0].value,
                        password: crypto.randomBytes(20).toString("hex")
                    })
                        .then(user => {
                            return done(null, user)
                        })
                        .catch(err => {
                            console.log('Error in Creating google-strategy passport', err);
                            return;
                        })
                }
            })
            .catch(err => {
                console.log('Error in google strategy-passport', err);
                return;
            })
    }

));

module.exports = passport;