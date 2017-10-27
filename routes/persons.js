var express = require('express');
var route = express.Router();
var PersonCtrl = require('../controllers/personsctrl.js');

route.get('/',function(req,res,next) {
  PersonCtrl.getAllPersons(req,res);
});

route.get('/:email',function(req,res,next) {
  PersonCtrl.getPerson(req,res);
});

route.post('/',function(req,res,next) {
  PersonCtrl.addPerson(req,res);
});

route.put('/:email',function(req,res,next) {
  PersonCtrl.updatePerson(req,res);
});

route.post('/salaries/:email',function(req,res,next){
  PersonCtrl.addSalary(req,res);
});

module.exports = route;
