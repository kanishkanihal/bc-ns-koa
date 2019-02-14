'use strict';

const Koa = require('koa');
const app = new Koa();

/*const pug = require('./configs/pugConfig');
pug.use(app);
app.use(pug.middleware);
pug.locals.someKey = 'some value';*/

const Pug = require('koa-pug');
const pug = new Pug({
    viewPath: './views',
    debug: false,
    pretty: false,
    compileDebug: false,
    basedir: './views',
    app: app
});

const bcRouter = require('./routes/bigcommerce')
app.use(bcRouter.routes())
app.use(bcRouter.allowedMethods())

var bcStatic = require('koa-static')
var serve = bcStatic('client/build')
app.use(serve)

const normalizePort = (val) => {
    var port = parseInt(val,10);
    if (isNaN(port)) {return val;}
    if (port >= 0) {return port;}
    return false;
}
var port = normalizePort(process.env.PORT || '3000');
app.listen(port);

module.exports = {pug,app};
