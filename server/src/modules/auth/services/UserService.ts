import bcrypt from 'bcryptjs';
import config from 'config';
import jwt from 'jsonwebtoken';
import uuidv1 from 'uuid/v1';

import { HttpError } from '@mc/lib/Error';

import { serialize } from '../serializer/user';
import { ModelCreateUpdate, PasswordChange } from '../interfaces/User';
import { User } from '../models/User';
import UserSession from '../models/UserSession';

export default class UserService {
  private readonly saltRounds = 15;
  private readonly jwtSecret = process.env.JWT_ACCESS_TOKEN_SECRET;
  private user: User;

  getUser(): User {
    return this.user;
  }

  async setUser(identifier: number | string): Promise<User> {
    if (typeof identifier === 'number') {
      await this.getUserById(identifier);
    }
    else {
      await this.getUserByUsername(identifier);
    }

    return this.user;
  }

  generatePassword(): string {
    return uuidv1();
  }

  async register(registerData: ModelCreateUpdate): Promise<User> {
    try {
      const {
        username,
        firstName,
        lastName,
        email,
        avatar
      } = registerData;

      const password = registerData.password || this.generatePassword();
      const status = registerData.status || 'pending';

      const existingUser: User = await User.findOne({ where: { username } });

      if (existingUser) {
        throw new HttpError('Could not create user because a user with this username already exists!', 409);
      }

      if (!username || !firstName || !lastName || !email) {
        throw new HttpError('Could not create user because a field was missing!', 400);
      }

      const newAvatar = avatar || config.get<string>('users.defaultAvatar');

      const hash: string = await bcrypt.hash(password, this.saltRounds);
      const userModel: User = await User.create({
        ...registerData,
        avatar: newAvatar,
        password: hash,
        lastLogin: new Date(),
        status
      });

      await this.getUserById(userModel.id);

      await this.refreshUser();
      return this.user;
    }
    catch(error) {
      throw error;
    }
  }

  async generateJwt(id?: number): Promise<string> {
    if (!this.jwtSecret) {
      throw new HttpError('There was a problem generating a JWT for the user!', 500);
    }

    if (id) {
      await this.getUserById(id);
    }

    const ttl = config.get<number>('jwt.accessToken.ttl');
    const serializedUser = serialize(this.user);

    return jwt.sign({
      ...serializedUser
    },
    this.jwtSecret,
    {
      expiresIn: `${ttl}s`
    });
  }

  async jwtLogin(id: number): Promise<boolean> {
    await this.getUserById(id);
    return !!this.user;
  }

  async updateUser(id: number, updatedUser: ModelCreateUpdate): Promise<void> {
    try {
      if (updatedUser.username) {
        const existingUser: User = await User.findOne({ where: { username: updatedUser.username } });

        if (existingUser && existingUser.id !== id) {
          throw new HttpError('Could not create user because a user with this username already exists!', 409);
        }
      }

      await this.getUserById(id);
      await this.user.update(updatedUser);
    }
    catch(error) {
      throw error;
    }
  }

  async updatePassword(id: number, data: PasswordChange): Promise<void> {
    try {
      await this.getUserById(id);
      const isValid: boolean = await this.validatePassword(data.currentPassword);

      if (!isValid) {
        throw new HttpError('Could not change the user\'s password because the old password is incorrect!', 406);
      }

      if (!this.isPasswordVaild(data.newPassword)) {
        throw new HttpError('The password does not meet the password requirements!', 406);
      }

      this.user.password = await bcrypt.hash(data.newPassword, this.saltRounds);
      await this.user.save();
    }
    catch(error) {
      throw error;
    }
  }

  async updatePasswordWithoutOldPassword(id: number, data: PasswordChange): Promise<void> {
    try {
      if (!this.isPasswordVaild(data.newPassword)) {
        throw new HttpError('The password does not meet the password requirements!', 406);
      }

      await this.getUserById(id);

      this.user.password = await bcrypt.hash(data.newPassword, this.saltRounds);
      await this.user.save();
    }
    catch(error) {
      throw error;
    }
  }

  isPasswordVaild(password: string): boolean {
    // At least 8 characters, one lowercase and one uppercase letter, one number and one symbol
    const strongRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})');
    return strongRegex.test(password);
  }

  async checkCanUpdatePasswordWithoutOldPassword(id: number): Promise<boolean> {
    try {
      await this.getUserById(id);
      return this.user.status === 'pending';
    }
    catch(error) {
      throw error;
    }
  }

  private async validatePassword(password: string): Promise<boolean> {
    try {
      if (!this.user) {
        return false;
      }

      const isValid: boolean = await bcrypt.compare(password, this.user.password);
      return isValid;
    }
    catch(error) {
      throw error;
    }
  }

  async deleteUser(userId: number): Promise<void> {
    try {
      await UserSession.destroy({ where: { fkUser: userId } });
      await User.destroy({ where: { id: userId } });
    }
    catch(error) {
      throw error;
    }
  }

  private async getUserByUsername(username: string): Promise<void> {
    if (this.user) {
      await this.refreshUser();
    }
    else {
      this.user = await User.findOne({ where: { username } });
    }
  }

  private async getUserById(id: number): Promise<void> {
    if (this.user) {
      await this.refreshUser();
    }
    else {
      this.user = await User.findByPk(id);
    }
  }

  async getAllUsers(): Promise<User[]> {
    const users = await User.findAll();
    return users;
  }

  async refreshUser(): Promise<void> {
    if (!this.user) {
      throw new HttpError('Cannot refresh an undefined user!', 500);
    }

    this.user = await User.findByPk(this.user.id);
  }
}
