import { createContext, useContext, useReducer } from "react";

const favouritesContext = createContext();

const initialState = {
    ids: [],
}

function reducer(state, action) {
    switch(action.type) {
        case "favourites/add": 

            return { ids: [...state.ids, action.payload.mealId] };

        case "favourites/remove": 
            const filteredIds = state.ids.filter((mealId) => mealId !== action.payload.mealId);
            return { ids: [...filteredIds] };

        default: 
            return state;
    }
}

function FavouriteContextProvider({ children }) {
    const [{ ids }, dispatch] = useReducer(reducer, initialState);

    return (
        <favouritesContext.Provider value={{ ids, dispatch }}>
            { children }
        </favouritesContext.Provider>
    )
}

function useFavourites() {
    const context = useContext(favouritesContext);
    return context;
}

export { FavouriteContextProvider, useFavourites };
