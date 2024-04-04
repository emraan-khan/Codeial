const Post = require('../models/post');

module.exports.home = function(req,res){
    // console.log(req.cookies);
    // res.cookie('user_id',35)
    Post.find({}).populate('user')
    .then(posts =>{
        return res.render('home',{
            title: "Home",
            posts: posts
        })
    })
    .catch(err =>{
        console.log('Error while fetching the post!!!');
    })

    
}