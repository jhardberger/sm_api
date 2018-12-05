const mongoose = require('mongoose');
require('mongoose-type-url');


const MoldSchema = new mongoose.Schema({
	title: String,
	seed_song_id: String,
	acousticness: Number,
	danceability: Number,
	energy: Number,
	instrumentalness: Number,
	liveness: Number,
	loudness: Number,
	speechiness: Number,
	tempo: Number,
	valence: Number,
});

module.exports = mongoose.model('Mold', MoldSchema);