 const jwt = require('jsonwebtoken');
 const { User } = require('../models');



 const validateJWT = (req, res, next) => {

     const token = req.header('x-token');

     if (!token) {
         return res.status(401).json({
             ok: false,
             msg: 'No token in the request'
         });
     }



     try {

         const { uid } = jwt.verify(token, process.env.JWT_SECRET);

         req.uid = uid;

         next();


     } catch (error) {
         return res.status(401).json({
             ok: false,
             msg: 'Invalid Token'
         });

     }

 };


 const validateADMIN_ROLE = async(req, res, next) => {

     const uid = req.uid;

     try {

         const userDB = await User.findById(uid);

         if (!userDB) {
             return res.status(404).json({
                 ok: false,
                 msg: 'User does not exist'
             });

         }

         if (userDB.role !== 'ADMIN_ROLE' && userDB.role !== 'SUPER_ROLE') {
             return res.status(403).json({
                 ok: false,
                 msg: 'Do Not have Privileges'
             });
         }

         next();


     } catch (error) {
         res.status(500).json({
             ok: false,
             msg: 'Unexpected Error...'
         });

     }



 };



 const validateADMIN_ROLE_o_sameuser = async(req, res, next) => {

     const uid = req.uid;
     const id = req.params.id;

     try {

         const userDB = await User.findById(uid);

         if (!userDB) {
             return res.status(404).json({
                 ok: false,
                 msg: 'User does not exist -'
             });

         }

         if (userDB.role === 'ADMIN_ROLE' || userDB.role === 'SUPER_ROLE' || uid === id) {

             next();

         } else {
             return res.status(403).json({
                 ok: false,
                 msg: 'Do Not have Privileges -'
             });
         }



     } catch (error) {
         res.status(500).json({
             ok: false,
             msg: 'Unexpected Error...',
             err: error
         });

     }



 };




 Object.assign(module.exports = {
     validateJWT,
     validateADMIN_ROLE,
     validateADMIN_ROLE_o_sameuser
 });