import { Injectable } from '@nestjs/common';

@Injectable()
export class PlaceService {

  findOne(id: number) {
    return `This action returns a #${id} place`;
  }

  remove(id: number) {
    return `This action removes a #${id} place`;
  }
}
