const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const indexRouter = require('./routes/index');
const productsRouter = require('./routes/product');
//const {sessionRouter} = require('./routes/session');
//const streamRouter = require('./routes/stream');
//const oddsJamRouter = require('./routes/oddsJam');

const cors = require('cors')
require('dotenv').config()



const app = express();
var expressWs = require('express-ws')(app);

app.use(cors({
    origin: `${process.env.FRONTEND_URL}`,
    credentials: true
}));

const bodyParser = require('body-parser')

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json())


app.use('/', indexRouter);
app.use('/products', productsRouter);
//app.use('/session', sessionRouter);
//app.use('/games', oddsJamRouter)

// app.ws('/stream', async function (ws, req) {
//     streamRouter.LiveStream()
//     streamRouter.connectionio.on('message', (channel, message) => {
//         ws.send(JSON.stringify({ [channel]: JSON.parse(message) }))
//     });
// });


module.exports = app;
