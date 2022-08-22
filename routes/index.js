const authRoute = require('./core/auth.routes');
const userRoute = require('./core/user.routes');
const serviceRoute = require('./business/service.routes');

Object.assign(module.exports, {
    authRoute,
    userRoute,
    serviceRoute
});