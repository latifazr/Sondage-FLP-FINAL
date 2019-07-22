var mongoose = require('mongoose');


var UserSchema = new mongoose.Schema({
    email:String,
    password:String,
    sujet:[{type:mongoose.Schema.Types.ObjectId,ref:'sujet'}]
});


module.exports = mongoose.model('user',UserSchema);