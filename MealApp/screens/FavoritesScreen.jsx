import { View, Text, StyleSheet } from "react-native";
import { useFavourites } from "../store/context/FavouriteContextProvider";
import { MEALS } from "../data/dummy-data";
import MealsList from "../components/MealsList";
import { useDispatch, useSelector } from "react-redux";
import { removeFromFavourites } from "../store/redux/favourites";

function FavoritesScreen() {
    // const { ids, dispatch } = useFavourites();
    const ids = useSelector((state) => state.favouriteMeals.ids);
    const dispatch = useDispatch();

    if(ids.length === 0) {
        return (
            <View style={styles.container}>
                <Text style={styles.textTitle}>Add Your <Text style={styles.innerTextTitle}>Favourite</Text> Meal Now!</Text>
            </View>
        );
    }

    const favouriteMeals = MEALS.filter((meal) => ids.includes(meal.id));

    function removeMealButtonHandler(id) {
        // dispatch({ type: "favourites/remove", payload: { mealId: id } });
        dispatch(removeFromFavourites({ id }));
    }

    return (
        <MealsList items={favouriteMeals} isFavouriteList={true} buttonPressHandler={removeMealButtonHandler} />
    )
}

const styles = StyleSheet.create({
    container : {
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },

    textTitle: {
        fontWeight: "bold",
        fontSize: 18,
        color: "white",
    },

    innerTextTitle : {
        color: "#eb1064",
    }
});

export default FavoritesScreen;
