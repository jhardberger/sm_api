const mongoose = require('mongoose');
require('mongoose-type-url');


const MoldSchema = new mongoose.Schema({
	title: String

});

module.exports = mongoose.model('Mold', MoldSchema);