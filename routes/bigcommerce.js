'use strict';

const KoaRouter = require('koa-router');
const router = new KoaRouter();

const BigCommerce = require('node-bigcommerce');
const bigCommerce = new BigCommerce({
    logLevel: 'info',
    clientId: process.env.BC_CLIENT_ID,
    secret: process.env.BC_SECRET,
    callback: process.env.BC_CALLBACK,
    responseType: 'json'
});


router.get('bc-index', '/index', (ctx) => {
    console.log(ctx.request.query.signed_payload);

    ctx.render('bigcommerce/index', { title: 'Index'}, true);
});

router.get('bc-auth', '/auth', async (ctx) => {
    const data = await bigCommerce.authorize(ctx.request.query);

    ctx.cookies.set('access_token', data.access_token);

    ctx.render('bigcommerce/auth', { title: 'Authorized!', data: data });
});

router.get('bc-load-old', '/load-old', (ctx) => {
    const data = bigCommerce.verify(ctx.request.query.signed_payload);

    console.log(ctx.cookies.get('access_token'));

    ctx.render('bigcommerce/load', { title: 'Load!', data: data });
});

module.exports = router;

