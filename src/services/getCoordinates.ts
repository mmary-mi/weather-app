import type { Coordinates } from "../types";

export const getCoordinates = async(cityName: string): Promise<Coordinates[]> => {
    try {
        const url = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${import.meta.env.VITE_WEATHER_API_KEY}`
        const response = await fetch(url)
        if(!response.ok) {
            throw new Error(`Произошла ошибка сервера: ${response.status}`)
        }
        return await response.json();
    } catch(error) {
        console.error('Произошла ошибка при запросе координат:', error);
        throw error
    }
}

