/**
 * 
 * User Controller 
 * methods:
 *   getUsers,
 *   getUsersPagination,
 *   newUser,
 *   updateUser,
 *   updateUserPws,
 *   deleteUser
 * 
 */


const { response } = require('express');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const { User } = require('../../models');
const { generarJWT } = require('../../helpers');

const getUsers = async(req, res) => {

    const [users, total] = await Promise.all([
        User
        .find({ role: { $ne: "SUPER_ROLE" } }, 'name email role img active')
        .sort({ name: 1 }), // orden alfabetico
        User.countDocuments()
    ]);

    res.json({
        ok: true,
        msg: 'List of Users',
        total: total,
        users: users
    });

};


const getUsersPagination = async(req, res) => {

    const page = Number(req.query.page) || 0;

    const [users, total] = await Promise.all([
        User
        .find({ role: { $ne: "SUPER_ROLE" } }, 'name email role img active')
        .skip(page)
        .limit(5)
        .sort({ name: 1 }),
        User.countDocuments()
    ]);

    res.json({
        ok: true,
        total: total,
        users: users
    });

};


const newUser = async(req, res = response) => {

    const { email, password } = req.body;

    try {

        const existeEmail = await User.findOne({ email });

        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'User already registered'
            });
        }

        const user = new User({
            ...req.body,
            active: '1',
            created_at: new Date(),
            updated_at: new Date(),
        });

        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        await user.save();
        const token = await generarJWT(user.id);

        res.json({
            ok: true,
            user,
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


const updateUserPws = async(req, res = response) => {

    const uid = req.params.id;

    try {

        const userDB = await User.findById(uid);

        if (!userDB) {
            return res.status(404).json({
                ok: false,
                msg: 'There is no User with that ID'
            });

        }

        const { password } = req.body;
        const salt = bcrypt.genSaltSync();
        userDB.password = bcrypt.hashSync(password, salt);
        userDB.updated_at = new Date();

        await User.findByIdAndUpdate(uid, userDB, { new: true });

        res.status(200).json({
            ok: true,
            msg: 'User Password Updated'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Unexpected Error...'
        });

    }


};


const updateUser = async(req, res = response) => {

    const uid = req.params.id;

    try {

        const userDB = await User.findById(uid);

        if (!userDB) {
            return res.status(404).json({
                ok: false,
                msg: 'There is no User with that ID'
            });

        }

        const { password, email, ...campos } = req.body;

        if (userDB.email !== email) {

            const existeEmail = await User.findOne({ email });
            if (existeEmail) {
                return res.status(400).json({
                    ok: false,
                    msg: 'There is already a user with that Email'
                });

            }
        }

        const userActualizado = await User.findByIdAndUpdate(uid, campos, { new: true });

        res.status(200).json({
            ok: true,
            msg: 'User Updated',
            user: userActualizado
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Unexpected Error...'
        });

    }


};



const deleteUser = async(req, res = response) => {

    const uid = req.params.id;

    try {

        const userDB = await User.findById(uid);

        if (!userDB) {
            return res.status(404).json({
                ok: false,
                msg: 'There is no User with that ID'
            });

        }



        await User.findByIdAndDelete(uid);

        res.status(200).json({
            ok: true,
            msg: 'User Deleted'
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Unexpected Error...'
        });
    }
};



Object.assign(module.exports, {
    getUsers,
    getUsersPagination,
    newUser,
    updateUser,
    updateUserPws,
    deleteUser
});