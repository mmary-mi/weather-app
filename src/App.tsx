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
import { Box, Container } from "@mui/material";
import { getBackground } from "./utils/getBackground";
import { PageBackground } from "./components/PageBackground";
import { Rain } from "./components/Rain";
import { Snow } from "./components/Snow";
import { getWeatherImage } from "./utils/getWeatherImage";
import { Widget } from "./components/Widget";

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
  }, [clear]);

  const heroBg = getBackground(weather?.weather[0].main)

  const main = weather?.weather[0].main;
  const weatherId = weather?.weather[0].id;
  const isRain = main === 'Rain' || main === 'Drizzle' || main === 'Thunderstorm';
  const isSnow = main === 'Snow';
  const weatherImage = getWeatherImage(main, weatherId);


  return (
    <Box sx={{ position: 'relative', minHeight: '100dvh' }}>
      {isRain && <Rain />}
      {isSnow && <Snow />}

      <PageBackground background={heroBg} />
      <Container maxWidth='xl' sx={{ position: 'relative', zIndex: 1 }}>
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

        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 20,
            mt: 2
          }}
        >

          <Widget>
            <Box sx={{ display: 'flex', justifyContent: 'center', maxHeight: 380, maxWidth: 380 }}>
              <img
                src={weatherImage}
                alt=""
                style={{
                  maxWidth: '80%',
                  maxHeight: '100%',
                  objectFit: 'contain',
                  display: 'block',
                  filter: 'drop-shadow(0 12px 32px rgba(0,0,0,0.5))'
                }}
              />
            </Box>
          </Widget>

          {(weatherLoading || weather || weatherError) && (
            <Widget>
              {weatherLoading && <p>Загружаю погоду</p>}
              {weatherError && <p style={{ color: 'error' }}>{weatherError}</p>}
              {weather && !weatherLoading && selectedCity && (
                <WeatherCard weather={weather} city={selectedCity} />
              )}
            </Widget>
          )}

        </Box>

        <Box sx={{ mt: 3 }}>
          {forecastLoading && <p>Загружаю погоду</p>}
          {forecastError && <p style={{ color: 'error' }}>{forecastError}</p>}
          {forecast && !forecastLoading && <Forecast forecast={forecast} />}
        </Box>
      </Container>
    </Box>
  )
}

export default App
