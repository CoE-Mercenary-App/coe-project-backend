const { login, renewToken } = require('./core/auth.controller');

const {
    getUsers,
    getUsersPagination,
    newUser,
    updateUser,
    updateUserPws,
    deleteUser
} = require('./core/user.controller');

const {
    getServices,
    newService,
    updateService,
    deleteService
} = require('./business/service.controller');



Object.assign(module.exports, {
    login,
    getUsers,
    getUsersPagination,
    newUser,
    updateUser,
    updateUserPws,
    deleteUser,
    renewToken,
    getServices,
    newService,
    updateService,
    deleteService
});