/*
services
Route: /api/services
*/

const { Router } = require('express');
const { check } = require('express-validator');

const {
    validateInputs,
    validateJWT 
} = require('../../middlewares');

const { getServices, newService, updateService, deleteService } = require('../../controllers');

const router = Router();

router.get('/', validateJWT, getServices);

router.post('/', [
        check('service', 'Service name field is required').not().isEmpty(),
        validateInputs
    ],
    newService);


router.put('/:id', [
        check('service', 'Service name field is required').not().isEmpty(),
        validateInputs
    ],
    updateService);



router.delete('/:id', validateJWT, deleteService);


module.exports = router;