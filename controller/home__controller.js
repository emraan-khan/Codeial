const Post = require('../models/post');

module.exports.home = function (req, res) {
    Post.find({})
    .populate('user')
    .populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    })
    .then(posts => {
        return res.render('home', {
            title: 'Home',
            posts: posts
        });
    })
    .catch(err => {
        console.log('Error while fetching the post!!!', err);
        // Handle the error appropriately, e.g., send an error response
        return res.status(500).send('Error while fetching posts');
    });


}