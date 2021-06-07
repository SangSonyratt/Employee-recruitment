/**
 * @file Response module
 * @desc
 *   this is to provide a non-format one error handle for all response
 *   Date: December 19th, 2019 <br>
 *   this file is subject to the terms and conditions defined in
 *   file 'LICENSE.txt', which is part of this source code package.
 * @author Nyratt Sang <sangsonyrath17@kit.edu.kh>
 * @copyright CPC
 * @since 1.0.0
 * @version 1.0.0
 */

const mongoose = require('mongoose')
const ERErrorMsg = require('./ERerrorMsg')

/**
 * Response Module
 * @module Response
 * @license KRDL-1.0
 */
const self = module.exports = {
    /**
     * @func
     * @desc HTTP 200 - OK Response
     * @param {object} res response object of express
     * @param {string|null} [msg]
     * @param {object|null} [data]
     */
    okay: (res, msg, data) => {
        const body = {
            success: true,
            msg: msg || 'Request is completed successfully',
            data: data
        }
        return res.status(200).json(body)
    },

    /**
     * @function
     * @desc HTTP 201 - OK Created
     * @param {object} res response object of express
     * @param {string|null} [msg]
     * @param {*} data
     */
    'created': (res, msg, data) => {
        const object = {
            success: true,
            message: msg || 'The resource is created',
        }
        if(data) object.data = data
        res.status(201).json(object)
    },

    /**
     * @function
     * @desc HTTP 202 - OK Accepted for Processing
     * @param {object} res response object of express
     * @param {string|null} [msg]
     * @param {*} data
     */
    'accepted_for_processing': (res, msg, data) => {
        const object = {
            success: true,
            message: msg || 'Request Accepted for Processing'
        }
        if(data) object.data = data
        res.status(202).json(object)
    },

    /**
     * @function
     * @desc HTTP 204 - OK No Content
     * @param {object} res response object of express
     */
    'no_content': (res) =>{
        res.status(204).end()
    },

    /**
     * @function
     * @desc HTTP 400 - Bad Request
     * @param {object} res response object of express
     * @param {string|null} [msg]
     */
    'bad_request': (res, msg) =>{
        res.status(400).json({
            success: false,
            message: msg || 'Missing Required Param (or) Invalid Required Param'
        })
    },

    /**
     * @function
     * @desc HTTP 401 - Request is not Authenticated
     * @param {object} res response object of express
     * @param {string|null} [msg]
     * @param {number} [code] kerr code
     */
    'not_authenticate': (res, msg, code) => {
        const res_obj = {
            success: false,
            message: msg || 'Request not Authenticated with either the Basic Auth or OAuth Method'
        }
        if(code)
            res_obj.kcode = code
        res.status(401).json(res_obj)
    },

    /**
     * @function
     * @desc HTTP 401 - Basic Auth Failure
     * @param {object} res response object of express
     * @param realm
     * @param charset
     */
    'basic_auth_failure': (res, realm = 'rss', charset = 'UTF-8') => {
        res.append('WWW-Authenticate', `Basic realm="${realm}" charset="${charset}"`)
        res.status(401).json({
            success: false,
            message: 'Basic Authentication Header Required'
        })
    },

    /**
     * @function
     * @desc HTTP 403 - Request has insufficient right
     * @param {object} res response object of express
     * @param {string|null} [msg]
     */
    'insufficient_right': (res, msg) => {
        res.status(403).json({
            success: false,
            message: msg || 'Strictly Forbidden. Invalid Scope Right. (or) It is misused with a different client app'
        })
    },

    /**
     * @function
     * @desc HTTP 404 - Resource Not Found
     * @param {object} res response object of express
     * @param {string|null} [msg]
     */
    'not_found': (res, msg) => {
        res.status(404).json({
            success: false,
            message: msg || 'Cannot Map Request URI to any Resource'
        })
    },

    /**
     * @function
     * @desc HTTP 405 - Method Not Allow
     * @param {object} res response object of express
     * @param {string|null} [msg]
     */
    'method_not_allow': (res, msg) => {
        res.status(405).json({
            success: false,
            message: msg || 'Http(s) Method Not Allowed'
        })
    },

    /**
     * @function
     * @desc HTTP 406 - Request is not Acceptable
     *  Alternative Resource is given
     * @param {object} res response object of express
     * @param {string|null} [msg]
     * @param Alternatives
     */
    'not_acceptable': (res, msg, Alternatives) => {
        res.status(406).json({
            success: false,
            message: msg || 'Request not Acceptable',
            alternative: Alternatives || 'No Alternative Resource'
        })
    },

    /**
     * @function
     * @desc HTTP 409 - Conflict Resource
     * @param {object} res response object of express
     * @param {string|null} [msg]
     */
    'conflict_resource': (res, msg) => {
        res.status(409).json({
            success: false,
            message: msg || 'Cannot be Updated or Created Due to Resource Conflict'
        })
    },

    /**
     * @function
     * @desc HTTP 415 - Unsupported Content Type
     * @param {object} res response object of express
     * @param {string|null} [msg]
     */
    'unsupported_content_type': (res, msg) =>{
        res.status(415).json({
            success: false,
            message: msg || 'Unsupported Content-Type Header'
        })
    },

    /**
     * @function
     * @desc HTTP 429 - Too Many Request
     * @param {object} res response object of express
     * @param {string|null} [msg]
     */
    'too_many_request': (res, msg) =>{
        res.status(429).json({
            success: false,
            message: msg || 'Too many request from this origin'
        })
    },

    /**
     * @function
     * @desc HTTP 500 - Internal Server Error
     * @param {object} res response object of express
     * @param error
     */
    'any_error': (res, error) => {
        res.status(500).json({
            success: false,
            message: error.message || 'Encounter an Error at the Server Side'
        })
    },

    /**
     * @function
     * @desc HTTP 500 - Internal Server Error
     * @param {object} res response object of express
     * @param error
     */
    'error': (res, error) => {
        if(error instanceof mongoose.Error.ValidationError || error instanceof mongoose.Error.ValidatorError){
            return self.bad_request(res, error.message)
        } else if(error.code && error.code.toString() === '11000'){
            return self.conflict_resource(res, error.message)
        } else if(error.name === 'CastError'){
            return self.bad_request(res, error.message)
        } else {
            if(!error.message){
                return self.any_error(res, error)
            }
            const errorIdentifier = error.message.split('::')
            const code = ERErrorMsg[errorIdentifier[0]]
            if(!code){
                return self.any_error(res, error)
            }
            switch (code){
            case 400:
                self.bad_request(res, error.message)
                break
            case 401:
                self.not_authenticate(res, error.message)
                break
            case 403:
                self.insufficient_right(res, error.message)
                break
            case 404:
                self.not_found(res, error.message)
                break
            default:
                self.any_error(res, error)
            }
        }
    },
}
