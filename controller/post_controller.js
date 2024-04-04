const Post = require('../models/post');

module.exports.create= function(req,res){
    console.log('Post function')
    Post.create({
        content: req.body.content,
        user: req.user._id })
        .then(()=>{
            return res.redirect('back');
        })
        .catch(err =>{
            console.log('Error in creating Post!!!')
        })
}