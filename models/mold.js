const mongoose = require('mongoose');

const MoldSchema = new mongoose.Schema({
	title: String,
	seed_song_id: String,
	acoustic: {type: Boolean, default: false},
	danceable: {type: Boolean, default: false},
	energetic: {type: Boolean, default: false},
	instrumental: {type: Boolean, default: false},
	live: {type: Boolean, default: false},
	spoken: {type: Boolean, default: false},
	upbeat: {type: Boolean, default: false},
});

module.exports = mongoose.model('Mold', MoldSchema);