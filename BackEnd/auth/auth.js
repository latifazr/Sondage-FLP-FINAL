var jwt = require('jsonwebtoken');

module.exports.authenticate = function (req, res, next) {
  var token = req.headers.authorization.split(' ')[1];
  jwt.verify(token, 'HS384', function(err , decoded){
    if (err){
      res.send('Unauthorized');
    }
    if (decoded){
      next();
    }
  })
}
