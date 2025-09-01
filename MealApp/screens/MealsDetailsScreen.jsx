import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { useLayoutEffect } from "react";
import IconButton from "../components/IconButton";
import { useDispatch, useSelector } from "react-redux";

import { addToFavourites, removeFromFavourites } from "../store/redux/favourites";
import { MEALS } from "../data/dummy-data";
import MealDetails from "../components/MealDetails";
import Subtitle from "../components/mealDetail/Subtitle";
import List from "../components/mealDetail/List";
// import { useFavourites } from "../store/context/FavouriteContextProvider";

function MealsDetailsScreen({ route, navigation }) {
    // const { ids, dispatch } = useFavourites();
    const ids = useSelector((state) => state.favouriteMeals.ids);
    const dispatch = useDispatch();
    const { mealId } = route.params;
    const mealItem = MEALS.find((meal) => {return meal.id === mealId});

    let mealIsFavourite = ids.includes(mealId);

    function changeFavouriteStatusHandler() {
        if(mealIsFavourite) {
            // dispatch({ type: "favourites/remove", payload: { mealId } });
            dispatch(removeFromFavourites({ id: mealId }));
        }
        else {
            // dispatch({ type: "favourites/add", payload: { mealId } });
            dispatch(addToFavourites({ id: mealId }));
        }
        mealIsFavourite = !mealIsFavourite;
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight : () => { 
                return <IconButton icon={ mealIsFavourite ? "star" : "star-outline" } color={"#e1b080"} onPress={changeFavouriteStatusHandler} />
            }
        });
    }, [navigation, changeFavouriteStatusHandler]);

    return (
        <ScrollView style={styles.container}>
            <Image source={{ uri: mealItem.imageUrl }} style={styles.image} />
            <Text style={styles.title}>{ mealItem.title }</Text>
            
            <MealDetails 
            duration={mealItem.duration} 
            complexity={mealItem.complexity} 
            affordability={mealItem.affordability}
            textStyle={styles.detailText} />
            
            <View style={styles.listOuterContainer}>
                <View style={styles.listContainer}>
                    <Subtitle>Ingredients</Subtitle>
                    <List data={mealItem.ingredients} />

                    <Subtitle>Steps</Subtitle>
                    <List data={mealItem.steps} />
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container : {
        flex: 1,
        marginBottom: 90,
    },

    image : {
        width: "100%",
        height: 350,
    },

    title : {
        fontWeight: "bold",
        fontSize: 24,
        margin: 8,
        textAlign: "center",
        color: "white",
    },

    detailText : {
        color: "white",
    },

    listContainer : {
        width: "80%",
    },
    
    listOuterContainer: {
        display: "flex",
        alignItems: "center",
    }
});

export default MealsDetailsScreen;
