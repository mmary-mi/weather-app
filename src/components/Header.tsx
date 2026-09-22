import { SearchInput } from "./SearchInput";
import LoadingButton from "@mui/lab/LoadingButton"
import { Button } from "@mui/material";
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';

interface HeaderProps {
    onSearch: (value: string) => void;
    onGeolocation: () => void;
    onToggleFavorites: () => void;
    geoIsLoading?: boolean;
    citiesSlot?: React.ReactNode;
    favoritesSlot?: React.ReactNode;
}

export const Header = ({ onSearch, onGeolocation, onToggleFavorites, geoIsLoading, citiesSlot, favoritesSlot }: HeaderProps) => {

    const glassButtonSx = {
        bgcolor: 'rgba(255,255,255,0.1)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255,255,255,0.2)',
        color: '#fff',
        borderRadius: 3,
        boxShadow: '0 4px 16px rgba(0,0,0,0.25)',
        px: 3,
        textTransform: 'none',
        '&:hover': {
            bgcolor: 'rgba(255,255,255,0.18)',
            borderColor: 'rgba(255,255,255,0.35)',
        },
    };

    return (
        <div
            style={{
                display: 'flex',
                gap: '30px',
                padding: '30px'
            }}
        >
            <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                <SearchInput
                    onSearch={onSearch}
                >
                    {citiesSlot}
                </SearchInput>
            </div>

            <LoadingButton
                onClick={onGeolocation}
                loading={geoIsLoading}
                loadingPosition="start"
                startIcon={<LocationOnRoundedIcon />}
                sx={glassButtonSx}
            >
                Найти меня
            </LoadingButton>

            <div data-dropdown style={{ position: 'relative' }}>
                <Button
                onClick={onToggleFavorites}
                startIcon={<FavoriteRoundedIcon />}
                sx={glassButtonSx}
            >
                Избранное
            </Button>
            {favoritesSlot}
            </div>
        </div>
    )
}