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
import { Header } from "./components/Header";
import { Container } from "@mui/material";

function App() {
  const { data: cities, isLoading: citiesLoading, error: citiesError, search, clear } = useCoordinates();
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

  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false)

  useEffect(() => {
    try {
      const saved = localStorage.getItem('favorites');
      if (saved) {
        dispatch(setFavorites(JSON.parse(saved)))
      }
    } catch (err) {
      console.error('Ошибка чтения localStorage:', err)
    }
    setIsInitialized(true);
  }, [dispatch])

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('favorites', JSON.stringify(favorites))
    }
  }, [favorites, isInitialized]);

  const { data: geoData, isLoading: geoIsLoading, error: geoError, getGeolocation } = useGeolocation();

  useEffect(() => {
    if (geoData) {
      receiveWeather(geoData.lat, geoData.lon);
      receiveForecast(geoData.lat, geoData.lon)
    }
  }, [geoData]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest('[data-dropdown]')) return
      setIsFavoritesOpen(false)
      clear()
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [clear])


  return (
    <Container maxWidth='xl'>
      <Header
        onSearch={(value) => search(value)}
        onGeolocation={getGeolocation}
        onToggleFavorites={() => setIsFavoritesOpen((prev) => !prev)}
        geoIsLoading={geoIsLoading}
        citiesSlot={
          !citiesLoading && !citiesError && cities.length > 0 && (
            <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 10 }}>
              <CityList
                cities={cities}
                onSelect={(city) => {
                  setSelectedCity(city)
                  getReceiveWeather(city)
                  clear()
                }} />
            </div>
          )
        }
        favoritesSlot={
          isFavoritesOpen && (
            <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 10, minWidth: '240px' }}>
              <FavoriteList
                onSelect={(city) => {
                  setSelectedCity(city)
                  getReceiveWeather(city)
                  setIsFavoritesOpen(false)
                }}
                isOpen={isFavoritesOpen}
              />
            </div>
          )
        }
      />

      {geoError && <p style={{ color: "error" }}>{geoError}</p>}



      {weatherLoading && <p>Загружаю погоду</p>}
      {weatherError && <p>{weatherError}</p>}
      {weather && !weatherLoading && selectedCity && (
        <WeatherCard weather={weather} city={selectedCity} />
      )}

      {forecastLoading && <p>Загружаю погоду</p>}
      {forecastError && <p>{forecastError}</p>}
      {forecast && !forecastLoading && <Forecast forecast={forecast} />}

    </Container>
  )
}

export default App
