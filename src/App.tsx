import {getCoordinates, getWeather} from "./services"
import { useCoordinates } from "./hooks/useCoordinates"
import { CityList } from "./components/CityList"
import { useWeather } from "./hooks/useWeather";

function App() {
  const { data: cities, isLoading: citiesLoading, error: citiesError, search } = useCoordinates();
  const { data: weather, isLoading: weatherLoding, error: weatherError, receiveWeather} = useWeather();
  console.log(weather)
  return (
    <>
    <button 
      onClick={() => search('London')}
      > London</button>
    <CityList
      cities={cities}
      onSelect={(city) => receiveWeather(city.lat, city.lon)}
    />
    </>
  )
}

export default App
