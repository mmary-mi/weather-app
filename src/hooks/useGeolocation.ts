import { useState } from "react";
import type { GeolocationReturn } from "../types";

export const useGeolocation = (): GeolocationReturn => {

const [data, setData] = useState<{lat:number; lon:number} | null>(null);
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState<string |null>(null)

const getGeolocation = (): void => {

    setIsLoading(true);
    setError(null);

    const onSuccess = (position: GeolocationPosition) => {
        setData({
            lat: position.coords.latitude,
            lon: position.coords.longitude
        })
        setIsLoading(false)
    };

    const onError = (err: GeolocationPositionError) => {
        setError('Не удалось получить местоположение');
        setIsLoading(false)
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError)

}
return {data, isLoading, error, getGeolocation }
}