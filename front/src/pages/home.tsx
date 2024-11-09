import {FC, useState} from "react";
import WeatherDisplay from "../components/weatherDisplay.tsx";
import CitiesList from "../components/citiesList.tsx";
import HourlyForecast from "../components/hourlyForecast.tsx";

const Home : FC = () => {
    const cities = ['Zaporizhia', 'Kiev'];
    const [selectedCity, setSelectedCity] = useState<string>(cities[0]);
    const [localStorageUpdated, setLocalStorageUpdated] = useState<boolean>(false);

    return (
        <div className='max-width'>
            <h1>Weather</h1>
            <div className='flex flex-y'>
                <div className='flex flex-x'>
                    <WeatherDisplay city={selectedCity} localStorageUpdated={localStorageUpdated}
                                    onLocalStorageUpdated={setLocalStorageUpdated}/>
                    <CitiesList cities={cities} onCitySelect={setSelectedCity}/>
                </div>
                <div>
                    <HourlyForecast localStorageUpdated={localStorageUpdated}/>
                </div>
            </div>

        </div>
    )
}

export default Home;