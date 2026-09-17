import type { FiveDayWeather } from "../types";

export const getForecast = async (lat: number, lon: number) : Promise<FiveDayWeather> => {
    try {
        const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${import.meta.env.VITE_WEATHER_API_KEY}&units=metric&lang=ru`
        const response = await fetch(url)
        if(!response.ok) {
            throw new Error(`Произошла ошибка сервера: ${response.status}`)
        }
        return await response.json();
    } catch(error) {
        console.error('Произошла ошибка при запросе погоды:', error);
        throw error
    }
}