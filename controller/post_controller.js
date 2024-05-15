const Post = require('../models/post');
const Comment = require('../models/comment')
const Like = require('../models/like');

module.exports.create = async function (req, res) {

    try {

        let post = await Post.create({
            content: req.body.content,
            user: req.user._id
        });
        if (req.xhr) {
            return res.status(200).json({
                data: {
                    post: post
                },
                message: 'Post Created!'
            })
        }
        req.flash('success', 'Post published!');
        return res.redirect('back');

    } catch (err) {
        req.error('error', 'Error in publishing Post!')
        console.log('Error in creating Post!!!')
    }
}

module.exports.destroy = function (req, res) {
    Post.findById(req.params.id)
        .then(post => {
            // .id means converting the object id into string
            if (post.user == req.user.id) {

                Like.deleteMany({likeable: post, onModel: 'Post'})
                .then(()=>{
                    Like.deleteMany({_id: {$in: post.comments}}).
                    then(()=>{
                        console.log('Comment deleted')
                    })
                })

                // Attempt to remove the post
                post.deleteOne()
                    .then(() => {
                        // Remove associated comments
                        Comment.deleteMany({ post: req.params.id })
                            .then(() => {

                                if(req.xhr){
                                    return res.status(200).json({
                                        data:{
                                            post_id:req.params.id
                                        },
                                        message: 'Post Deleted!'
                                    })
                                }
                                req.flash('success', 'Post and associated comments deleted successfully!!!')
                                console.log('Post and associated comments deleted successfully');
                                return res.redirect('back');
                            })
                            .catch(err => {
                                console.log('Error in deleting the comments: ', err);
                                return res.redirect('back');
                            });
                    })
                    .catch(err => {
                        req.flash('error', 'Error in deleting post')
                        console.log('Error in deleting the post: ', err);
                        return res.redirect('back');
                    });
            } else {
                return res.redirect('back');

            }
        })
        .catch(err => {
            console.log('Unable to find the post ', err)
        })
}