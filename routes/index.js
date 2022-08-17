const userRoute = require('./core/user.routes');
const authRoute = require('./core/auth.routes');

Object.assign(module.exports, {
    userRoute,
    authRoute
});