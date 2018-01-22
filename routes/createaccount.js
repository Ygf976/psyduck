var express = require('express')
var router = express.Router()

/* GET Login page. */
router.get('/', (req, res, next) => {
  res.render('createaccount', { title: 'Create an employee' })
})
module.exports = router
// POST route for updating data
router.post('/', async function (req, res, next) {
  if (req.body.login && req.body.password && req.body.firstname && req.body.lastname && req.body.numberdaysoff) {
    let User = require('../database/database_calls')
    await User.createEmployee(req.body.firstname, req.body.lastname, req.body.login, req.body.password, req.body.numberdaysoff, '5a37756ec772a4213c1ca441')
    return res.redirect('/admin')
  } else {
    var err = new Error('All fields required.')
    err.status = 400
    return next(err)
  }
})
