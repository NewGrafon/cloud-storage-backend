import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '../users/entities/user.entity';
import { request } from 'express';
import { ExceptionMessages, ResultMessages } from '../enums/messages.enum';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);

    if (user?.password === password) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async login(user: UserEntity): Promise<any> {
    return {
      token: this.jwtService.sign({ id: user.id }),
    };
  }

  async register(dto: CreateUserDto) {
    try {
      const user = await this.usersService.create(dto);

      return {
        token: this.jwtService.sign({ id: user.id }),
      };
    } catch (e) {
      console.log(e);
      throw new ForbiddenException(ExceptionMessages.SomethingWrong);
    }
  }
}
