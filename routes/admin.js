var express = require('express')
var router = express.Router()

/* GET Admin page. */
// Need to secure the access of this page via session, first version could be passing the id in the url
router.get('/', (req, res, next) => {
  if (req.session && req.session.userId && req.session.userType === 'admin') {
    res.render('admin', { title: 'Admin' })
  } else {
    var err = new Error('You must be logged in to view this page.')
    err.status = 401
    return next(err)
  }
})

module.exports = router
