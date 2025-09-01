import { configureStore } from "@reduxjs/toolkit";
import favouritesReducer from "./favourites";

const store = configureStore({
    reducer: {
        favouriteMeals: favouritesReducer,
    },
});

export { store };