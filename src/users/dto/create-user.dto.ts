import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../../enums/role.enum';
import { DefaultValuePipe } from '@nestjs/common';

export class CreateUserDto {
  @ApiProperty({ default: 'mail@mail.ru' })
  email: string;

  @ApiProperty({ default: 'mister_xXx_pipister' })
  login: string;

  @ApiProperty({ default: 'aboltus228' })
  password: string;

  role: Role = Role.User;
}
