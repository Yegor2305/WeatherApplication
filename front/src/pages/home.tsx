import {FC, useEffect, useState} from "react";
import WeatherDisplay from "../components/weatherDisplay.tsx";
import {WeatherService} from "../services/weather.service.ts";
import {IPlaceInfo, IWeatherCard} from "../types/types.ts";
import {getWeatherFromLocalStorage, setWeatherToLocalStorage} from "../services/localStorageManager.ts";
import {UserService} from "../services/user.service.ts";
import plus from "../assets/plus.png"


const Home : FC = () => {
    const cities = [
        'Zaporizhia',
        'Kyiv',
        'Lviv',
        'Dnipro',
        'London'
    ];

    const [cards, setCards] = useState<IWeatherCard[]>(getWeatherFromLocalStorage())
    const [userPlaces, setUserPlaces] = useState<IPlaceInfo[]>([])

    const getPlaces = async () => {
        const data = await UserService.getUserPlaces();
        if (data) {
            setUserPlaces(data)
            if (!cards) return;
            for (const card of cards){
                card.favorite = data.some(place => place.name == card.city);
            }
            setCards((oldCards) => [...oldCards]);
        }
    }

    useEffect(() => {
        getPlaces()
    }, []);

    if (cards.length == 0){
        WeatherService.getWeatherByIp().then((result) => {
            const newCard = {
                city: result.city.name,
                weatherData: result,
                favorite: userPlaces.some(place => place.name == result.city.name),
            }
            setCards([...cards, newCard])
        })
    }

    const addCard = () => {
        const newCard = {
            city: null,
            weatherData: null,
            favorite: false
        }

        setCards([...cards, newCard])
    }

    const removeCard = (index: number) => {
        if (cards.length > 1){
            if (!confirm('Are you sure to delete card?')) return;
            cards.splice(index, 1);
            setCards([...cards]);
        }
        else {
            alert('The last card cannot be deleted!')
        }
    }

    const toggleFavorite = async (index: number) => {
        const city = cards[index].city;
        if (userPlaces.some(place => place.name == city)){
            if (city) {
                await UserService.removeUserPlace(city);
                setCards(cards.map(el => {
                    if (el.city == city){
                        return {...el, favorite: false}
                    }
                    return el;
                }))
            }
        }
        else{
            if (userPlaces.length >= 5) {
                alert('You have 5 places added. Delete place to add new')
            }

            if (city) {
                await UserService.addUserPlace({name: city});
                setCards(cards.map(el => {
                    if (el.city == city){
                        return {...el, favorite: true}
                    }
                    return el;
                }))
            }

        }
        await getPlaces()
    }

    useEffect(() => {
        setWeatherToLocalStorage(cards);
    }, [cards]);

    const setCity = async (index: number, city: string | null) => {
        cards[index].city = city;
        cards[index].favorite = userPlaces.some(place => place.name == city)
        const data = await WeatherService.getWeatherByCity(city);
        if (data){
            cards[index].weatherData = data;
        }
        setCards([...cards]);

    }

    return (
        <div className='max-width'>
            <h1 className='text-align-center'>Weather</h1>
            <div className='cards-container'>
                {
                    cards.map((value, index) => (
                        <WeatherDisplay key={index} index={index} city={value.city} removeCard={removeCard}
                            favorite={value.favorite} favoriteChange={toggleFavorite} setCity={setCity} cities={cities}
                            weatherData={value.weatherData}/>
                    ))

                }
                {
                    cards.length < 5 && (
                        <div className='add-card-button weather-card' onClick={addCard}>
                            <img src={plus} alt='img' width={150}/>
                        </div>
                    )
                }

            </div>
        </div>
    )
}

export default Home;