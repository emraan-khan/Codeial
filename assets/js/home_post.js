{
    let createPost = function(){
        let newPostForm = $('#new-post-form');

        newPostForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type: 'post',
                url: '/posts/create',
                data: newPostForm.serialize(),
                success: function(data){
                    // console.log(data);
                    let newPost = newPostDOM(data.data.post)
                    $('#posts-list-container>ul').prepend(newPost)
                    deletePost($(' .delete-post-button', newPost));

                    new ToggleLike($('.toggle-like-button', newPost));
                },
                error: function(err) {
                    console.log(error.responseText)

                }
            })
        })
    }

    // method to create a new post to dom
    let newPostDOM = function(post){
        return(`
        <li id="post-${ post._id}">
    <p>
            <h3>
            <a class="delete-post-button" href="/posts/destroy/${ post._id}">X</a>
            </h3>
        ${ post.content}
        <br>
        <small>
        ${ post.user.name }
        </small>
    </p>
    <small>
    <a class="toggle-like-button" data-likes="0" href="/likes/toggle/?id=${post._id}&type=Post">
    0 Likes
    
    </a>
    </small>
    <div class="post-comments">
        
            <form action="/comments/create" method="POST">
                <input type="text" name="content" placeholder="Type Here to add comment..." required>
                <input type="hidden" name="post" value="${ post._id }" >
                <input type="submit" value="Add Comment">
            </form>

       

        <div class="post-comments-list">
            <ul id="post-comments-<%= post._id %>">
            </ul>
        </div>
    </div>
    
</li>
`)
    }

    // method to delete post from dom
    let deletePost = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $ajax({
                type: 'DELETE',
                url: $(deleteLink).prop('href'),
                success: (data)=>{

                    $(`#post-${data.data.post._id}`).remove();
                },
                error : (error)=>{
                    conosle.log(error.responseText);
                }
            })
        })
    }

    createPost();
}