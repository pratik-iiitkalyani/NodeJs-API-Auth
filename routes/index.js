'use strict'
const User = require('./user')
const Login = require('./login')
const Register = require('./register')

// middleware
module.exports = (App)=>{
	App.use(User)
	App.use(Login)
	App.use(Register)
};