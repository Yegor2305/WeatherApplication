import {BadRequestException, ConflictException, Injectable, NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {User} from "./entities/user.entity";
import {Place} from "../place/entities/place.entity";
import {AddPlaceDto} from "../place/dto/add-place.dto";
import {RemovePlaceDto} from "../place/dto/remove-place.dto";

@Injectable()
export class UserService {
  constructor(
      @InjectRepository(User) private readonly userRepository: Repository<User>,
      @InjectRepository(Place) private readonly placeRepository: Repository<Place>,
  ) {}

  async addPlaceToUser(userId: number, placeDto: AddPlaceDto) {
    const user = await this.userRepository.findOne({ where: { id: userId }, relations: ['places'] });
    let place = await this.placeRepository.findOne({ where: { name: placeDto.name } });

    if (user && !place){
      place = this.placeRepository.create({ name: placeDto.name });
      await this.placeRepository.save(place);
    }

    if (user && place) {

      if (user.places.length >= 5){
        throw new ConflictException("You have 5 places added. Delete place to add new");
      }

      if (user.places.findIndex(ePlace => ePlace.id === place.id) != -1){
        throw new ConflictException("Place already added to user");
      }

      user.places.push(place);
      await this.userRepository.save(user);

      return 'Success'
    }

    throw new BadRequestException('Adding place go wrong');
  }

  async removePlaceFromUser(userId: number, placeDto: RemovePlaceDto) {
    const user = await this.userRepository.findOne({ where: { id: userId }, relations: ['places'] });

    if (user){

      const placeIndex = user.places.findIndex(ePlace => ePlace.id === placeDto.id)

      if (placeIndex === -1){
        throw new NotFoundException('The user does not have such a place');
      }

      user.places.splice(placeIndex, 1);

      await this.userRepository.save(user);
    }
    else {
      throw new NotFoundException('User not found');
    }
    return 'Success'
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: {username} });
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
