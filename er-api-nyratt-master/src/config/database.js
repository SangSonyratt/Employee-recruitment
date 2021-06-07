/**
 * @file database configuration file
 * @desc
 * this is to connect mongoose to mongodb+srv
 * Date: January 8th <br>
 * @author Nyratt Sang <sangsonyrath17@kit.edu.kh>
 * @copyright CPC
 * @since 1.0.0
 * @version 1.0.0
 */

/**
 * database main app
 * @module app
 * @license KRDL-1.0
 */
const mongoose = require('mongoose')
const config = require('./index')
mongoose.set('useCreateIndex', true)
mongoose.set('useFindAndModify', false)

const { CONNECTION_STRING } = config.db
/** @module @config/database ...*/
module.exports = {
    connect: () => {
        mongoose.Promise = Promise
        return mongoose.connect(CONNECTION_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000,
            //reconnectTries: 60, //only reconnect this 60 times
            //reconnectInterval: 1000 //reconnect after ls if failure
        })
    },
    disconnect: (done) => {
        mongoose.disconnect(done)
    }
}