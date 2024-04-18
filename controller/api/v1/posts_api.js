const Post = require('../../../models/post')
const Comment = require('../../../models/comment')
module.exports.index = async function (req, res) {

    let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        });
    console.log(posts);

    return res.json(200, {
        message: "List of posts",
        posts: posts
    })
}


module.exports.destroy = async function (req, res) {
    try {
        let post = await Post.findById(req.params.id);
        await post.deleteOne();
        await Comment.deleteMany({ post: req.params.id })

        return res.json(200 ,{
            message: "Post and associated comments are deleted successfully"
        })

    } catch (err) {
        console.log('***************',err)
        return res.json(500, {
            message: "Internal Error"
        })
    }
}