var mongoose = require('mongoose');
var jsonwebtoken = require('jsonwebtoken');
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

function authenticate(req,res){

}

module.exports = {register,authenticate};
