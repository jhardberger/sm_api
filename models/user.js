const mongoose = require('mongoose');
require('mongoose-type-url');


const UserSchema = new mongoose.Schema({
	username: String,
	password: String,
	id: String,
	image: {type: mongoose.SchemaTypes.Url},
	link: {type: mongoose.SchemaTypes.Url},
	molds: []

});

module.exports = mongoose.model('User', UserSchema);