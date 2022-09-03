require('dotenv').config();
const path = require('path');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerSpec = require('./swagger.json');

const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./db/config');
const app = express();

const logger = require('./log/logger');

logger.logMessage(' < Starting App >');


app.use(cors());
app.use(express.json());


dbConnection();

const route = require('./routes');

app.use(express.static('public'));
app.use('/api/', require('./routes/app'));
app.use('/api/login/', route.authRoute);
app.use('/api/users/', route.userRoute);
app.use('/api/services/', route.serviceRoute);

app.use('/api-doc/', swaggerUI.serve, swaggerUI.setup(swaggerJsDoc(swaggerSpec)));

app.get('*', (req, res) => {

    res.sendFile(path.resolve(__dirname, './public/index.html'));
});

app.listen(process.env.PORT, () => {

    console.log('server running on port: ', 3000);

});