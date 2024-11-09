import {IWeatherData} from "../types/types.ts";
import {instanceGeneral} from "../api/axios.api.ts";

export const WeatherService = {
    async getWeatherByIp() : Promise<IWeatherData> {
        const {data} = await instanceGeneral.get<IWeatherData>("/weather");
        return data;
    },
    async getWeatherByCity(city : string) : Promise<IWeatherData> {
        const {data} = await instanceGeneral.get<IWeatherData>(`/weather/city/${city}`);
        return data;
    }
}