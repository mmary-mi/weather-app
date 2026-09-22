import sun from '../assets/sun.png'
import cloud from '../assets/cloud.png';
import rain from '../assets/rain.png';
import thunderstorm from '../assets/thunderstorm.png';
import snow from '../assets/snow.png';
import cloudsPartly from '../assets/cloudsPartly.png'
import mist from '../assets/mist.png';

export const getWeatherImage = (main?: string, id?: number): string => {
    switch (main) {
        case 'Clear':        return sun;
        case 'Clouds':      
            if (id === 803) return cloudsPartly; 
            return cloud;
        case 'Rain':
        case 'Drizzle':      return rain;
        case 'Thunderstorm': return thunderstorm;
        case 'Snow':         return snow;
        case 'Mist':
        case 'Fog':
        case 'Haze':         return mist;
        default:             return sun;
    }
};