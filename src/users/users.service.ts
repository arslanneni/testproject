import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/users.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findAll() {
    try {
      const usersData = await this.userModel.find().select('-password').exec();
      if (usersData.length > 0) {
        return {
          status: 'SUCCESS',
          message: 'Users Found',
          data: usersData,
        };
      } else {
        return {
          status: 'FAILURE',
          message: 'No User Found',
          data: [],
        };
      }
    } catch (err) {
      return {
        status: 'FAILURE',
        message: 'EXCEPTION OCCURED',
        data: [],
      };
    }
  }
}
