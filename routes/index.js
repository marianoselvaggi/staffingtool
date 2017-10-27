var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/*authenticate the user and return the token*/
router.post('/authenticate', function(req,res,next){
  let UserCtrl = require('../controllers/usersctrl.js');

  UserCtrl.authenticate(req,res);
});

module.exports = router;
