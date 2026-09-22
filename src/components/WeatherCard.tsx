import { toggleFavorite } from "../store/favoritesSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import type { Coordinates, WeatherCardProps } from "../types";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';

export const WeatherCard = ({ weather, city }: WeatherCardProps) => {

    const dispatch = useAppDispatch();
    const favorites = useAppSelector((state) => state.favorites.items);

    const isFavorite = (city: Coordinates) =>
        favorites.some((fav: Coordinates) => fav.lat === city.lat && fav.lon === city.lon)

    return (
        <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                    {weather.name}
                </Typography>
                <IconButton onClick={() => dispatch(toggleFavorite(city))}>
                    {isFavorite(city)
                        ? <FavoriteRoundedIcon color="error" />
                        : <FavoriteBorderRoundedIcon />}
                </IconButton>
            </Box>

            
            <Typography variant="h2" sx={{ fontWeight: 300, lineHeight: 1 }}>
                {weather.main.temp}°C
            </Typography>

            
            <Typography
                variant="body1"
                sx={{ mb: 2, textTransform: 'capitalize', opacity: 0.9 }}
            >
                {weather.weather[0].description}
            </Typography>

            
            <Typography variant="body2" sx={{ opacity: 0.85, lineHeight: 1.9 }}>
                от {weather.main.temp_min}°C до {weather.main.temp_max}°C<br />
                Ощущается как: {weather.main.feels_like}°C<br />
                Давление: {weather.main.pressure} мм рт.ст.<br />
                Влажность: {weather.main.humidity}%<br />
                Видимость: {weather.visibility / 1000} км<br />
                Ветер: {weather.wind.speed} м/с
                {weather.wind.gust && <> (порывы {weather.wind.gust} м/с)</>}
                <br />
                Облачность: {weather.clouds.all}%
                {weather.rain && <><br />Дождь: {weather.rain['1h']} мм</>}
                {weather.snow && <><br />Снег: {weather.snow['1h']} мм</>}
            </Typography>
            </Box>
       
    )
}