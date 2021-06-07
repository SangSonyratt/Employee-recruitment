/**
 * @file all route and main point of controller
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

const UserController = require('./users')
const response = require('../libs/response')
/**
 * @module MainRouter
 * @license KRDL-1.0
 * @param app express js application
 */
module.exports = (app) => {
    //users group
    app.route('/users')
        .post(UserController.createUser)
        .get(UserController.getAllUser)
        //TODO: .post(UserController.createUser)
        //TODO: .delete(UserController.deleteUser)
        //TODO: .updateUser
        .all((req, res, next) => {
            response.method_not_allow((res))
        })
    app.route('/users/:id')
        .get(UserController.getOneUserById)
        .delete(UserController.deleteUserById)
        .patch(UserController.editUserById)
        //TODO: .getOne
        //TODO: .delete(UserController.deleteUser)
        //TODO: .updateUser
        .all((req, res, next) => {
            response.method_not_allow((res))
        })
}
