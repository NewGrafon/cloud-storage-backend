import {Body, Controller, Post, HttpCode, HttpStatus, Get, UseGuards, Request} from '@nestjs/common';
import { AuthService } from './auth.service';
import {ApiBody, ApiTags} from "@nestjs/swagger";
import {CreateUserDto} from "../users/dto/create-user.dto";
import {AllowAnonymous, OnlyAnonymous, Roles} from "../decorators/auth.decorators";
import {Role} from "../enums/role.enum";
import {request} from "express";
import {RolesGuard} from "./guards/roles.guard";
import {AuthGuard} from "@nestjs/passport";
import {LocalAuthGuard} from "./guards/local-auth.guard";
import {UserEntity} from "../users/entities/user.entity";

@Controller('auth')
@ApiTags('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    @ApiBody({
        type: CreateUserDto
    })
    async login(@Request() req) {
        console.log(req.user)
        return this.authService.login(req.user as UserEntity);
    }

    @OnlyAnonymous()
    @Post('register')
    @ApiBody({
        type: CreateUserDto
    })
    async register(@Body() dto: CreateUserDto) {
        return this.authService.register(dto);
    }
}