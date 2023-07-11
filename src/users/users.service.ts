import {ForbiddenException, Injectable} from '@nestjs/common';
import {CreateUserDto} from './dto/create-user.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {UserEntity} from "./entities/user.entity";
import {Role} from "../enums/role.enum";

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(UserEntity)
        private repository: Repository<UserEntity>
    ) {

    }

    async findByEmail(email: string) {
        return this.repository.findOneBy({
            email
        });
    }

    async findByLogin(login: string) {
        return this.repository.findOneBy({
            login
        });
    }

    async findById(id: number) {
        return this.repository.findOneBy({
            id
        });
    }

    async create(dto: CreateUserDto) {
      const [emailExist, loginExist] = await Promise.all([this.findByEmail(dto.email), this.findByLogin(dto.login)]);
      if (emailExist || loginExist) {
        throw new ForbiddenException("Пользователь с данным email и/или логином уже существует!");
      }

      if (dto.role) {
        dto.role = Role.User;
      }
      return this.repository.save(dto);
    }
}
