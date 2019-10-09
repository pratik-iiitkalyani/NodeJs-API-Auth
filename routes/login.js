'use restrict';
const Router = require("express").Router();
const Bcrypt = require('bcrypt')
const Jwt = require('../app/authentication/jwt');
const UserCtrl = require('../app/database/controllers/user')
// const BcryptJs = require('../app/authentication/bcrypt')
const {loginValidation} = require('../app/authentication/validation')

Router.route('/login')
    .post(async (req, res) => {
        try {
            // Validation
            const { error } = loginValidation(req.body)
            if (error)
                return res.status(400).send(error.details[0].message)

            // checking the email is exist or not
            const user = await UserCtrl.getAllUserData({ 'email': req.body.email })
           	if (!user)
                return res.status(400).send("email doesn't exist in database")

            // password matching
            const validPass = await Bcrypt.compare(req.body.password, user[0].password)

            // Generate JWT Token
            if (validPass){
                let payload = {
                        "token": user[0]._id
                    }
                let jwtToken = await Jwt.createToken(payload)
                res.send(jwtToken)
            	// const token = Jwt.sign({_id:user[0]._id}, process.env.TOKEN_SECRET)
            	// res.header('auth-token',token).send(token)
            }
            else 
            	return res.status(400).send("Invalid Password")

        } catch (err) {
            console.log("Error in /register post", err)
            res.status(400).json({ "message": "Problem in creating user or the email/username already exists." })

        }
    })

module.exports = Router