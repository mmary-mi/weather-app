import { toggleFavorite } from "../store/favoritesSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import type { CityListProps, Coordinates } from "../types";
import Paper from '@mui/material/Paper';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';

export const CityList = ({ cities, onSelect }: CityListProps) => {
    const dispatch = useAppDispatch();
    const favorites = useAppSelector((state) => state.favorites.items);

    if (cities.length === 0) {
        return(
            <Paper
                elevation={4} 
                sx={{ width: '100%', p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}
            >
                <p>Город не найден</p>
            </Paper>
             )
    }

    const isFavorite = (city: Coordinates) =>
        favorites.some((fav: Coordinates) => fav.lat === city.lat && fav.lon === city.lon)

    return (
        <Paper 
            elevation={4}
            sx={{ width: '100%', maxWidth: 500, bgcolor: 'background.paper' }}>
            {cities.map((city) => (
                <ListItem
                    key={`${city.lat}-${city.lon}`}
                    onClick={() => onSelect(city)}>
                        <ListItemText primary={`${city.name} ${city.country}`} />
                    <IconButton
                        onClick={(e) => {
                            e.stopPropagation();
                            dispatch(toggleFavorite(city))
                        }}
                    >
                        {isFavorite(city) 
                        ? <FavoriteRoundedIcon color="error" /> 
                        : <FavoriteBorderRoundedIcon />}
                    </IconButton>
  
                </ListItem>
            ))}
        </Paper>
    )
}