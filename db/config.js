const mongoose = require('mongoose');


const dbConnection = async() => {

    try {
        await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('BD Online');

    } catch (error) {
        console.log(error);
        throw new Error('Failed to connect DB');
    }


};


Object.assign(module.exports, {
    dbConnection
});