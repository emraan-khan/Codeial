const nodeMailer = require('../config/nodemailer');

//this is another way of exporting a method
exports.newComment = (comment)=>{
 let htmlString = nodeMailer.renderTemplate({comment}, '/comments/new_comment.ejs')
    nodeMailer.transporter.sendMail({
        from: "Codeial_code",
        to: comment.user.email,
        subject: "New Comment Published",
        html: htmlString
    },(err, info)=>{
        if(err){console.log('Error in sending main',err); return;};

        console.log("Message Sent!", info);
        return;
        
    })
}