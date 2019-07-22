var router = require('express').Router();
var User = require('../models/user');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');



router.post('/register', function (req, res) {
    motpass = req.body.password;
    var hash = bcrypt.hashSync(motpass, 10);
    req.body.password = hash;
    var user = new User(req.body);
    user.save(function (err, User) {
        if (err) {
            res.send(err);
        }
        res.send(User);

    })
});


router.post('/login', function (req, res) {
    var email = req.body.email;
    User.findOne({ email: email }).exec((err, users) => {
        if (err) {
            res.send(err);
        }
        if (!users) {
            res.send('wrong email')
        }
        if (bcrypt.compareSync(req.body.password, users.password)) {
            let token = jwt.sign({data: users},"HS384",{ expiresIn: '3600'});
            res.send({
                success: true,
                message: 'Authentication successful!',
                access_token: token
            });
        } else {
            res.send('wrong password')
        }
    })
});




module.exports = router;