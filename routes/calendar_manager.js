let express = require('express')
let router = express.Router()
const calls = require('../database/database_calls')
router.get('/', function (req, res, next) {
    /*if (req.session && req.session.userId && req.session.userType === 'admin') {
      res.render('calendar_manager', {
        title: 'Calendar'
      })
      return next()
    } else {
      let err = new Error('You must be logged in to view this page.')
      err.status = 401
      return next(err)
    }*/
    res.render('calendar_manager', {
      title: 'Calendar'
    })
  })
  // GET for logout logout
router.get('/logout', function (req, res, next) {
    if (req.session) {
      // delete session object
      req.session.destroy(function (err) {
        if (err) {
          return next(err)
        }
        else {
          return res.redirect('/login')
        }
      })
    }
  })
  /* AJAX GET managerOfEmp(req.session.userId)'5a382f9aef1cf3023d922388' */
router.get('/recup_vacation_for_all_Emp', (req, res, next) => {
  let idManager
  calls.managerOfEmp(req.session.userId).then(result => {
    idManager = result
  })
  calls.getEmployeesVacationsByManager('5a382f9aef1cf3023d922388').then(result => {
    let event = []
    for (let i = 0; i < result.length; i++) {
      event.push({
        title: result[i].title
        , id: result[i]._id
        , start: result[i].start_Date
        , end: result[i].end_Date
      })
    }
    let JSONevent = JSON.stringify(event)
    res.send(JSONevent)
  }).catch(() => res.render('calendar_manager', {
    title: 'Calendar'
  }))
})
router.get('/recup_vacation_for_Emp', (req, res, next) => {
  calls.getEmployeeVacations(req.session.userId).then(result => {
    let event = []
    for (let i = 0; i < result.length; i++) {
      event.push({
        title: result[i].title
        , id: result[i]._id
        , start: result[i].start_Date
        , end: result[i].end_Date
      })
    }
    let JSONevent = JSON.stringify(event)
    res.send(JSONevent)
  }).catch(() => res.render('calendar_manager', {
    title: 'Calendar'
  }))
})
router.post('/endpoint', (req, res) => {
  let vacation = req.body.vac
  let vacationParse = JSON.parse(vacation)
  calls.addVacation(req.session.userId, new Date(vacationParse.start), new Date(vacationParse.end)).then(console.log('call add Vacation succeed')).catch(err => console.error('something went wrong', err))
})
module.exports = router