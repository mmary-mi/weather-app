import { toggleFavorite } from "../store/favoritesSlice"
import { useAppDispatch, useAppSelector } from "../store/hooks"
import type { FavoriteListProps, Coordinates } from "../types"
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';

export const FavoriteList = ({ onSelect, isOpen }: FavoriteListProps) => {
    const dispatch = useAppDispatch()
    const favorites = useAppSelector((state) => state.favorites.items)

    if (!isOpen) {
        return null
    }

    if (favorites.length === 0) {
        return (
            <Paper
                elevation={4}
                sx={{ width: '100%', p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}
            >
                <p style={{ margin: 0 }}>Нет избранных городов</p>
            </Paper>
        )
    }

    return (
        <Paper
            elevation={4}
            sx={{
                width: '100%',
                maxWidth: '150px',
                bgcolor: 'background.paper',
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 1,
                overflow: 'hidden',
                maxHeight: 400,
                overflowY: 'auto',
            }}
        >
            <List sx={{ width: '100%', py: 0 }}>
                {favorites.map((city: Coordinates) => (
                    <ListItem
                        key={`${city.lat}-${city.lon}`}
                        onClick={() => onSelect(city)}
                        sx={{
                            cursor: 'pointer',
                            transition: 'background-color 0.15s ease',
                            '&:hover': { bgcolor: 'action.hover' },
                            '&:not(:last-child)': {
                                borderBottom: '1px solid',
                                borderColor: 'divider',
                            },
                        }}
                    >
                        <ListItemText primary={`${city.name}, ${city.country}`} />
                        <IconButton
                            onClick={(e) => {
                                e.stopPropagation();
                                dispatch(toggleFavorite(city))
                            }}
                        >
                            <FavoriteRoundedIcon color="error" />
                        </IconButton>
                    </ListItem>
                ))}
            </List>
        </Paper>
    )
}