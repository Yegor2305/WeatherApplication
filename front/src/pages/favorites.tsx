import {FC, useEffect, useState} from "react";
import {IWeatherCard} from "../types/types.ts";
import {getWeatherFromLocalStorage, setWeatherToLocalStorage} from "../services/localStorageManager.ts";
import {UserService} from "../services/user.service.ts";
import {WeatherService} from "../services/weather.service.ts";
import WeatherDisplay from "../components/weatherDisplay.tsx";

const Favorites : FC = () => {

    const [favCards, setFavCards] = useState<IWeatherCard[]>(getWeatherFromLocalStorage('favorites'))

    useEffect(() => {
        setWeatherToLocalStorage(favCards, 'favorites');
    }, [favCards]);

    useEffect(() => {

        const getPlaces = async () =>{
            const data = await UserService.getUserPlaces();

            if (data) {
                for (let i = 0; i < data.length; i++) {

                    if (favCards[i] && favCards[i].city == data[i].name) continue;
                    const weatherData = await WeatherService.getWeatherByCity(data[i].name);
                    if (weatherData){
                        const newCard : IWeatherCard = {
                            city: data[i].name,
                            weatherData: weatherData,
                            favorite: true,
                        }
                        setFavCards(prevFavCards => [...prevFavCards, newCard])
                    }

                }
            }
        }
        getPlaces();
    }, []);



    const deleteFromFavorites = async (index: number) => {
        const city = favCards[index].city;
        if (city){
            if (!confirm('Are you sure to remove this from favorites?')) return;
            await UserService.removeUserPlace(city);
            favCards.splice(index, 1);
            setFavCards([...favCards]);
        }
    }


    return (
        <div className='max-width'>
            <h1 className='text-align-center'>Favorites</h1>
            {
                favCards.length > 0 ? (
                    <div className='cards-container'>
                        {
                            favCards.map((value, index) => (
                                 <WeatherDisplay key={index} index={index} city={value.city}
                                 weatherData={value.weatherData} favoriteChange={deleteFromFavorites}
                                 favorite={value.favorite}/>
                            ))
                        }
                    </div>
                ) : (
                    <div className='text-align-center'>No favorites</div>
                )
            }
        </div>
    )
}

export default Favorites;