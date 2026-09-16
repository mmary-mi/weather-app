import type { WeatherCardProps } from "../types";

export const WeatherCard = ({ weather }: WeatherCardProps) => {
    return (<>
        <div>
            <h2>{weather.name}</h2>
            <p>{weather.main.temp}°C</p>
            <p>{weather.weather[0].description}</p>
            <p>от: {weather.main.temp_min}°C до:{weather.main.temp_max}°C</p>
            <p>Ощущается как:{weather.main.feels_like}°C</p>
            <p>Давление: {weather.main.pressure}мм рт.ст.</p>
            <p>Влажность: {weather.main.humidity}%</p>
            <p>Видимость: {weather.visibility / 1000}км</p>
            <p>Скорость ветра: {weather.wind.speed}м/с</p>
            {weather.wind.gust && <p>Порывы ветра: {weather.wind.gust}м/с</p>}
            <p>Облачность: {weather.clouds.all}%</p>
            {weather.rain && <p>Дождь: {weather.rain['1h']}мм</p>}
            {weather.snow && <p>Снег: {weather.snow['1h']}мм</p>}
        </div>

    </>)
}