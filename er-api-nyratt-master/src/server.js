/**
 * @file server file to run express app
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

const app = require('./index')
const {PORT} = require('./config/index')
const database = require('./config/database')

//you can start server first or connect db first based on your opinion, your option and your app require
database.connect()
    .then(()=> {
        app.listen(PORT, ()=>{
            console.log(`Http server is running on port ${PORT}`)
        })
    }).catch(error => {
        console.error(error.message)
        throw error
    })
