const express		= require('express');
const app 			= express();
const bodyParser	= require('body-parser');
const cors 			= require('cors');
const session		= require('express-session');

require ('./db/db');

/**			SESSION 			**/
app.use(session({
	secret: 'funkytown',
	resave: false,
	saveUninitialized: false
}));


/**			MIDDLEWARE			**/
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const corsOptions = {
	origin: 'http://localhost:3000',
	credentials: true,
	optionsSuccessStatus: 200
}
app.use(cors(corsOptions));

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', true);

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});


/**			CONTROLLERS			**/
const loginController = require('./controllers/loginController');
const moldController  = require('./controllers/moldController');

app.use('/login', loginController);
app.use('/api/v1/molds', moldController);


/**			LISTENER 			**/
app.listen(process.env.PORT || 9000, () => {
  console.log('listening on port 9000');
});