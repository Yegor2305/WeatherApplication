import {IsInt, Min} from "class-validator";

export class RemovePlaceDto {
    @IsInt()
    @Min(1)
    id: number;
}