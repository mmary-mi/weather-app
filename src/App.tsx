import { useCoordinates } from "./hooks/useCoordinates"
import { CityList } from "./components/CityList"
import { useWeather } from "./hooks/useWeather";
import { WeatherCard } from "./components/WeatherCard";
import { useForecast } from "./hooks/useForecast";
import { Forecast } from "./components/Forecast";
import type { Coordinates } from "./types";
import { useEffect, useState } from "react";
import { setFavorites } from "./store/favoritesSlice";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { FavoriteList } from "./components/FavoriteList";
import { useGeolocation } from "./hooks/useGeolocation";

function App() {
  const { data: cities, isLoading: citiesLoading, error: citiesError, search } = useCoordinates();
  const { data: weather, isLoading: weatherLoading, error: weatherError, receiveWeather } = useWeather();
  const { data: forecast, isLoading: forecastLoading, error: forecastError, receiveForecast } = useForecast();

  const [selectedCity, setSelectedCity] = useState<Coordinates | null>(null);

  const [isInitialized, setIsInitialized] = useState(false);
  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state) => state.favorites.items)

  function getReceiveWeather(city: Coordinates) {
    receiveWeather(city.lat, city.lon)
    receiveForecast(city.lat, city.lon)
  }

  useEffect(() => {
   try { const saved = localStorage.getItem('favorites');
    if(saved) {
      dispatch(setFavorites(JSON.parse(saved)))
    }} catch (err) {
      console.error('Ошибка чтения localStorage:', err)
    }
    setIsInitialized(true);
  }, [])

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('favorites', JSON.stringify(favorites))
    }
  }, [favorites, isInitialized]);

  const {data: geoData, isLoading: geoIsLoading, error: geoError, getGeolocation} = useGeolocation();

  useEffect(() => {
    if (geoData) {
      receiveWeather(geoData.lat, geoData.lon);
      receiveForecast(geoData.lat, geoData.lon)
    }
  },[geoData])

  return (
    <>
      <button
        onClick={() => search('Минск')}
      > Найти</button>

      <button
        onClick={getGeolocation}
      >Найти меня
      </button>

      {geoIsLoading && <p>Определяю местоположение</p>}
      {geoError && <p>{geoError}</p>}

      <FavoriteList onSelect={(city) => {
        setSelectedCity(city)
        getReceiveWeather(city)
      }} />

      {citiesLoading && <p>Ищу город</p>}
      {citiesError && <p>{citiesError}</p>}
      {!citiesLoading && !citiesError && (
        <CityList
          cities={cities}
          onSelect={(city) => {
            setSelectedCity(city)
            getReceiveWeather(city)
          }}
        />
      )}

      {weatherLoading && <p>Загружаю погоду</p>}
      {weatherError && <p>{weatherError}</p>}
      {weather && !weatherLoading && selectedCity && (
        <WeatherCard weather={weather} city={selectedCity} />
        )}

      {forecastLoading && <p>Загружаю погоду</p>}
      {forecastError && <p>{forecastError}</p>}
      {forecast && !forecastLoading && <Forecast forecast={forecast} />}

    </>
  )
}

export default App
