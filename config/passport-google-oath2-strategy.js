const passport = require("passport");
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');

//tell passport to use new strategy for google login
passport.use(new googleStrategy({
    clientID: "871890371326-ddh1qs7at8tdqm9uioqhen6b8ru19glm.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:8000/users/auth/google/callback"
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