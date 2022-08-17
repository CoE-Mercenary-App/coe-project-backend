const jwt = require('jsonwebtoken');


const generarJWT = (uid) => {

    return new Promise((resolve, reject) => {

        const payload = {
            uid
        };

        jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '4h'
        }, (err, token) => {

            if (err) {

                console.log(err);
                reject('Failed to generate JWT');

            } else {
                resolve(token);
            }

        });

    });

};



Object.assign(module.exports, { generarJWT });