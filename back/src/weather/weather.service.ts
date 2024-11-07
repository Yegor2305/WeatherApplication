import {Injectable, NotFoundException} from '@nestjs/common';
import {HttpService} from "@nestjs/axios";
import {ConfigService} from "@nestjs/config";
import {firstValueFrom} from "rxjs";

@Injectable()
export class WeatherService {
    private readonly weatherApiUrl: string;
    private readonly weatherApiKey: string;
    private readonly ipfyUrl: string;
    private readonly ipApiUrl: string;

    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService,
    ){
        this.weatherApiUrl = 'https://api.openweathermap.org/data/2.5/weather';
        this.weatherApiKey = this.configService.get<string>('OPEN_WEATHER_API_KEY');
        this.ipfyUrl = 'https://api.ipify.org?format=json';
        this.ipApiUrl = 'http://ip-api.com/json';

    }

    async getWeatherByIp(): Promise<any> {
        const ip = await firstValueFrom(this.httpService.get(this.ipfyUrl));
        const location = await firstValueFrom(this.httpService.get(`${this.ipApiUrl}/${ip.data.ip}`));

        const weatherResponse = await firstValueFrom(this.httpService.get(this.weatherApiUrl, {
            params: {
                q: location.data.city,
                appid: this.weatherApiKey,
                units: 'metric',
            }
        }));

        return weatherResponse.data;
    }

    async getWeatherByCity(city: string): Promise<any> {
        try{
            const weatherResponse = await firstValueFrom(this.httpService.get(this.weatherApiUrl, {
                params: {
                    q: city,
                    appid: this.weatherApiKey,
                    units: 'metric',
                }
            }));

            return weatherResponse.data;
        }
        catch (error){
            throw new NotFoundException(`${error.response.data.message}`);
        }
    }
}
