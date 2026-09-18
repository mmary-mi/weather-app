import { useState } from "react"
import { toggleFavorite } from "../store/favoritesSlice"
import { useAppDispatch, useAppSelector } from "../store/hooks"
import type { FavoriteListProps } from "../types"

export const FavoriteList = ({ onSelect }: FavoriteListProps) => {
    const dispatch = useAppDispatch()
    const favorites = useAppSelector((state) => state.favorites.items)

    const [isOpen, setIsOpen] = useState<boolean>(false)
    const toggleOpen = () => setIsOpen((prev) => !prev)

    return (
        <>
            <div>
                <button onClick={toggleOpen}>Избранное</button>
                {isOpen && (
                    favorites.length === 0
                        ? <p>Нет избранных городов</p>
                        : <ul>
                            {favorites.map((city) => (
                                <li
                                    key={`${city.lat}-${city.lon}`}
                                >
                                    <button
                                        onClick={() => dispatch(toggleFavorite(city))}
                                    >
                                        ★
                                    </button>
                                    <span
                                        onClick={() => {
                                            onSelect(city)
                                            setIsOpen(false)
                                        }}>
                                        {city.name}, {city.country}
                                    </span>
                                </li>
                            ))}
                        </ul>
                )
                }
            </div>

        </>
    )
}