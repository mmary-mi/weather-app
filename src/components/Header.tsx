import { SearchInput } from "./SearchInput";
import LoadingButton from "@mui/lab/LoadingButton"
import { Button } from "@mui/material";
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import PinDropRoundedIcon from '@mui/icons-material/PinDropRounded';
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

     
    return(
        <div
            style={{
                display: 'flex',
                gap: '30px',
                margin: '30px' 
            }}
        >
            <div style ={{ flex:1, display: 'flex', justifyContent: 'center' }}>
                <SearchInput 
                onSearch={onSearch}
            >
            {citiesSlot}
            </SearchInput>
            </div>

            <LoadingButton
                onClick={onGeolocation}
                loadingPosition="start" 
                startIcon={<LocationOnRoundedIcon />}
            > Найти меня</LoadingButton>

            <Button
                startIcon={<PinDropRoundedIcon />}
            > Карта</Button>

            <div data-dropdown style={{ position: 'relative'}}>
                <Button
                onClick={onToggleFavorites}
                startIcon={<FavoriteRoundedIcon />}
            > Избранное
            </Button>
            {favoritesSlot}
            </div>
            


        </div>
    )
}