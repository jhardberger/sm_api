const express		= require('express');
const app 			= express();
const bodyParser	= require('body-parser');
const cors 			= require('cors');

require ('./db/db');

/**			MIDDLEWARE			**/
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const corsOptions = {
	origin: 'http://localhost:3000',
	credentials: true,
	optionsSuccessStatus: 200
}
app.use(cors(corsOptions));


/**			CONTROLLERS			**/
const userController = require('./controllers/userController');

app.use('/api/v1/user', userController);


/**			LISTENER 			**/
// app.listen(process.env.PORT || 9000, () => {
//   console.log('listening on port 9000');
// });