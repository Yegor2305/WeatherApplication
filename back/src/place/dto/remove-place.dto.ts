import {IsNotEmpty} from "class-validator";

export class RemovePlaceDto {
    @IsNotEmpty()
    name: string;
}