const express 	 	= require('express');
const request 	  	= require('request');
const querystring 	= require('querystring');
const cookieParser 	= require('cookie-parser');

const app 			= express();

/**			req/use client info			**/ 
const clientID 		= require(''); 
const clientSecret 	= require('');

const client_id 	= clientID;
const client_secret = clientSecret; 
const redirect_uri 	= 'http://localhost:8888/callback';

/**			auth tools					**/
const generateRandomString = function(length){
	let text = '';
	const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	
	for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

const stateKey = 'spotify_auth_state';

/**			auth routes					**/
app.use(express.static(__dirname + '/public'))
   .use(cookieParser());

app.get('/login', function(req, res){

	//bake some cookies
	const state = generateRandomString(16);
	res.cookie(stateKey, state);

	//scope dictates what info I can get from my account via the API - ADD MORE LATER
	const scope = 'user-read-priavate user-read-email'; 
	res.redirect('https://accounts.spotify.com/authorize?' +
	    querystring.stringify({
	      response_type: 'code',
	      client_id: client_id,
	      scope: scope,
	      redirect_uri: redirect_uri,
	      state: state
    	})
    );
});

app.get('/callback', function (req, res){
	
	const code 		  = req.query.code || null;
	const state 	  = req.query.state || null;
	const storedState = req.cookies ? req.cookies[stateKey] : null; 

	//checking state, then requesting our tokens
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

		request.post(authOptions, function(error, response, body){
			if(!error && response.statusCode === 200){
				const access_token  = body.access_token;
				const refresh_token = body.refresh_token; 

				const options = {
				    url: 'https://api.spotify.com/v1/me',
		            headers: { 'Authorization': 'Bearer ' + access_token },
		            json: true
			   	};

			   	//use the access token to make an API request
		   	  	request.get(options, function(error, response, body) {
		          	console.log(body);
		        });

		        // we can also pass the token to the browser to make requests from there
		        res.redirect('http://localhost:3000/#' +
		          	querystring.stringify({
			            access_token: access_token,
			            refresh_token: refresh_token
		          	})
		        );
			} else {
		        res.redirect('/#' +
		          querystring.stringify({
		            error: 'invalid_token'
		        }));
			}
		});
	};
});

//here we can request a refresh token - need it if we want to keep the app up longer than 1hr
app.get('/refresh_token', function(req, res) {

  const refresh_token = req.query.refresh_token;
  const authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refresh_token
    },
    json: true
  };

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      const access_token = body.access_token;
      res.send({
        'access_token': access_token
      });
    }
  });
});

console.log('Listening on 8888');
app.listen(8888);



