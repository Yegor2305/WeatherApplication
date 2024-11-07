import {Controller, Post, Body, Delete, UsePipes, ValidationPipe, UseGuards, Request} from '@nestjs/common';
import { UserService } from './user.service';
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";
import {AddPlaceDto} from "../place/dto/add-place.dto";
import {RemovePlaceDto} from "../place/dto/remove-place.dto";

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('add-place')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  addPlace(@Request() req, @Body() place: AddPlaceDto) {
    return this.userService.addPlaceToUser(req.user.id, place);
  }

  @Delete('remove-place')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  remove(@Request() req, @Body() place: RemovePlaceDto) {
    return this.userService.removePlaceFromUser(req.user.id, place);
  }
}
