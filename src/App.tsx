import { useEffect } from "react"
import {getCoordinates, getWeather} from "./services"
import { useCoordinates } from "./hooks/useCoordinates"
import { CityList } from "./components/CityList"

function App() {
  const { data, isLoading, error, search } = useCoordinates();
  
  return (
    <>
    <button 
      onClick={() => search('London')}
      > London</button>
    <CityList
      cities={data}
      onSelect={(city) => console.log('Выбран:', city)}
    />
    </>
  )
}

export default App
