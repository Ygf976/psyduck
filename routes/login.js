var express = require('express')
var router = express.Router()
const User = require('../database/database_calls')

/* GET Login page. */
router.get('/', (req, res, next) => {
  res.render('login', { title: 'Login' })
})

// POST route for updating data
router.post('/', async (req, res, next) => {
  if (req.body.loglogin && req.body.logpassword) {
    await User.authenticate(req.body.loglogin, req.body.logpassword)
      .then(employee => {
        if (employee) {
          if (employee.__t === 'Manager') {
            req.session.userType = 'admin'
            req.session.userId = employee._id
            return res.redirect('/admin')
          } else {
            req.session.userType = 'employee'
            req.session.userId = employee._id
            return res.redirect('/calendar_employee')
          }
        } else {
          var err = new Error('Wrong login or password')
          err.status = 400
          return next(err)
        }
      }).catch(err => console.error('something went wrong', err))
  } else {
    var err = new Error('All fields required.')
    err.status = 400
    return next(err)
  }
})

module.exports = router
