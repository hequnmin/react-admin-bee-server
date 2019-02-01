
exports.select = (req, callBack) => {
  const { baseUrl } = req;
  const tablename = baseUrl.substring(baseUrl.lastIndexOf('/')+1);
  const id = req.params.id;

  if (tablename.length <= 0) {
    callBack(true, 'invalid require or tablename.');
    return;
  }

  let sql = `SELECT * FROM [${tablename}]`;

  if (id) {
    sql += ` WHERE id = '${id}'`;
  }

  callBack(null, sql);
};


exports.insert = (req, callBack) => {
  const { baseUrl, body } = req;
  const tablename = baseUrl.substring(baseUrl.lastIndexOf('/')+1);

  const keys = [];
  const values = [];

  for (const k in body) {
    keys.push(k);
    const type = typeof(body[k]);
    if (type === 'number') {
      values.push(body[k]);
    } else {
      values.push(`'${body[k]}'`);
    }
  }

  const sql = `
    DECLARE @myid uniqueidentifier 
    SET @myid = NEWID()
    INSERT INTO [${tablename}] (id, ${ keys.join(',') }) 
    VALUES (@myid, ${ values.join(',') })
    `;

  callBack(null, sql);
};

exports.update = (req, callBack) => {
  const { baseUrl, body } = req;
  const tablename = baseUrl.substring(baseUrl.lastIndexOf('/')+1);
  let id = req.params.id;


  const keys = [];
  const sets = [];

  for (const k in body) {
    if (k === 'id') {
      id = body[k];
    } else {
      keys.push(k);
      const type = typeof(body[k]);
      if (type === 'number') {
        sets.push(`${k} = ${body[k]}`);
      } else {
        sets.push(`${k} = '${body[k]}'`);
      }
    }
  }
  const sql = `
    UPDATE [${tablename}]
    SET ${sets.join(',')}
    WHERE id = '${id}'
  `;

  callBack(null, sql);
};
