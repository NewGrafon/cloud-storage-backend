import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as process from 'process';
import { UsersService } from '../../users/users.service';
import { ExceptionMessages } from '../../enums/messages.enum';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: `${process.env.SECRET_WORD}`,
    });
  }

  async validate(payload: any) {
    const user = await this.userService.findById(payload.id);

    if (!user) {
      throw new UnauthorizedException(ExceptionMessages.Unauthorized);
    }

    return {
      id: user.id,
    };
  }
}
