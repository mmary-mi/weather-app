import type { CurrentWeather } from "../types";

export const getWeather = async (lat: number, lon: number) : Promise<CurrentWeather> => {
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${import.meta.env.VITE_WEATHER_API_KEY}&units=metric&lang=ru`
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