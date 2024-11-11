import {Controller, Post, Body, Delete, UsePipes, ValidationPipe, UseGuards, Request, Get, Param} from '@nestjs/common';
import { UserService } from './user.service';
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";
import {AddPlaceDto} from "../place/dto/add-place.dto";

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('places')
  @UseGuards(JwtAuthGuard)
  getPlaces(@Request() req) {
    return this.userService.getUserPlaces(req.user.id);
  }

  @Post('add-place')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  addPlace(@Request() req, @Body() place: AddPlaceDto) {
    return this.userService.addPlaceToUser(req.user.id, place);
  }

  @Delete('remove-place/:place_name')
  @UseGuards(JwtAuthGuard)
  remove(@Request() req, @Param('place_name') placeName: string) {
    return this.userService.removePlaceFromUser(req.user.id, placeName);
  }
}
