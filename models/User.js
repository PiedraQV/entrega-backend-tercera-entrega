const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
	username: { type: String, required: true },
	password: { type: String, required: true },
	nombre: { type: String, required: true },
	age: { type: String, required: true },
	direccion: { type: String, required: true },
	telefono: { type: String, required: true },
	image: { type: String, required: true },
});

module.exports = mongoose.model('users', userSchema);