// import mssql from 'mssql';
const mssql = require('mssql');

const db = {};
const config = {
  user: 'sa',
  password: 'Becheer2016',
  server: 'localhost',
  database: 'reactadmin',
  multipleStatements: true,
};

const query = (sql, callBack) => {

  const connection = new mssql.ConnectionPool(config, (err) => {

    if (err) {
      console.log(err);
      return;
    }

    const ps = new mssql.PreparedStatement(connection);

    ps.prepare(sql, (err) => {
      if (err) {
        console.log(err);
        return;
      }

      ps.execute('', (err, result) => {
        if (err) {
          console.log(err);
          return;
        }

        ps.unprepare((err) => {
          if (err) {
            console.log(err);
            callBack(err, null);
            mssql.close();
            return;
          }
          callBack(err, result);
          mssql.close();
        });
      });
    });
  });
};

exports.query = query;
