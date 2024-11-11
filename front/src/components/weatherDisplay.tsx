import {FC} from "react";
import { IWeatherDisplayProps} from "../types/types.ts";
import {Autocomplete, TextField} from "@mui/material";
import HourlyForecast from "./hourlyForecast.tsx";
import fav from "../assets/star_filled.png"
import notFav from "../assets/star_empty.png"
import trash from "../assets/trash.png"

const WeatherDisplay : FC<IWeatherDisplayProps> = ({index, cities, city,
                                                       removeCard, setCity, weatherData, favorite, favoriteChange}) => {

    return <div className='weather-card'>
        {
            cities && setCity && removeCard ? (
                <div className='flex flex-x weather-card-header'>
                    <Autocomplete fullWidth={true} renderInput={
                        (params) => <TextField {...params} label='Choose city'/>}
                                  options={cities} value={city}
                                  onChange={(_event, value) => setCity(index, value)}/>
                    <button onClick={(_e) => removeCard(index)}>
                        <img src={trash} alt='img' width={30}/>
                    </button>
                    <button onClick={(_e) => favoriteChange(index)}>
                        <img src={favorite ? fav : notFav} alt='img' width={30}/>
                    </button>
                </div>
            ) : (
                <div className='weather-card-header flex flex-x flex-between'>
                    <h1>{city}</h1>
                    <button onClick={(_e) => favoriteChange(index)}>
                        <img src={favorite ? fav : notFav} alt='img' width={30}/>
                    </button>
                </div>
            )
        }

        {weatherData ? (
            <div>
                <h1>{Math.round(weatherData.list[0].main.temp)} °C</h1>
                <h3>Feels like {Math.round(weatherData.list[0].main.feels_like)}°C.&nbsp;
                    {weatherData.list[0].weather[0].main}. Wind {weatherData.list[0].wind.speed} m/s</h3>
                <HourlyForecast weatherData={weatherData}/>
            </div>

        ) : (
            <h1 className='m-zero'>No weather data</h1>
        )}
    </div>
}

export default WeatherDisplay;