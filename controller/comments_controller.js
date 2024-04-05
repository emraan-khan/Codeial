const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create= function(req,res){
    Post.findById(req.body.post)
    .then(post =>{
         if(post){
            Comment.create({
                content : req.body.content,
                post: req.body.post,
                user: req.user._id
            })
            .then(comment =>{
                post.comments.push(comment);
                post.save();
                res.redirect('/');
            })
            .catch(err =>{
                console.log('Error while creating the comment.')
            })
         }
    })
    .catch(err =>{
        console.log("Error while finding post.")
    })
}

module.exports.destroy = function(req , res){
    Comment.findById(req.params.id)
    .then(comment =>{
        let PostId= comment.post;
        console.log()
        if(!comment){

            return res.redirect('back')
        }
        else if(comment.user == req.user.id || comment.user){

            comment.deleteOne()
            .then(()=>{
                Post.findByIdAndUpdate(PostId, {$pull: {comments: req.params.id}})
                .then(()=>{
                    return res.redirect('back');
                })
                .catch(err =>{
                    console.log(`Error in deleting the comment id from post's array ${err}`)
                })
            })
            .catch(err =>{
                console.log('Error in deleting comment ',err);
            })
        }else{
            console.log('inside the else block')
            return res.redirect('back');

        }
    })
    .catch(err =>{
        console.log("Error in finding the comment ", err)
    })
}