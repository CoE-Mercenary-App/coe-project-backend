const { validateInputs } = require('./validate_input');
const {
    validateJWT,
    validateADMIN_ROLE,
    validateADMIN_ROLE_o_sameuser
} = require('./validate_jwt');



Object.assign(module.exports, {
    validateInputs,
    validateJWT,
    validateADMIN_ROLE,
    validateADMIN_ROLE_o_sameuser
});