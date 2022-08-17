/*
Route: /api/login
*/

const { Router } = require('express');
const { check } = require('express-validator');

const { validateInputs, validateJWT } = require('../../middlewares');
const { login, renewToken } = require('../../controllers');

const router = Router();

router.post('/', [
        check('email', 'Email is Required').isEmail(),
        check('password', 'Password is Required').not().isEmpty(),
        validateInputs
    ],
    login
);

router.get('/renew', validateJWT, renewToken);


module.exports = router;