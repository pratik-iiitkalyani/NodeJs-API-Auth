'use strict'
const User = require('./user')
const Login = require('./login')
const Register = require('./register')
const Auth = require("../app/authentication/auth")

// middleware
module.exports = (App)=>{
	App.use(Register)
	App.use(Login)
	App.use(Auth)
	App.use(User)
};