const express = require('express');
const router  = express.Router();

const Artist

const baseEndPoint = 'https://api.spotify.com/v1/'

//hang on to this for later
router.get('/library', async (req, res, next) => {
	
	try {
		const topArtists = await fetch(baseEndPoint + 'me/top/artists?time_range=%20all-time&limit=20" -H "Accept: application/json" -H "Content-Type: application/json" -H "Authorization: Bearer' + //API KEY)
		const topArtistsJson = await topArtists.json();
		const topArtistsMap = await topArtistsJson.map((artist, i) => {
			console.log(artist);
		});
		res.send(topArtistsMap);
	} catch(err){
		next(err);
	}
	
});


module.exports = router;