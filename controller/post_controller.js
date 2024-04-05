const Post = require('../models/post');
const Comment = require('../models/comment')
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

module.exports.destroy = function(req, res){
    Post.findById(req.params.id)
    .then(post =>{
        // .id means converting the object id into string
        if(post.user == req.user.id){
            // Attempt to remove the post
            post.deleteOne()
            .then(() => {
                // Remove associated comments
                Comment.deleteMany({post: req.params.id})
                .then(() => {
                    console.log('Post and associated comments deleted successfully');
                    return res.redirect('back');
                })
                .catch(err => {
                    console.log('Error in deleting the comments: ', err);
                    return res.redirect('back');
                });
            })
            .catch(err => {
                console.log('Error in deleting the post: ', err);
                return res.redirect('back');
            });
        }else{
            return res.redirect('back');

        }
    })
    .catch(err  =>{
        console.log('Unable to find the post ',err)
    })
}