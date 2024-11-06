import {BadRequestException, Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
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

  async findOne(username: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: {username} });
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
