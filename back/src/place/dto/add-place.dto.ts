import {IsNotEmpty} from "class-validator";

export class AddPlaceDto {
    @IsNotEmpty()
    name: string;
}