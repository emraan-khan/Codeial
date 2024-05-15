const mongoose = require('mongoose');

const friendshipSchema = new mongoose.Schema({
    // the user who sent this request
    from_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    // requests accepted by user
    to_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
},{
    timestamps: true
})

const FriendShip = mongoose.model('Friendship', friendshipSchema);
module.exports = FriendShip;