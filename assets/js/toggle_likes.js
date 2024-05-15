// create a class to toggle a like when a link is clicked, using Ajax
class ToggleLike{
    constructor(toggleElement){
        this.toggler = toggleElement;
        this.toggleLike();
    }

    toggleLike(){
        $(this.toggler).click(function(e){
            e.preventDefault();
            let self= this;
        })
        // this is a new way to write ajax which you might have studied
        $.ajax({
            type: 'POST',
            url: $(self).attr('href'),
        })
        .done(function(data){
            let likesCount = parseInt($(self).attr('data-likes'));
            console.log(likesCount);
            if(data.data.deleted == true){
                likesCount -= 1;
            }else {
                 likesCount +=1;
            }

            $(self).attr('data-likes', likesCount);
            $(self).html(`${likesCount} Likes`)
        })
        .fail(function(errData){
            console.log('error in completeing the request');
        })
    }
}

