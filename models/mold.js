const mongoose = require('mongoose');

const MoldSchema = new mongoose.Schema({
	title: String,
	seed_song_id: String,
	acoustic: {type: Boolean, default: true},
	danceable: {type: Boolean, default: true},
	energetic: {type: Boolean, default: true},
	instrumental: {type: Boolean, default: true},
	live: {type: Boolean, default: true},
	spoken: {type: Boolean, default: true},
	upbeat: {type: Boolean, default: true},
});

module.exports = mongoose.model('Mold', MoldSchema);