const User = require('../models/user')

module.exports.user = function (req, res) {
    User.findById(req.params.id)
        .then((user) => {
            return res.render('userProfile', {
                title: 'User Profile',
                profile_user: user
            })

        })
        .catch()
}

module.exports.update = function (req, res) {
    if (req.user.id == req.params.id) {
        User.findByIdAndUpdate(req.params.id, req.body)
            .then(() => {
                return res.redirect('back');
            })
            .catch(err => {
                console.log('Error in updating the data ', err)
            })
    } else {
        return res.status(401).send('Unauthorized')
    }
}

module.exports.orderRes = function (req, res) {
    return res.end('<h1>Muh mai lele!!!</h1>')
}

module.exports.signIn = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/users/profile')
    }
    return res.render('user_signIn');
}

module.exports.signUp = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/users/profile')
    }
    return res.render('user_signUp');
}

// create action for user controller
module.exports.create = function (req, res) {
    if (req.body.password != req.body.confirm_password) {
        return res.redirect('back');
    }

    User.findOne({ email: req.body.email })
        .then((user) => {
            if (!user) {
                User.create(req.body)
                    .then(() => {
                        return res.redirect('/users/signIn');
                    })
                    .catch(err => {
                        console.log('Error in creating user', err);
                        return;
                    })
            }
            else {
                return res.redirect('back');
            }

        })
        .catch((err) => {
            console.log("Error in finding the user i sign Up", err);
            return;
        })
};

//sign in and create session for user
module.exports.createSession = function (req, res) {
    req.flash('success','Logged in Sucessfully');
    return res.redirect('/');
};

module.exports.destroySession = function (req, res) {
    req.flash('success','You have logged out!');
    console.log(req.flash('success')); // Log flash message

    req.session.destroy(function (err) {
        if (err) {
            console.log(err);
            
            return res.redirect('/');
        }
        // req.logout(function (err) { // Providing a callback function to req.logout()
        //                                                                                                                                                                                                                                                         
        //     if (err) {
        //         console.log(err);
        //         return res.redirect('/');
        //     }

        // });
            return res.redirect('/');
    });
}

