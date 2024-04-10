const passport = require('passport')

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true,
    },
    function(req,email, password, done){
        User.findOne({email: email})
        .then(user =>{
            if(!user || user.password != password){
                req.flash('error',"Invalid User/Password")
                console.log('Invalid Username/Password');
                return done(null, false);
            }
            return done(null, user);
        })
        .catch(err =>{
            req.flash('error',err)
            console.log('Error in finding user ---> Passport');
            return done(err);
        })
    }
));

//serializing the user to decide which key is to be kept into the cookies
// this function will set the user id into the cookie
passport.serializeUser(function(user,done){
    done(null, user.id);
})

//deserializing the user
//sending back the key from cookie to the server to verify again
passport.deserializeUser(function(id,done){
    User.findById(id)
    .then(user => {
        return done(null, user);
    })
    .catch(err =>{
        console.log('Error in finding user ---> Passport');
            return done(err);
    })
});

// check user is signd in or not
passport.checkAuthentication = function(req, res, next){
    // if user is signed in then pass on req to next function
    if(req.isAuthenticated()){
        return next();
    }

    // if user is not signed in
    return res.redirect('/users/signIn')
}

passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){
        // req.user contains the current signed in user form session cookie and we are just sending it to locals for views
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;