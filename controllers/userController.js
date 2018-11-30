const express	   	= require('express');
const app 		   	= express();
const router  	   	= express.Router();
const request 	   	= require('request');
const cors 		   	= require('cors');
const querystring  	= require('querystring');
const cookieParser 	= require('cookie-parser');


/**			SPOTIFY Auth 		**/
//import our dev client info for spotify
const clientID 		= require('../clientID');
const clientSecret  = require('../clientSecret');

const client_id     = clientID;
const client_secret = clientSecret; 	
const redirect_uri  = 'localhost:9000/callback'; 

const generateRandomString = function(length) {
  let text = '';
  let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

const stateKey = 'spotify_auth_state';


/**			TEST				**/
// router.get('/', async (req, res, next) => {
	
// 	try {
// 		res.send('hi there');
		
// 	} catch(err){
// 		next(err)
// 	}

// });


/** 		AUTH routes 		**/
app.use(express.static(__dirname + '/public'))
	.use(cors())
	.use(cookieParser());

app.get('/login', function(req, res) {
	let state = generateRandomString(16);
	res.cookie(stateKey, state);

	//auth request to spotify
	const scopes = 'user-read-private user-read-email';
	res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
    	//pulls from SPOTIFY auth tab above
		response_type: 'code',
		client_id: client_id,
		scopes: scopes,
		redirect_uri: redirect_uri,
		state: state
    }));
});

	//CALLBACK is based on the spotify auth guide, will probably change l8r
app.get('/callback', function (req, res) {
	//this is where we get our tokens
	const code 	= req.query.code || null;
	const state = req.query.state || null;
	const storedState = req.cookies ? req.cookies [stateKey]: null;

	if (state === null || state !== storedState){
		res.redirect('/#' + 
			querystring.stringify({
				error: 'state_mismatch'
			}));
	}else{

		res.clearCookie(stateKey);

		const authOptions = {
	      url: 'https://accounts.spotify.com/api/token',
	      form: {
	        code: code,
	        redirect_uri: redirect_uri,
	        grant_type: 'authorization_code'
	      },
	      headers: {
	        'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
	      },
	      json: true
		};

		request.post(authOptions, function(error, response, body){
			if(!error && response.statusCode === 200){
				const access_token  = body.access_token;
				const refresh_token = body.refresh_token; 

				//this is for our API requests
				const options = {
    				url: 'https://api.spotify.com/v1/me',
          			headers: { 'Authorization': 'Bearer ' + access_token },
         			json: true				
         		};

         		//
         		
			}else{
				res.redirect('/#' + 
					querystring.stringify({
						error: 'invalid_token'
					}));
			}
		});
	}
});


//ROUTES FOR MEDIA hang on to this for later
// router.get('/library', async (req, res, next) => {
	
// 	try {
// 		const topArtists = await fetch(baseEndPoint + 'me/top/artists?time_range=%20all-time&limit=20" -H "Accept: application/json" -H "Content-Type: application/json" -H "Authorization: Bearer' + );
// 		const topArtistsJson = await topArtists.json();
// 		const topArtistsMap = await topArtistsJson.map((artist, i) => {
// 			console.log(artist);
// 		});
// 		res.send(topArtistsMap);
// 	} catch(err){
// 		next(err);
// 	}
	
// });


module.exports = router;