const Comment = require('../models/comment');
const Post = require('../models/post');
const commentEmailWorker = require('../workers/comment_email_worker');
const queue =   require('../config/kue');
const Like = require('../models/like');

module.exports.create= function(req,res){
    Post.findById(req.body.post)
    .then(post =>{
         if(post){
            // Comment.create({
            //     content : req.body.content,
            //     post: req.body.post,
            //     user: req.user._id
            // })
            // .then(comment =>{
            //     console.log('comment created');
            //     post.comments.push(comment);
            //     post.save();
            //     comment.populate('user','name email')
            //     .execPopulate()
            //     .then(comment => {
            //         console.log('inside created');
            //         commentMailer.newComment(comment);
            //     })
            //     req.flash('success','commented')
            //     res.redirect('/');
            // })
            // .catch(err =>{
            //     console.log('Error while creating the comment.')
            // })

            Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            })
            .then(comment => {
                console.log('comment created');
                post.comments.push(comment);
                post.save();
                return Comment.populate(comment, { path: 'user', select: 'name email' });
            })
            .then(populatedComment => {
                console.log('inside created');
                // commentMailer.newComment(populatedComment);
                let job = queue.create('emails',comment).save(function(err){
                    if(err){
                        console.log('error in creating a queue');

                        console.log('job enqueued ',job.id);
                    }
                })
                req.flash('success', 'commented');
                res.redirect('/');
            })
            .catch(err => {
                req.flash('error', 'Error in commenting!!!');
                console.log('Error while creating the comment:', err);
            });
            
            
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
                    req.flash('success',"Comment deleted.")
                    Like.deleteMany({likeable: comment._id, onModel: 'Comment'})
                    .then(()=>{
                        console.log('Likes related to comment deleted')
                    })
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