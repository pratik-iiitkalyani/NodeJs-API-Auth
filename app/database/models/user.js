const Mongoose = require('mongoose')

const userSchema = new Mongoose.Schema({
	name: {
		type : String,
		required: true,
		min: 6,
		max: 255
	},
	email: {
		type: String,
		required: true,
		min: 6,
		max: 255
	},
	password: {
		type: String,
		required: true,
		min: 6,
		max: 233
	}

})

const user = Mongoose.model('user', userSchema)
module.exports = user