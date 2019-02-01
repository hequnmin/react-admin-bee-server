const jsonServer = require('json-server');
const fs = require('fs');
const server = jsonServer.create();

const middlewares = jsonServer.defaults();

const routerIndex = require('./routers/index');
const routerUser = require('./routers/user');

// 需要使用一个body-parser来处理POST，PUT和PATCH
server.use(jsonServer.bodyParser);

// // 设置默认的中间件 (logger, static, cors and no-cache)
server.use(middlewares);

server.use('/api', routerIndex);

server.use('/api/user', routerUser);

const port = 3000;
server.listen(port, function () {
    console.log(`http://localhost:${port} JSON Server is running.`);
});
