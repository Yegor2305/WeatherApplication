import {BadRequestException, Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import {UUID} from "crypto";
import {User} from "./entities/user.entity";
import {ConfigService} from "@nestjs/config";

@Injectable()
export class UserService {
  constructor(
      @InjectRepository(User) private readonly userRepository: Repository<User>,
      private configService: ConfigService,
  ) {}
  async create(createUserDto: CreateUserDto) {

    const userExist = await this.userRepository.findOne({
      where: {username: createUserDto.username },
    })
    if (userExist) throw new BadRequestException('User already exists');

    const salt = this.configService.get<string>('BCRYPT_SALT')
    const newUser = await this.userRepository.save({
      username: createUserDto.username,
      password: await bcrypt.hash(createUserDto.password, salt)
    });

    return { newUser };
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
