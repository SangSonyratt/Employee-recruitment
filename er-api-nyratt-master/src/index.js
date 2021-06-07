/**
 * register all endpoints
 * @file main file for express app
 * @desc
 * this is to (1) start all required services and (2) register all routes and middleware
 * Date: Decenber 16th, 2019 <br>
 * this file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 * @author Nyratt Sang <sangsonyrath17@kit.edu.kh>
 * @copyright CPC
 * @since 1.0.0
 * @version 1.0.0
 */

const express = require('express')
const morgan = require('morgan')
const responseTime = require('response-time')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const compression = require('compression')
const generalMiddleware = require('./Middleware/general')
const controllers = require('./controllers/index')

/**
 * Express Main app
 * @module app
 * @license KRDL-1.0
 */
const app = express()

// TODO: Start all services here
// TODO: Register middleware and router

//TODO: Register response time
//response time to record the timelapse for the request processing
app.use(responseTime())
//TODO: Register helmet
//to provide security header options for ...
app.use(helmet())
// to log request and response into console
app.use(morgan('combined'))
// TODO: Register bodyparser for json and urlencoded here
//to parse json mime type ti js object res.body
app.use(bodyParser.json({limit: '10kb'}))
//to parse urlencoded string to js object req.body
app.use(bodyParser.urlencoded({extended: true}))
//TODO: Register compression
//to compress all response type with default gzip
app.use(compression())

controllers(app)

//TODO: register controller here

//i will catch non-matching route for you
app.use(generalMiddleware.notFoundCatcher)
//well don't worry about error, the following will catch them
app.use(generalMiddleware.globalErrorCatcher)

/**
 * @type {app} this app is exported so it can run by any service runner
 * like firebase cloud function or  a normal http(s) server
 */
module.exports = app
