 const { response } = require('express');
 const { validationResult } = require('express-validator');


 const validateInputs = (req, res = response, next) => {

     const errores = validationResult(req);

     if (!errores.isEmpty()) {
         return res.status(400).json({
             ok: false,
             errors: errores.mapped()
         });
     }

     next();
 };

 Object.assign(module.exports, { validateInputs });