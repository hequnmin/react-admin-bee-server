const db = require("./database");
const sql = require("./sql");

exports.reduce = (collection, operate, param, func) => {
  find(collection, param, func);
};

exports.queryById = (req, func) => {
  sql.select(req, (err, sqlstr) => {
    if (err) {
      return;
    }
    db.query(sqlstr, func);
  });
};

exports.find = (req, func) => {
  sql.select(req, (err, sqlstr) => {
    if (err) {
      return;
    }
    db.query(sqlstr, func)
  });
};

exports.findAll = (req, func) => {
  sql.select(req, (err, sqlstr) => {
    if (err) {
      return;
    }
    db.query(sqlstr, func)
  });
};

exports.addNew = (req, func) => {
  sql.insert(req, (err, sqlstr) => {
    if (err) {
      return;
    }
    db.query(sqlstr, func);
  });
};

exports.queryByName = (req, func) => {
  const sql = `SELECT id FROM [User] WHERE userName = '${req.body.userName}'`;
  db.query(sql, func);
};

exports.deleteById = (req, func) => {
  const id = req.params.id;
  const sql = `DELETE FROM [User] WHERE id = '${id}'`;
  db.query(sql, func);
};

exports.updateById = (req, func) => {
  sql.update(req, (err, sqlstr) => {
    if (err) {
      return;
    }
    db.query(sqlstr, func);
  });
};
