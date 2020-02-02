import { Request, Response } from 'express';

import { returnError } from '@mc/lib/apiErrorHandling';
import { HttpError } from '@mc/lib/Error';
import AbstractController from '@mc/modules/AbstractController';
import authPassport from '@mc/lib/middleware/authPassport';

import { serialize, deserializeModelCreateUpdate } from '../serializer/user';
import { ModelCreateUpdate, PasswordChange } from '../interfaces/User';
import UserService from '../services/UserService';

class UserAdminController extends AbstractController {
  constructor() {
    super();
    this.initilizeRoutes();
  }

  private initilizeRoutes(): void {
    this.router.get('/', authPassport, this.getAllUsers);
    this.router.post('/', authPassport, this.createUser);
    this.router.put('/:userId', authPassport, this.updateUser);
    this.router.patch('/:userId/password', authPassport, this.updatePassword);
    this.router.delete('/:userId', authPassport, this.deleteUser);
  }

  /**
   * @api {get} /api/users Get All Users
   * @apiName GetAllUsers
   * @apiGroup Users
   * @apiVersion 1.0.0
   *
   * @apiHeaderExample {json} Header-Example:
   *  {
   *    "Authorization": "Bearer accessToken"
   *  }
   *
   * @apiSuccessExample {json} Success-Response:
   *  HTTP/1.1 200 OK
   *  {
   *    "users": [
   *      {
   *        "id": 1,
   *        "username": "iHeartTractors",
   *        "firstName": "Billy",
   *        "lastName": "Bob",
   *        "email": "mynew@field.com",
   *        "avatar": "https://...",
   *        "status": "active"
   *      }
   *    ]
   *  }
   */

  private async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const userService = new UserService();
      const users = await userService.getAllUsers();

      res.json({
        users: users.map(serialize)
      });
    }
    catch(error) {
      returnError(error as HttpError, req, res);
    }
  }

  /**
   * @api {post} /api/users Create a User
   * @apiName CreateUser
   * @apiGroup Users
   * @apiVersion 1.0.0
   *
   * @apiParam {string} username The user's username
   * @apiParam {string} firstName The user's first name
   * @apiParam {string} lastName The user's last name
   * @apiParam {string} password The user's password
   * @apiParam {string} email The user's email address
   * @apiParam {string} [status] The user's status
   *
   * @apiParamExample {json} Request-Example:
   *  {
   *    "username": "iHeartTractors",
   *    "firstName": "Billy",
   *    "lastName": "Bob",
   *    "email": "mynew@field.com",
   *    "avatar": "https://...",
   *    "status": "active"
   *  }
   *
   * @apiHeaderExample {json} Header-Example:
   *  {
   *    "Authorization": "Bearer accessToken"
   *  }
   *
   * @apiSuccessExample {json} Success-Response:
   *  HTTP/1.1 200 OK
   *  {
   *    "user": {
   *      "id": 1,
   *      "username": "iHeartTractors",
   *      "firstName": "Billy",
   *      "lastName": "Bob",
   *      "email": "mynew@field.com",
   *      "avatar": "https://...",
   *      "status": "active"
   *    }
   *  }
   *
   * @apiErrorExample {json} Error-Response:
   *   HTTP/1.1 406 Not Acceptable
   *  {
   *    "message": "The password does not meet the password requirements!"
   *  }
   *
   *  HTTP/1.1 409 Conflict
   *  {
   *    "message": "Could not create user because a user with this username already exists!"
   *  }
   *
   *  HTTP/1.1 400 Bad Request
   *  {
   *    "message": "Could not create user because a field was missing!"
   *  }
   */

  private async createUser(req: Request, res: Response): Promise<void> {
    try {
      const data: ModelCreateUpdate = req.body;

      const registerData = deserializeModelCreateUpdate(data);
      const userService = new UserService();
      await userService.register({
        ...registerData,
        status: 'active'
      });

      await userService.refreshUser();
      const user = userService.getUser();

      res.json({
        user: serialize(user)
      });
    }
    catch(error) {
      returnError(error as HttpError, req, res);
    }
  }

  /**
   * @api {put} /api/users/:userId Update a User
   * @apiName UpdateUser
   * @apiGroup Users
   * @apiVersion 1.0.0
   *
   * @apiParam {number} userId The user's id
   * @apiParam {string} [firstName] The user's first name
   * @apiParam {string} [lastName] The user's last name
   * @apiParam {string} [email] The user's email address
   * @apiParam {string} [status] The user's status
   * @apiParam {object[]} [organisations] An array of organisations with its id and other information about it
   * @apiParam {number} organisations.id The organisation's id
   * @apiParam {number[]} organisations.userTypes The ids of all user types the user should be assigned
   * @apiParam {number[]} [organisations.functions] The ids of all functions the user should be assigned
   * @apiParam {number[]} [organisations.privileges] The ids of all privileges the user should be assigned
   *
   * @apiParamExample {json} Request-Example:
   *  {
   *    "firstName": "Billy",
   *    "lastName": "Bob",
   *    "email": "mynew@field.com",
   *    "avatar": "https://...",
   *    "status": "active"
   *  }
   *
   * @apiHeaderExample {json} Header-Example:
   *  {
   *    "Authorization": "Bearer accessToken"
   *  }
   *
   * @apiSuccessExample {json} Success-Response:
   *  HTTP/1.1 200 OK
   *  {
   *    "user": {
   *      "id": 1,
   *      "username": "iHeartTractors",
   *      "firstName": "Billy",
   *      "lastName": "Bob",
   *      "email": "mynew@field.com",
   *      "avatar": "https://...",
   *      "status": "active"
   *    }
   *  }
   *
   * @apiErrorExample {json} Error-Response:
   *  HTTP/1.1 409 Conflict
   *  {
   *    "message": "Could not create user because a user with this username already exists!"
   *  }
   *
   *  HTTP/1.1 400 Bad Request
   *  {
   *    "message": "Changing a user's password is not allowed via this endpoint!"
   *  }
   */

  private async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const userId = parseInt(req.params.userId);
      const data: ModelCreateUpdate = req.body;
      const deserialized = deserializeModelCreateUpdate(data);

      if (deserialized.password) {
        throw new HttpError('Changing a user\'s password is not allowed via this endpoint!', 400);
      }

      const userService = new UserService();
      await userService.updateUser(userId, deserialized);

      await userService.refreshUser();
      const updatedUser = userService.getUser();

      res.json({
        user: serialize(updatedUser)
      });
    }
    catch(error) {
      returnError(error as HttpError, req, res);
    }
  }

  /**
   * @api {patch} /api/users/:userId/password Update a User's Password
   * @apiName UpdateUserPassword
   * @apiGroup Users
   * @apiVersion 1.0.0
   *
   * @apiParam {number} userId The user's id
   * @apiParam {string} newPassword The user's new password
   * @apiParam {string} currentPassword The user's current password
   *
   * @apiParamExample {json} Request-Example:
   *  {
   *    "newPassword": "newpassword",
   *    "currentPassword": "oldpassword"
   *  }
   *
   * @apiHeaderExample {json} Header-Example:
   *  {
   *    "Authorization": "Bearer accessToken"
   *  }
   *
   * @apiSuccessExample {json} Success-Response:
   *  HTTP/1.1 204 No Content
   *
   * @apiErrorExample {json} Error-Response:
   *  HTTP/1.1 500 Internal Server Error
   *  {
   *    "message": "An error occurred"
   *  }
   *
   *  HTTP/1.1 406 Not Acceptable
   *  {
   *    "message": "Could not change the user's password because the old password is incorrect!"
   *  }
   *
   *  HTTP/1.1 406 Not Acceptable
   *  {
   *    "message": "The password does not meet the password requirements!"
   *  }
   */

  private async updatePassword(req: Request, res: Response): Promise<void> {
    try {
      const userId = parseInt(req.params.userId);
      const data: PasswordChange = req.body;

      const userService = new UserService();
      await userService.updatePassword(userId, data);

      res.status(204).send('');
    }
    catch(error) {
      returnError(error as HttpError, req, res);
    }
  }

  /**
   * @api {delete} /api/users/:userId Delete a User
   * @apiName DeleteUser
   * @apiGroup Users
   * @apiVersion 1.0.0
   *
   * @apiParam {number} userId The user's id
   *
   * @apiHeaderExample {json} Header-Example:
   *  {
   *    "Authorization": "Bearer accessToken"
   *  }
   *
   * @apiSuccessExample {json} Success-Response:
   *  HTTP/1.1 204 No Content
   *
   * @apiErrorExample {json} Error-Response:
   *  HTTP/1.1 500 Internal Server Error
   *  {
   *    "message": "An error occurred"
   *  }
   */

  private async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const userId = parseInt(req.params.userId);

      const userService = new UserService();
      await userService.deleteUser(userId);

      res.status(204).send('');
    }
    catch(error) {
      returnError(error as HttpError, req, res);
    }
  }
}

export default new UserAdminController();
