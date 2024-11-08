import {BadRequestException, Injectable} from '@nestjs/common';
import {UserService} from "../user/user.service";
import * as bcrypt from 'bcrypt';
import {JwtService} from "@nestjs/jwt";
import {IUser} from "./types/types";
import {CreateUserDto} from "../user/dto/create-user.dto";
import {ConfigService} from "@nestjs/config";
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "../user/entities/user.entity";
import {Repository} from "typeorm";

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) {}

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.userService.findOne(username);
        if (user) {
            if (await bcrypt.compare(password, user.password)) {
                return user;
            }
        }
        return null;
    }

    async login(user: IUser) {
        const { id, username } = user;
        return {
            id,
            username,
            access_token: this.jwtService.sign({ id: user.id, username: user.username }),
        };
    }

    async register(userDto : CreateUserDto){
        const userExist = await this.userRepository.findOne({
            where: {username: userDto.username },
        })
        if (userExist) throw new BadRequestException('User already exists');

        const salt = this.configService.get<string>('BCRYPT_SALT')
        const newUser = await this.userRepository.save({
            username: userDto.username,
            password: await bcrypt.hash(userDto.password, salt)
        });
        return {
            id: newUser.id,
            username: newUser.username,
            access_token: this.jwtService.sign({ id: newUser.id, username: newUser.username }) };
    }
}