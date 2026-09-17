import { useState } from "react";
import type { FiveDayWeather, ForecastReturn } from "../types";
import { getForecast } from "../services/getForecast";

export const useForecast = (): ForecastReturn => {
    const [data, setData] = useState<FiveDayWeather | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const receiveForecast = async (lat :number, lon: number) => {
        setIsLoading(true)
        setError(null)

        try {
            const result = await getForecast(lat, lon)
            setData(result)
        } catch {
            setError('Не удалось загрузить погоду')
        } finally {
            setIsLoading(false)
        }
    }

    return {data, isLoading, error, receiveForecast}
}