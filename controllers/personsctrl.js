var Person = require('../models/person.js');
var mongoose = require('mongoose');

/* Get the info about all the persons */
function getAllPersons(req,res){
  Person.find({},function(err,persons){
    if(err) {
      return res.status(400).send({success: false,message: err.message});
    } else {
      return res.json({sucess: true, persons: persons});
    }
  })
};

/* GET ONE PERSON BY EMAIL */
function getPerson(req,res){
  Person.findOne({email: req.params.email}, function(err,person){
    if(err) {
      return res.status(500).send({success: true,message:err.message});
    } else {
      if(person){
        return res.json({success: true, person: person});
      } else {
        return res.json({success: true, message: 'There is no user with this email address'});
      }
    }
  });
}

/* Add a person */
function addPerson(req,res){
  var newperson = new Person({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    country: req.body.country,
    birthDate: req.body.birthDate,
    startDate: req.body.startDate,
    endDate: req.body.endDate
  });
  newperson.save(function(err,person){
    if(err) {
      return res.status(500).send(err.message);
    } else {
      return res.json({success: true, person: person});
    }
  });
}

/**/
function addSalary(req,res){
  Person.findOne({'email': req.params.email},function(err,person){
    if(err) {
      return res.status(500).send(err.message);
    } else {
      var salary = {
        type: req.body.type,
        salary: req.body.salary,
        vacations: req.body.vacations,
        office: req.body.office,
        seniority: req.body.seniority,
        keeper: req.body.keeper,
        english: req.body.english
      };
      person.salaries.push(salary);
      person.save(function(err,person){
        if (err) {
          return res.status(500).send(err.message);
        } else {
          return res.json({success: true, person: person});
        }
      });
    }
  });
}

/*update the person information*/
function updatePerson(req,res){
  Person.findOne({'email': req.params.email},function(err,person){
    if(err) {
      return res.status(500).send(err.message);
    } else {
        Object.assign(person, req.body).save((err, book) => {
          if(err) {
            res.status(500).send(err);
          } else {
            res.json({ status: true, message: 'Person updated!', person: person});
          }
      });
    }
  });
}

module.exports = {getAllPersons,addPerson, getPerson, updatePerson, addSalary};
