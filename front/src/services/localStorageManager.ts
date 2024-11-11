import {IWeatherCard} from "../types/types.ts";

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

export function getWeatherFromLocalStorage(key: string = ''): IWeatherCard[]{
    const data = localStorage.getItem(!key ? 'weather' : key);
    return data && data !== 'undefined' ? JSON.parse(data) : [];
}

export function setWeatherToLocalStorage(weatherData : IWeatherCard[], key: string = ''): void{
    localStorage.setItem(!key ? 'weather' : key, JSON.stringify(weatherData));
}

export function removeWeatherFromLocalStorage(key: string = '') : void {
    localStorage.removeItem(!key ? 'weather' : key);
}