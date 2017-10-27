var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var personSchema = new Schema({
  firstName: {type: String, trim: true, required: true},
  lastName:  {type: String, trim: true, required: true},
  email:   {type: String, trim: true, required: true, lowercase: true},
  country: ['Argentina','Brasil','Colombia'],
  birthDate: {type: Date},
  startDate: {type: Date, required: true, default: Date.now},
  endDate: {type: Date},
  salaries: [{
    type: {type: String, enum: ['flat','hourly'], required: true},
    salary: {type: Number, required: true},
    vacations: {type: Number, required: true},
    office: {type: String, enum: ['remote','1wfh','2wfh'], required: true},
    seniority: {type: String, enum: ['JR','SSR','SSR+','SR','SR+'], required: true},
    keeper: {type: String, enum: ['-','--','+','++'], required: true},
    english: {type: String, enum: ['Pre-Intermediate','Intermediate','Intermediate+','Upper-Intermediate','Advanced'], required: true},
    creation: {type: Date, default: Date.now},
  }],
  creation: {type: Date, required: true, default: Date.now}
});

personSchema.methods.FullName = function(){
  return this.firstname + " " + this.lastname;
};

module.exports = mongoose.model('Person',personSchema);
