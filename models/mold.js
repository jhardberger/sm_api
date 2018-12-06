const mongoose = require('mongoose');
require('mongoose-type-url');


const MoldSchema = new mongoose.Schema({
	title: String,
	seed_song_id: String,
	acoustic: Boolean,
	danceable: Boolean,
	energetic: Boolean,
	instrumental: Boolean,
	live: Boolean,
	spoken: Boolean,
	upbeat: Boolean,
});

module.exports = mongoose.model('Mold', MoldSchema);