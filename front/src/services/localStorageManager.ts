import {IWeatherData} from "../types/types.ts";

export function getTokenFromLocalStorage() : string {
    const data = localStorage.getItem('accessToken');
    return data && data !== 'undefined' ? JSON.parse(data) : '';
}

export function setTokenToLocalStorage(token: string) : void {
    localStorage.setItem('accessToken', JSON.stringify(token));
}

export function removeTokenFromLocalStorage() : void {
    localStorage.removeItem('accessToken');
}

export function getWeatherFromLocalStorage(): IWeatherData{
    const data = localStorage.getItem('weather');
    return data && data !== 'undefined' ? JSON.parse(data) : '';
}

export function setWeatherToLocalStorage(weatherData : IWeatherData): void{
    localStorage.setItem('weather', JSON.stringify(weatherData));
}

export function removeWeatherFromLocalStorage() : void {
    localStorage.removeItem('weather');
}