var express = require('express')
var router = express.Router()
const calls = require('../database/database_calls')
router.get('/', function (req, res, next) {
  // if (req.session && req.session.userId && req.session.userType === 'employee') {
  res.render('calendar_employee', {
    title: 'Calendar'
  })
  /*  } else {
      var err = new Error('You must be logged in to view this page.')
      err.status = 401
      return next(err)
    }*/
})
// GET for logout logout
router.get('/logout', function (req, res, next) {
  if (req.session) {
    // delete session object
    req.session.destroy(function (err) {
      if (err) {
        return next(err)
      } else {
        return res.redirect('/login')
      }
    })
  }
})
router.get('/recup_vacation_for_Emp', (req, res, next) => {
  calls.getEmployeeVacations(req.session.userId).then(result => {
    console.log('result : ' + result.toString())
    var event = []
    for (let i = 0; i < result.length; i++) {
      event.push({
        title: result[i].title,
        id: result[i]._id,
        start: result[i].start_Date,
        end: result[i].end_Date
      })
    }
    var JSONevent = JSON.stringify(event)
    res.send(JSONevent)
  }).catch(err => console.error('something went wrong', err))
})
router.post('/endpoint', (req, res) => {
  var vacation = req.body.vac
  var vacationParse = JSON.parse(vacation)
  calls.addVacation(req.session.userId, new Date(vacationParse.start), new Date(vacationParse.end)).then(console.log('call add Vacation succeed')).catch(err => console.error('something went wrong', err))
})
module.exports = router
