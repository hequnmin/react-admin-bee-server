const express = require('express');
const router = express.Router();
const userDao = require('../dao/userDao');
const tools = require('../public/javascripts/tools');

router.get('/', function (req, res, next) {
  // res.send('respond with a resource.');
  userDao.findAll(req, function (err, data) {
    if (err) {
      res.send({
        success: false,
        data: err,
      });
    } else {
      res.send({
        data: data.recordset,
        total: data.rowsAffected,
      });
    }
  })
});

router.get('/:id', (req, res, next) => {
  userDao.find(req, (err, data) => {
    if (err) {
      res.send({
        success: false,
        data: err,
      });
    } else {
      // res.send({
      //   data: data.recordset,
      //   total: data.rowsAffected,
      // });
      res.send({
        data: { ...data.recordset[0] },
      });
    }
  });
});

router.post('/', function (req, res, next) {
  userDao.addNew(req, function (err, data) {
    if (err) {
      res.send({
        success: false,
        data: err,
      });
      return;
    }
    res.send({});
  })
});

router.put('/:id', (req, res, next) => {
  userDao.updateById(req, (err, data) => {
    if (err) {
      res.send({
        success: false,
        data: err,
      });
      return;
    }
    res.send({
      data: { ...data.recordset[0] },
      total: data.rowsAffected,
    });
  })
});

router.delete('/:id', (req, res, next) => {
  userDao.deleteById(req, (err, data) => {
    if (err) {
      res.send({
        success: false,
        data: err,
      });
      return;
    }
    res.send({
      data: [],
      total: data.rowsAffected,
    })
  });
});

module.exports = router;
