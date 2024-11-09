import {FC, useEffect, useState} from "react";
import {
    getWeatherFromLocalStorage, setWeatherToLocalStorage,
} from "../services/localStorageManager.ts";
import {WeatherService} from "../services/weather.service.ts";
import {IWeatherDisplayProps} from "../types/types.ts";

const WeatherDisplay : FC<IWeatherDisplayProps> = ({city, localStorageUpdated, onLocalStorageUpdated}) => {
    const [weatherData, setWeatherData] = useState(getWeatherFromLocalStorage())

    useEffect(() => {
        const getWeather = async () => {
            if (weatherData){
                if (weatherData.city.name != city){
                    const data = await WeatherService.getWeatherByCity(city);
                    setWeatherData(data);
                    setWeatherToLocalStorage(data);
                    onLocalStorageUpdated(!localStorageUpdated);
                }
            }
            else{
                const data = await WeatherService.getWeatherByCity(city);
                setWeatherData(data);
                setWeatherToLocalStorage(data);
                onLocalStorageUpdated(!localStorageUpdated);
            }

        }
        getWeather();
    } , [city])

    return <div>
        { weatherData ? (
            <div>
                <h1 className='m-zero'>{weatherData.city.name}, {weatherData.city.country}</h1>
                <h1>{Math.round(weatherData.list[0].main.temp)} °C</h1>
                <h3>Feels like {Math.round(weatherData.list[0].main.feels_like)}°C.&nbsp;
                    {weatherData.list[0].weather[0].main}. Wind {weatherData.list[0].wind.speed} m/s</h3>
            </div>
        ) : (
            <h1 className='m-zero'>No weather data</h1>
        )}
    </div>
}

export default WeatherDisplay;