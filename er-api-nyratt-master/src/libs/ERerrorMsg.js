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

/**
 * @module ERErrorMsg
 * @license KRDL-1.0
 */
module.exports = {

    /**
     * @property {Number} NotFoundError
     */
    'NotFoundError': 404,

    /**
     * @property {Number} UserError
     */
    'UserError': 400,

    /**
     * @property {Number} AuthError
     */
    'AuthError': 401,

    /**
     * @property {Number} MisMatchPrerequisite
     */
    'MisMatchPrerequisiteError': 403
}
