/**
 * @file User Controller Group
 * @desc
 *   this is to provide all user related controller group
 *   Date: December 17th, 2019 <br>
 *   this file is subject to the terms and conditions defined in
 *   file 'LICENSE.txt', which is part of this source code package.
 * @author Nyratt Sang <sangsonyrath17@kit.edu.kh>
 * @copyright CPC
 * @since 1.0.0
 * @version 1.0.0
 */
const response = require('../libs/response')
const Account = require('../models/accounts')

function createUser(req, res) {
    //first validation
    const body = req.body
    Account.createAccount(body)
        .then(data => {
            return response.created(res, 'Create account successfully', data)
        }).catch(error => {
            return response.error(res, error)
    })
}

/**
 * @module MainRouter
 * @license KRDL-1.0
 * @param app express js application
 */

function getAllUser(req, res) {
    // //TODO: check filter option
    // //TODO: query from db
    // //TODO: response appropriately
    // //TODO: response.okay(res, data, msg)
    // const data = [{id: 1, name:'me'}]
    // return response.okay(res, null, data)
    //query all user
    //return result
    Account.getAll()
        .then(data => response.okay(res, null, data))
        .catch(error => response.error(res, error))
}

function getOneUserById(req, res) {
    const id = req.params.id //id from path param
    Account.getById(id)
        .then(data => response.okay(res, null, data))
        .catch(error => response.error(res, error))
}

function deleteUserById(req, res) {
    const id = req.params.id
    Account.deleteById(id)
        .then(data => response.no_content(res))
        .catch(error => response.error((res, error)))
}

function editUserById(req, res) {
    const id = req.params.id
    const body = req.body
    Account.editById(id, body)
        .then(data => response.okay(res, null, data))
        .catch(error => response.error((res, error)))
}

/**
 * @module UserController
 * @license KRDL-1.0
 */

module.exports = {
    getAllUser, createUser, getOneUserById, deleteUserById, editUserById
}