var mongoose = require('mongoose');


var SujetSchema = new mongoose.Schema({
    titre:String,
    description:String,
    choix: {type: Boolean, default: false},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    user_vote: [{type: mongoose.Schema.Types.ObjectId, ref: 'user'}],
});

module.exports = mongoose.model('sujet',SujetSchema);