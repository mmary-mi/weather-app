import { useState } from "react";
import { getCoordinates } from "../services"
import type { Coordinates, CoordinatesReturn } from "../types";

export const useCoordinates = (): CoordinatesReturn => {
    const [data, setData] = useState<Coordinates[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const search = async (cityName :string) => {
        setIsLoading(true)
        setError(null)

        try {
            const result = await getCoordinates(cityName)
            setData(result)
        } catch {
            setError('Не удалось определить координаты')
        } finally {
            setIsLoading(false)
        }
    }

    const clear = () => setData([])

    return {data, isLoading, error, search, clear}
}