import { createSlice} from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Coordinates, FavoritesState } from "../types";

const initialState: FavoritesState = {
    items: []
}

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        toggleFavorite: (state, action: PayloadAction<Coordinates>) => {
            const index = state.items.findIndex((item) => item.lat === action.payload.lat && item.lon === action.payload.lon);
            if (index !== -1) {
                state.items.splice(index, 1)
            } else {
                state.items.push(action.payload)
            }
        },
        setFavorites: (state, action: PayloadAction<Coordinates[]>) => {
            state.items = action.payload
        }
    }
})

export const { toggleFavorite, setFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;