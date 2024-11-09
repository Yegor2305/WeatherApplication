import { FC } from "react";
import {ICitiesListProps} from "../types/types.ts";

const CitiesList : FC<ICitiesListProps> = ({ cities, onCitySelect }) => {

    return <div className='flex flex-y'>
        { cities.map(city => (
            <button key={city} onClick={() => onCitySelect(city)}>
                {city}
            </button>
        ))}
        {
            cities.length < 5 &&(
                <button>+</button>
            )
        }
    </div>
}

export default CitiesList;