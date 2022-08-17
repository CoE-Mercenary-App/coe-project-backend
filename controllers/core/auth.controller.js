/**
 * 
 * Auth Controller
 * Methods:
 *  login
 *  renewToken
 * 
 */

const { response } = require('express');
const bcrypt = require('bcryptjs');

const { User } = require('../../models');
const { generarJWT } = require('../../helpers');


const login = async(req, res = response) => {

    const { email, password } = req.body;

    try {

        const userDB = await User.findOne({ email });

        if (!userDB) {
            return res.status(404).json({
                ok: false,
                msg: 'User Invalid'
            });

        }

        const validPassword = bcrypt.compareSync(password, userDB.password);

        if (!validPassword) {
            return res.status(400).json({
                ok: true,
                msg: 'User Invalid'
            });

        }

        const token = await generarJWT(userDB.id);

        res.status(200).json({
            ok: true,
            msg: 'Login',
            token
        });



    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Unexpected Error...'
        });

    }

};



const renewToken = async(req, res = response) => {

    const uid = req.uid;

    const token = await generarJWT(uid);

    const user = await User.findById(uid);

    res.json({
        ok: true,
        token,
        user
    });
};




Object.assign(module.exports, {
    login,
    renewToken
});