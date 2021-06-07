/**
 * @file all route and main point of controller
 * @desc
 *   Account model to provide user data management
 *   Date: January 6th 2020 <br>
 *   this file is subject to the terms and conditions defined in
 *   file 'LICENSE.txt', which is part of this source code package.
 * @author Nyratt Sang <sangsonyrath17@kit.edu.kh>
 * @copyright CPC
 * @since 1.0.0
 * @version 1.0.0
 */

const mongoose = require('mongoose')
const bcrypt = require('bcrypt-nodejs')

//create schema
const accountSchema = new mongoose.Schema({
    //id is default
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate: {
            validator: (v) => {
                //return true/false
                return /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i.test(v)
            }
        }
    },
    name: {
        type: String,
        required: true,
        lowercase: true,
        validate: {
            validator: (v)=> {
                return /^(?:(\w+-?\w+)) (?:(\w+))(?: (\w+))?$/i.test(v)
            }
        }
    },
    password: {
        type: String,
        required: true,
        select: false, //this not return the password, used this you no need to return password when select that user, no one show that one
        validate: {
            validator: (v)=> {
                return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/i.test(v)
            }
        }
    },
    dob: {
        type: String,
        required: true
    },
    role: {
        type: Array,
        default: ['JOB_HAUNTER']  //JOB_HAUNTER = user, HR MANAGER = admin, RECEPTIONIST
    },
    address: {
        type: String,
        required: true
    }
})

//export model
//save middle to pre-save and save the password by performing te hash before store in db
accountSchema.pre('save', function(next){
    const user = this
    //check if user update but not update password field
    if (!user.isModified('password')) //check if not update password, next no need the do the encrypt or operation more cuz it already encrypt
        return next()
    //check if password
    if (user.password) {
        //encrypt here
        bcrypt.genSalt(10, function (err, salt) {
            //random data for perform hash
            if (err)
                return next(err)
            bcrypt.hash(user.password, salt, null, function (err, hash) {
                if (err)
                    return next(err)
                user.password = hash
                next()
            })
        })
    }
})
//make pre updatedOne to hash the password when update
accountSchema.pre('updateOne', function (next) {
    const data = this
    if(!data.getUpdate().$set.password)
    {
        return next()
    }
    bcrypt.genSalt(10, function (err, salt) {
        //random data for perform hash
        if (err)
            return next(err)
        bcrypt.hash(data.getUpdate().$set.password, salt, null, function (err, hash) {
            if (err)
                return next(err)
            data.getUpdate().$set.password = hash
            next()
        })
    })
})

//export model
const Account = mongoose.model('Account', accountSchema)
exports.Account = Account

/**
 * @func
 * @desc to create account with the provided object
 * @param accountData
 * @returns {Promise<Object, Error>}
 */
exports.createAccount = (accountData) => {
    return new Promise((resolve, reject) => {
        const account = new Account(accountData)
        account.save((err, data) => {
            if (err)
                return reject(err)
            return resolve(data)
        })
    })
}
exports.getAll = () => {
    return new Promise(((resolve, reject) => {
        const query = {} //select * = no filter
        Account.find(query, (err, data)=> {
            if(err)
                return reject(err)
            if(data && data.length > 0)
                return resolve(data)
            else {
                //throw 404 not found
                const error = new Error('NotFoundError::Account Not Found Error')
                return reject(error)
            }
        })
    }))
}

exports.getById = (id) => {
    return new Promise((resolve, reject)=>{
        const query = { _id:id }
        Account.findOne(query, (err, data)=>{
            if (err)
                return reject(err)
            if(data)
                return resolve(data)
            else{
                //throw 404 not found
                const error = new Error('NotFoundError::Account Not Found Error')
                return reject(error)
            }
        })
    })
}

exports.deleteById = (id) => {
    return new Promise((resolve, reject)=>{
        const query = { _id:id }
        Account.remove(query, (err, data)=>{
            if (err)
                return reject(err)
            if(data)
                return resolve(data)
        })
    })
}

exports.editById = (id, data) => {
    return new Promise((resolve, reject)=> {
        if (!data)
        {
            const error = new Error('UserError::Requires data')
            return reject(error)
        }
        const newSet = {}
        if(data.password)
        {
            newSet['password'] = data.password
        }
        if(data.address)
        {
            newSet['address'] = data.address
        }
        if(data.role)
        {
            newSet['role'] = data.role
        }
        if(!newSet)
        {
            const error = new Error('UserError::Requires data')
            return reject(error)
        }
        const query = { _id:id }
        const updates = {
            $set: newSet
        }
        const options = {
            upsert: false,  //update or insert
            new: true //give data that already update
        }
        Account.updateOne(query, updates, options, (err, updatedData)=> {
            if(err)
                return reject(err)
            return resolve(updatedData)
        })
    })
}