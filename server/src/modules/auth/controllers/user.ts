import { Request, Response } from 'express';

import { returnError } from '@mc/lib/apiErrorHandling';
import { HttpError } from '@mc/lib/Error';
import AbstractController from '@mc/modules/AbstractController';
import authPassport from '@mc/lib/middleware/authPassport';

import { serialize, deserializeModelCreateUpdate } from '../serializer/user';
import { ModelCreateUpdate, PasswordChange } from '../interfaces/User';
import User from '../models/User';
import UserService from '../services/UserService';

class UserController extends AbstractController {
  constructor() {
    super();
    this.initilizeRoutes();
  }

  private initilizeRoutes(): void {
    this.router.get('/', authPassport, this.getItem);
    this.router.put('/', authPassport, this.updateItem);
    this.router.patch('/password', authPassport, this.updatePassword);
  }

  /**
   * @api {get} /api/auth/users/self Get A User's Own Information
   * @apiName GetUserOwnAccount
   * @apiGroup Auth
   * @apiVersion 1.0.0
   *
   * @apiHeaderExample {json} Header-Example:
   *  {
   *    "Authorization": "Bearer token"
   *  }
   *
   * @apiSuccessExample {json} Success-Response:
   *  HTTP/1.1 200 OK
   *  {
   *    "user": {
   *      "id": 1,
   *      "username": "billyTractor",
   *      "firstName": "Billy",
   *      "lastName": "Bob",
   *      "email": "my@field.com",
   *      "avatar": "https://..."
   *    }
   *  }
   */

  private async getItem(req: Request, res: Response): Promise<void> {
    try {
      const user = req.user as User;

      res.json({
        user: serialize(user)
      });
    }
    catch(error) {
      returnError(error as HttpError, req, res);
    }
  }

  /**
   * @api {put} /api/auth/users/self Update a User's Own Account
   * @apiName UpdateUserOwnAccount
   * @apiGroup Auth
   * @apiVersion 1.0.0
   *
   * @apiParam {string} [firstName] The user's first name
   * @apiParam {string} [lastName] The user's last name
   * @apiParam {string} [email] The user's email address
   * @apiParam {string} [status] The user's status
   *
   * @apiParamExample {json} Request-Example:
   *  {
   *    "firstName": "Billy",
   *    "lastName": "Bob",
   *    "email": "mynew@field.com",
   *    "avatar": "https://..."
   *  }
   *
   * @apiHeaderExample {json} Header-Example:
   *  {
   *    "Authorization": "Bearer token"
   *  }
   *
   * @apiSuccessExample {json} Success-Response:
   *  HTTP/1.1 200 OK
   *  {
   *    "user": {
   *      "id": 1,
   *      "username": "billyTractor",
   *      "firstName": "Billy",
   *      "lastName": "Bob",
   *      "email": "my@field.com",
   *      "avatar": "https://..."
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

  private async updateItem(req: Request, res: Response): Promise<void> {
    try {
      const user = req.user as User;
      const data: ModelCreateUpdate = req.body;
      const deserialized = deserializeModelCreateUpdate(data);

      if (deserialized.password) {
        throw new HttpError('Changing a user\'s password is not allowed via this endpoint!', 400);
      }

      const userService = new UserService();
      await userService.updateUser(user.id, deserialized);
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
   * @api {patch} /api/auth/users/self/password Update a User's Own Password
   * @apiName UpdateUserOwnPassword
   * @apiGroup Auth
   * @apiVersion 1.0.0
   *
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
   *    "Authorization": "Bearer token"
   *  }
   *
   * @apiSuccessExample {json} Success-Response:
   *  HTTP/1.1 204 No Content
   *
   * @apiErrorExample {json} Error-Response:
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
      const user = req.user as User;
      const data: PasswordChange = req.body;

      const userService = new UserService();
      await userService.updatePassword(user.id, data);

      res.status(204).send('');
    }
    catch(error) {
      returnError(error as HttpError, req, res);
    }
  }
}

export default new UserController();
