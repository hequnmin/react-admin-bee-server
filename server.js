const jsonServer = require('json-server');
const fs = require('fs');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

// 需要使用一个body-parser来处理POST，PUT和PATCH
server.use(jsonServer.bodyParser);

// 设置默认的中间件 (logger, static, cors and no-cache)
server.use(middlewares);

server.use(router);

server.listen(3000, function () {
    console.log('JSON Server is running');
});
