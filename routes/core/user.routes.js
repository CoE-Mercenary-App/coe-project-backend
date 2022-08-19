/*
users
Route: /api/users
*/

const { Router } = require('express');
const { check } = require('express-validator');

const {
    validateInputs,
    validateJWT,
    validateADMIN_ROLE,
    validateADMIN_ROLE_o_sameuser
} = require('../../middlewares');

const { getUsers, getUsersPagination, newUser, updateUser, deleteUser, updateUserPws } = require('../../controllers');

const router = Router();

router.get('/', validateJWT, getUsers);

router.get('/pagination', validateJWT, getUsersPagination);

router.post('/', [
        check('name', 'Name field is required').not().isEmpty(),
        check('email', 'Email field is required').isEmail(),
        check('password', 'Password field is required').not().isEmpty(),
        validateInputs
    ],
    newUser);

router.put('/psswd/:id', [
        validateJWT,
        validateADMIN_ROLE_o_sameuser,
        check('password', 'Password field is required').not().isEmpty(),
        validateInputs
    ],
    updateUserPws);

router.put('/:id', [
        validateJWT,
        validateADMIN_ROLE_o_sameuser,
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Email is required').isEmail(),
        validateInputs
    ],
    updateUser);



router.delete('/:id', [validateJWT, validateADMIN_ROLE], deleteUser);


module.exports = router;