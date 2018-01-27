const mongoose = require('mongoose')
mongoose.Promise = global.Promise
const Employee = require('./employee_schema')
const Manager = require('./manager_schema')
const call = require('./database_calls')
const databaseUrl = 'mongodb://mongo/test'
mongoose.connect(databaseUrl, {
  useMongoClient: true
}, function (err) {
  if (err) {
    throw err
  }
})
initiateDB().then(result => console.log('Result' + result)).then(() => mongoose.connection.close()).catch(err => console.error('something went wrong', err))
async function initiateDB() {
  await Employee.remove()
  let managers = await createManagers()
  await createEmployees(managers)
  return call.getEmployees()
}
async function createManagers() {
  await console.log('Wainting for creation of managers ... ')
  let John = await new Manager({
    firstname: 'John',
    lastname: 'Doe',
    login: 'john',
    password: 'doe',
    numberDaysOff: 50
  })
  let Jane = await new Manager({
    firstname: 'Jane',
    lastname: 'Doe',
    login: 'jane',
    password: 'doe',
    numberDaysOff: 75,
    manager: John._id
  })
  John.manager = Jane._id
  await John.save()
  await Jane.save()
  return [Jane._id, John._id]
}
async function createEmployees(managers) {
  await console.log('Wainting for creation of employees ... ')
  let allManagers = await Manager.find()
  let manu = await new Employee({
    firstname: 'Emmanuel',
    lastname: 'Coucy',
    login: 'emmanuel',
    password: 'coucy',
    numberDaysOff: 5,
    manager: allManagers[0]._id,
    daysOff: [{
      title: 'Emmanuel Coucy',
      start_Date: new Date(2017, 13, 19),
      end_Date: new Date(2017, 13, 19),
      status: 1
    }]
  })
  await allManagers[0].employees.push(manu._id)
  let etienne = await new Employee({
    firstname: 'Etienne',
    lastname: 'Gineste',
    login: 'etienne',
    password: 'gineste',
    numberDaysOff: 5,
    manager: allManagers[1]._id,
    daysOff: [{
      title: 'Etienne Gineste',
      start_Date: new Date(2017, 11, 19).toISOString(),
      end_Date: new Date(2017, 11, 19).toISOString(),
      status: 1
    }]
  })
  await allManagers[1].employees.push(etienne._id)
  let yann = await new Employee({
    firstname: 'Yann',
    lastname: 'Giry-Fouquet',
    login: 'yann',
    password: 'giret-fouquet',
    numberDaysOff: 5,
    manager: allManagers[1]._id,
    daysOff: [{
      title: 'Yann Giry-Fouquet',
      start_Date: new Date(2017, 13, 20),
      end_Date: new Date(2017, 13, 20),
      status: 1
    }]
  })
  await allManagers[1].employees.push(yann._id)
  let silouane = await new Employee({
    firstname: 'Silouane',
    lastname: 'Galinou',
    login: 'silouane',
    password: 'galinou',
    numberDaysOff: 5,
    manager: allManagers[0]._id,
    daysOff: [{
      title: 'Silouane Galinou',
      start_Date: new Date(2017, 13, 22),
      end_Date: new Date(2017, 13, 22),
      status: 1
    }]
  })
  await allManagers[0].employees.push(silouane._id)
  await allManagers[0].save()
  await allManagers[1].save()
  await etienne.save()
  await manu.save()
  await silouane.save()
  await yann.save()
}
