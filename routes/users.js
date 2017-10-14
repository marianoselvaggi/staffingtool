var express = require('express');
var router = express.Router();
var UserCtrl = require('../controllers/userctrl.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/', function(req,res,next){
  UserCtrl.register(req,res);
});

module.exports = router;
