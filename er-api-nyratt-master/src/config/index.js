/**
 * @file main configuration file
 * @desc
 * this is to start http(s) for express.js application
 * Date: Decenber 16th, 2019 <br>
 * this file is subject to the terms and conditions defined in
 * file 'LICENSE.txt', which is part of this source code package.
 * @author Nyratt Sang <sangsonyrath17@kit.edu.kh>
 * @copyright CPC
 * @since 1.0.0
 * @version 1.0.0
 */

/**
 * Express Main app
 * @module app
 * @license KRDL-1.0
 */
module.exports = {
    /**
     * @property {Number} PORT http server port based on deployment mode (dev or else)
     */
    PORT: process.env.PORT,
    /**
     * @property {Object} db database connection object
     * @property {string} db.CONNECTION_STRING mongodb connection string
     */
    db: {
        CONNECTION_STRING: process.env.DB_CONNECTION_STRING,
    }

}