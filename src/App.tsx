import { useCoordinates } from "./hooks/useCoordinates"
import { CityList } from "./components/CityList"
import { useWeather } from "./hooks/useWeather";
import { WeatherCard } from "./components/WeatherCard";

function App() {
  const { data: cities, isLoading: citiesLoading, error: citiesError, search } = useCoordinates();
  const { data: weather, isLoading: weatherLoding, error: weatherError, receiveWeather} = useWeather();
  return (
    <>
    <button 
      onClick={() => search('London')}
      > London</button>
    <CityList
      cities={cities}
      onSelect={(city) => receiveWeather(city.lat, city.lon)}
    />
  
     {weather && <WeatherCard weather={weather} />}
    </>
  )
}

export default App
