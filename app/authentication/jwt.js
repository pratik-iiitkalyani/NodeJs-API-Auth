'use strict'
const Jwt = require('jsonwebtoken');
const Config = require('config');
// const { tokenExpiry } = Config.get('jwt');

//creates a jwt token 
async function createToken(payload) {
    return new Promise((resolve, reject) => {
        try{
        	const token = Jwt.sign(payload, process.env.TOKEN_SECRET)
            // expiresIn: tokenExpiry})
            resolve(token)
        } catch(err){
        	reject(err)
        }
    })
}

// verify if jwt token is valid or not
async function verifyToken(token, expiration=false) {
	return new Promise((resolve, reject) => {
    	if (!token) {
        	return res.status(400).send('Access Denied')    
    	}
    	try {
    		const verifyToken = Jwt.verify(token, process.env.TOKEN_SECRET)
    		resolve(verifyToken)
    	} catch(err){
    		reject(err)
    	}
       
        // jwt.verify(token, jwtSecret, {ignoreExpiration: expiration}, (error, decodedToken) => {
        //     if (error) {               
        //         reject(error);
        //     } else {
        //         resolve(decodedToken);
        //     }
        // });

    })
}

module.exports = {
	createToken,
	verifyToken
}