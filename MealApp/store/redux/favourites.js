import { createSlice } from "@reduxjs/toolkit";

const favouritesSlice = createSlice({
    name: "favourites",
    initialState: {
        ids: [],
    },

    reducers: {
        addToFavourites(state, action) {
            state.ids.push(action.payload.id);
        },

        removeFromFavourites(state, action) {
            state.ids.splice(state.ids.indexOf(action.payload.id), 1);
        },
    }
});

export default favouritesSlice.reducer;
export const { addToFavourites, removeFromFavourites } = favouritesSlice.actions;