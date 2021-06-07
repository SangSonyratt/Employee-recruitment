/**
 * @file general middleware provider
 * @desc
 *   this is to provide all general, common middleware for express
 *   Date: December 17th, 2019 <br>
 *   this file is subject to the terms and conditions defined in
 *   file 'LICENSE.txt', which is part of this source code package.
 * @author Nyratt Sang <sangsonyrath17@kit.edu.kh>
 * @copyright CPC
 * @since 1.0.0
 * @version 1.0.0
 */

/**
 * @func
 * @desc this is middleware function to handle 404 not found
 * @param req
 * @param res
 * @param next
 */
function notFoundCatcher(req, res, next) {
    const err = new Error('Opp! not found error')
    err.status = 404
    next(err)
}

/**
 * @func
 * @desc this middleware will capture all error as a global and response appropriately
 * @param err
 * @param req
 * @param res
 * @param next
 */

function globalErrorCatcher(err, req, res, next) {
    res.status(err.status || 500)
    res.json({
        success: false,
        message: err.message,
        error: {}
    })
}

/**
 * General Middleware
 * @module GeneralMiddleware
 * @license KRDL-1.0
 */

module.exports= {
    notFoundCatcher, globalErrorCatcher
}
