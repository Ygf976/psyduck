const mongoose = require('mongoose')
const Schema = mongoose.Schema
var EmployeeSchema = new Schema({
  firstname: {
    type: String,
    required: true,
    trim: true
  },
  lastname: {
    type: String,
    required: true,
    trim: true
  },
  login: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  numberDaysOff: {
    type: Number,
    trim: true
  },
  manager: { // Reference to define
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Manager',
    required: true,
    trim: true
  },
  daysOff: [{title: String, start_Date: Date, end_Date: Date, status: Number}]
})
let Employee = mongoose.model('Employee', EmployeeSchema)
module.exports = Employee
