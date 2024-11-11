// export interface IUser{
//     id: number;
//     username: string;
// }

export interface IUserData {
    username : string;
    password: string;
}

export interface IUser {
    id: number;
    username: string;
    access_token: string;
}

export interface IWeatherInfoMain {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
}

export interface IWeatherInfoWind {
    speed: number;
    deg: number;
    gust: number;
}

export interface IWeatherInfoWeather {
    id: number;
    main: string;
    description: string;
    icon: string;
}

export interface IWeatherForThreeHours{
    dt: number;
    main: IWeatherInfoMain;
    weather: IWeatherInfoWeather[];
    clouds: object;
    wind: IWeatherInfoWind;
    visibility: number;
    pop: number;
    sys: object;
    dt_txt: string;
}

export interface ICity{
    id: number;
    name: string;
    coord: object;
    "country": string,
    "population": number,
    "timezone": number,
    "sunrise": number,
    "sunset": number
}

export interface IWeatherData{
    cod: string;
    message: any;
    cnt: number;
    list: IWeatherForThreeHours[];
    city: ICity;
}

export interface IWeatherDisplayProps{
    index: number;
    city: string | null;
    setCity?: (id: number, city: string | null) => Promise<void>;
    removeCard?: (id: number) => void;
    cities?: string[];
    weatherData: IWeatherData | null;
    favorite: boolean;
    favoriteChange: (id: number) => Promise<void>;
}

export interface IHourlyForecastProps{
    weatherData: IWeatherData | null;
}

export interface IWeatherCard{
    city: string | null;
    weatherData: IWeatherData | null;
    favorite: boolean;
}

export interface IPlaceInfo{
    id: number;
    name: string;
}

export interface IPlace{
    name: string;
}