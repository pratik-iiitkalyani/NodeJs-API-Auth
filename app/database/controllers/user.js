'use strict';

const User = require('../models/user');


function createUserData(data) {
    return new Promise(async (resolve, reject) => {
        try {
            const user = new User(data);
            let res = await user.save();
            resolve(res)

        } catch (err) {
            reject(err)
        }
    });

}

function getAllUserData(query = {}) {
    return new Promise(async (resolve, reject) => {
        try {
            const users = await User.find(query).sort({ createdAt: 1 }).lean().exec()
            resolve(users)

        } catch (err) {
            reject(err)
        }

    })
}

function getUserDataById(id) {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await User.findById(id);
            resolve(user)

        } catch (err) {
            reject(err)
        }

    })
}

function updateUserData(id, newData) {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await User.findByIdAndUpdate(id, { "$set": newData })
            resolve(result)

        } catch (err) {
            reject(err)
        }

    });
}

function deleteUserData(id) {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await User.remove({"_id" : id})
            resolve(result)

        } catch (err) {
            reject(err)
        }
    })
}


module.exports = {
    createUserData,
    getAllUserData,
    getUserDataById,
    updateUserData,
    deleteUserData
}