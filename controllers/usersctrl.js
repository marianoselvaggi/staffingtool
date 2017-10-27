var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var User = require('../models/users.js');

function register(req,res){
  var newuser = new User({
    fullname: req.body.fullname,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password,10)
  });

  newuser.save((err,user)=>{
    if(err) {
      return res.status(500).send({success: false, message: err.message})
    } else {
      user.password = undefined;
      return res.jsonp({success: true, user: user});
    };
  });
}

/**
 * AUTHENTICATE THE USER AND GET A TOKEN
**/
function authenticate(req,res){
  User.findOne({email: req.body.email},function(err,user){
    if(!user) {
      return res.status(401).send({success: false,message:'Authentication failed. User not found.' })
    } else {
      if(!user.ComparePassword(req.body.password)){
        return res.status(401).send({success: false,message:'Authentication failed. Incorrect password.' })
      } else {
        var token = jwt.sign({
          email: user.email,
          fullname: user.fullname,
          id: user._id,
        },req.app.get('secret'), {
          expiresIn:60*60*4
        });

        return res.jsonp({
          success: true,
          message: 'Enjoy your token',
          token: token
        });
      }
    }
  })
}

module.exports = {register,authenticate};
