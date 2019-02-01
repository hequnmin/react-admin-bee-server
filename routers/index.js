var express = require('express');
var router = express.Router();
var tools = require('../public/javascripts/tools');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});

module.exports = router;
