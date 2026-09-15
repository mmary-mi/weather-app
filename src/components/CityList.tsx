import type { CityListProps } from "../types";

export const CityList = ({ cities, onSelect }: CityListProps) => {
    if (cities.length === 0) {
        return <p>Город не найден</p>
    }

    return (
        <ul>
            {cities.map((city) => (
                <li
                    key={`${city.lat}-${city.lon}`}
                    onClick={() => onSelect(city)}>
                    {city.name}, {city.state && `,${city.state}`}, {city.country}
                </li>
            ))}
        </ul>
    )
}