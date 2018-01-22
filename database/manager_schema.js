const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Employee = require('./employee_schema')

let ManagerSchema = new Schema({
  vacationRequests: [{id_employee: Schema.ObjectId, title: String, start_Date: Date, end_Date: Date, status: Number}],
  employees: [{type: mongoose.Schema.Types.ObjectId, ref: 'Employee'}]
})

let Manager = Employee.discriminator('Manager', ManagerSchema)

module.exports = Manager
