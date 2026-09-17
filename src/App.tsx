import { useCoordinates } from "./hooks/useCoordinates"
import { CityList } from "./components/CityList"
import { useWeather } from "./hooks/useWeather";
import { WeatherCard } from "./components/WeatherCard";
import { useForecast } from "./hooks/useForecast";
import { Forecast } from "./components/Forecast";

function App() {
  const { data: cities, isLoading: citiesLoading, error: citiesError, search } = useCoordinates();
  const { data: weather, isLoading: weatherLoading, error: weatherError, receiveWeather } = useWeather();
   const { data: forecast, isLoading: forecastLoading, error: forecastError, receiveForecast } = useForecast();

   function getReceiveWeather(city) {
    receiveWeather(city.lat, city.lon)
    receiveForecast(city.lat, city.lon)
   }

  return (
    <>
      <button
        onClick={() => search('London')}
      > London</button>

      {citiesLoading && <p>Ищу город</p>}
      {citiesError && <p>{citiesError}</p>}
      {!citiesLoading && !citiesError && (
        <CityList
          cities={cities}
          onSelect={(city) => getReceiveWeather(city)}
        />
      )}

      {weatherLoading && <p>Загружаю погоду</p>}
      {weatherError && <p>{weatherError}</p>}
      {weather && !weatherLoading && <WeatherCard weather={weather} />}

      {forecastLoading && <p>Загружаю погоду</p>}
      {forecastError && <p>{forecastError}</p>}
      {forecast && !forecastLoading && <Forecast forecast={forecast}/>}
      
    </>
  )
}

export default App
