const {
    getUsers,
    getUsersPagination,
    newUser,
    updateUser,
    updateUserPws,
    deleteUser
} = require('./core/user.controller');

const { login, renewToken } = require('./core/auth.controller');


Object.assign(module.exports, {
    getUsers,
    getUsersPagination,
    newUser,
    updateUser,
    updateUserPws,
    deleteUser,
    login,
    renewToken
});