/**
 * Created by vicky on 3/23/2017.
 */
module.exports = function () {
    var mongoose = require('mongoose');

    var userSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        phone: String,
        websites: [{type: mongoose.Schema.Types.ObjectId, ref: 'AssignmentWebsite'}],
        dateCreated: {type: Date, default: Date.now}
    }, {collection: 'assignment.user'});

    return userSchema;
};