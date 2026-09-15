import { useState } from "react";
import { getWeather } from "../services"
import type { CurrentWeather, WeatherReturn } from "../types";

export const useWeather = (): WeatherReturn => {
    const [data, setData] = useState<CurrentWeather | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const receiveWeather = async (lat :number, lon: number) => {
        setIsLoading(true)
        setError(null)

        try {
            const result = await getWeather(lat, lon)
            setData(result)
        } catch {
            setError('Не удалось загрузить погоду')
        } finally {
            setIsLoading(false)
        }
    }

    return {data, isLoading, error, receiveWeather}
}