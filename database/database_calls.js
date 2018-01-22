
const mongoose = require('mongoose')
const Employee = require('./employee_schema')
const Manager = require('./manager_schema')
mongoose.Promise = global.Promise

// Get the list of Managers
async function getManagers () {
  mongoose.connect('mongodb://localhost/db', { useMongoClient: true }, function (err) {
    if (err) { throw err }
  })

  return Manager.find()
}

// Get the list of Employees
async function getEmployees () {
  mongoose.connect('mongodb://localhost/db', { useMongoClient: true }, function (err) {
    if (err) { throw err }
  })

  return Employee.find()
}

// Create an employee with the passed data
async function createEmployee (firstname, lastname, login, password, numberDaysOff, idManager) {
  mongoose.connect('mongodb://localhost/db', {useMongoClient: true}, function (err) {
    if (err) { throw err }
  })

  let employee = await new Employee({
    firstname: firstname,
    lastname: lastname,
    login: login,
    password: password,
    numberDaysOff: numberDaysOff,
    manager: idManager
  })

  await employee.save()
}

// Get the list of vacations of all employees for a common manager
async function getEmployeesVacationsByManager (idManager) {
  mongoose.connect('mongodb://localhost/db', { useMongoClient: true }, function (err) {
    if (err) { throw err }
  })

  let vacations = []

  let manager = await Manager.findById(idManager)

  for (let i = 0; i < manager.employees.length; i++) {
    let employee = await Employee.findById(manager.employees[i])
    for (let j = 0; j < employee.daysOff.length; j++) {
      vacations.push(employee.daysOff[j])
    }
  }
  return vacations
}

// Get the list of vacations for an employee
async function getEmployeeVacations (idEmployee) {
  mongoose.connect('mongodb://localhost/db', { useMongoClient: true }, function (err) {
    if (err) { throw err }
  })

  let employee = await Employee.findById(idEmployee)

  return employee.daysOff
}

// Calculate the number of open days between two dates
async function calculateOpenDays (startDate, endDate) {
  let openDays = 0

  startDate = new Date(Date.UTC(startDate.getFullYear(), startDate.getMonth(), startDate.getDate()))
  endDate = new Date(Date.UTC(endDate.getFullYear(), endDate.getMonth(), endDate.getDate()))

  for (let d = startDate; d.getTime() <= endDate.getTime(); d.setDate(d.getDate() + 1)) {
    if (d.getDay() !== 0 && d.getDay() !== 6) {
      openDays++
    }
  }
  return openDays
}

async function managerOfEmp (idEmployee) {
  mongoose.connect('mongodb://localhost/db', { useMongoClient: true }, function (err) {
    if (err) { throw err }
  })

  let employee = await Employee.findById(idEmployee)

  return employee.manager
}
// Adding a selection of Days on the request of the employee AND of the manager with the status 0 (no decided)
async function addVacation (idEmployee, startDate, endDate) {
  mongoose.connect('mongodb://localhost/db', { useMongoClient: true }, function (err) {
    if (err) { throw err }
  })

  startDate = new Date(Date.UTC(startDate.getFullYear(), startDate.getMonth(), startDate.getDate()))
  endDate = new Date(Date.UTC(endDate.getFullYear(), endDate.getMonth(), endDate.getDate()))
  let openDays = await calculateOpenDays(startDate, endDate)

  let employee = await Employee.findById(idEmployee)

  if (openDays <= employee.numberDaysOff) {
    employee.numberDaysOff = await employee.numberDaysOff - openDays

    await console.log('You have ' + employee.numberDaysOff + ' days remaining')
    await employee.daysOff.push({title: employee.firstname, start_Date: startDate, end_Date: endDate, status: 0})
  }

  let id = employee.daysOff[employee.daysOff.length - 1]._id
  let manager = await Manager.findById(employee.manager)
  await manager.vacationRequests.push({_id: id, title: employee.firstname, id_employee: idEmployee, start_Date: startDate, end_Date: endDate, status: 0})

  await employee.save()
  await manager.save()

  await mongoose.connection.close()
}

// Accept or refuse the request (refuse < 0 and accept > 0)
async function acceptOrRejectRequest (idManager, idRequest, validation) {
  mongoose.connect('mongodb://localhost/db', {useMongoClient: true}, function (err) {
    if (err) { throw err }
  })
  let idEmployee
  let manager = await Manager.findById(idManager)
  for (let i = 0; i < manager.vacationRequests.length; i++) {
    if (manager.vacationRequests[i]._id.equals(idRequest)) { manager.vacationRequests[i].status = validation }

    idEmployee = manager.vacationRequests[i].id_employee
  }

  let employee = await Employee.findById(idEmployee)
  let numberOfDays
  for (let i = 0; i < employee.daysOff.length; i++) {
    if (employee.daysOff[i]._id.equals(idRequest)) {
      employee.daysOff[i].status = validation
      if (validation < 0) {
        employee.numberDaysOff += numberOfDays
        await console.log('The request was refused, your account is credited with ' + numberOfDays + ' days')
      }
    }
    let employee = await Employee.findById(idEmployee)
    let numberOfDays
    for (let i = 0; i < employee.daysOff.length; i++) {
      if (employee.daysOff[i]._id.equals(idRequest)) {
        employee.daysOff[i].status = validation
        if (validation < 0) {
          employee.numberDaysOff += numberOfDays
          await console.log('The request was refused, your account is credited with ' + numberOfDays + ' days')
        }
      }
    }
    await employee.save()
    await manager.save()
    await mongoose.connection.close()
  }
}

// Get the list of the current requests
async function getVacationRequests (idManager) {
  mongoose.connect('mongodb://localhost/db', { useMongoClient: true }, function (err) {
    if (err) { throw err }
  })

  let currentRequests = []
  let manager = await Manager.findById(idManager)

  for (let i = 0; i < manager.vacationRequests.length; i++) {
    if (manager.vacationRequests[i] === 0) {
      currentRequests.push(manager.vacationRequests[i])
    }
  }

  return currentRequests
}

// Get the list of the refused requests
async function getRefusedRequests (idEmployee) {
  mongoose.connect('mongodb://localhost/db', { useMongoClient: true }, function (err) {
    if (err) { throw err }
  })

  let refusedRequests = []
  let employee = await Employee.findById(idEmployee)

  for (let i = 0; i < employee.daysOff.length; i++) {
    if (employee.daysOff[i].status < 0) {
      refusedRequests.push(employee.daysOff[i])
    }
  }

  return refusedRequests
}

// Authenticate the user
async function authenticate (login, password) {
  mongoose.connect('mongodb://localhost/db', { useMongoClient: true }, function (err) {
    if (err) { throw err }
  })
  let employee = await Employee.findOne({ login: login, password: password })
  return employee
}
module.exports = {
  getManagers: getManagers,
  getEmployees: getEmployees,
  getEmployeesVacationsByManager: getEmployeesVacationsByManager,
  getEmployeeVacations: getEmployeeVacations,
  getRefusedRequests: getRefusedRequests,
  addVacation: addVacation,
  acceptOrRejectRequest: acceptOrRejectRequest,
  getVacationRequests: getVacationRequests,
  createEmployee: createEmployee,
  authenticate: authenticate,
  managerOfEmp: managerOfEmp
}
