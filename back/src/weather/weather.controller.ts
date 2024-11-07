import {Controller, Get, Param} from '@nestjs/common';
import {WeatherService} from "./weather.service";

@Controller('weather')
export class WeatherController {
    constructor(private readonly weatherService: WeatherService) {}

    @Get()
    async getWeather() {
        return await this.weatherService.getWeatherByIp();
    }

    @Get('city/:city')
    async getWeatherByCity(@Param('city') city : string) {
        return await this.weatherService.getWeatherByCity(city);
    }
}
