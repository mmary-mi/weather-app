import { toggleFavorite } from "../store/favoritesSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import type { CityListProps, Coordinates } from "../types";

export const CityList = ({ cities, onSelect }: CityListProps) => {
    const dispatch = useAppDispatch();
    const favorites = useAppSelector((state) => state.favorites.items);

    if (cities.length === 0) {
        return <p>Город не найден</p>
    }

    const isFavorite = (city: Coordinates) =>
        favorites.some((fav: Coordinates) => fav.lat === city.lat && fav.lon === city.lon)

    return (
        <ul>
            {cities.map((city) => (
                <li
                    key={`${city.lat}-${city.lon}`}
                    onClick={() => onSelect(city)}>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            dispatch(toggleFavorite(city))
                        }}
                    >
                        {isFavorite(city) ? '★' : '☆'}
                    </button>
                    {city.name}, {city.state && `,${city.state}`}, {city.country}
                </li>
            ))}
        </ul>
    )
}