const Pug = require('koa-pug');
const pug = new Pug({
    viewPath: './views',
    debug: false,
    pretty: false,
    compileDebug: false,
    basedir: './views'
});

module.exports = pug;
