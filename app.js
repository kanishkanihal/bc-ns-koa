'use strict';

const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
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

const bc = require('./routes/bigcommerce')
app.use(bc.routes())
app.use(bc.allowedMethods())

app.use(bodyParser())

const wh = require('./routes/webhooks')
app.use(wh.routes())


const normalizePort = (val) => {
    var port = parseInt(val,10);
    if (isNaN(port)) {return val;}
    if (port >= 0) {return port;}
    return false;
}
var port = normalizePort(process.env.PORT || '3000');
app.listen(port);

module.exports = {pug,app};
