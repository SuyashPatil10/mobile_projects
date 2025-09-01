import AsyncStorage from "@react-native-async-storage/async-storage";

// useEffect(() => {
//     async function fetchFavourites() {


//         const response = await AsyncStorage.getItem("favourites");
//         if(response) {
//             // console.log(JSON.parse(response));
//             setFavouriteMealIds(JSON.parse(response));
//         }
//         else {
//             Alert.alert(
//                 "Failed to store",
//                 "Problem while getting items in favourites",
//                 [{ text: "OK" }]
//             ); 
//         }
//     }

//     fetchFavourites();
// }, []);

async function addStorageItem(favouriteItemId) {
    try{
        await AsyncStorage.setItem("favourites", JSON.stringify(favouriteMealIds));
    }
    catch(error) {
        Alert.alert(
            "Failed to store",
            "Problem while adding item in favourites",
            [{ text: "OK" }]
        );
    }
}

async function removeStorageItem(favouriteItemId) {
    try {
        await AsyncStorage.setItem("favourites", JSON.stringify(favouriteMealIds));
    }
    catch(error) {
        Alert.alert(
            "Failed to remove",
            "Problem while removing item from favourites",
            [{ text: "OK" }]
        );
    }
}

// function checkFavouriteItem(favouriteItemId) {
//     const item = favouriteMealIds.find((meal) => meal.id === favouriteItemId);
//     console.log(item);
//     if(item) {
//         return true;
//     }
//     else {
//         return false;
//     }
// }


// async function headerButtonPressHandler() {
//     if(checkFavouriteItem(mealItem.id)) {
//         await removeStorageItem(mealItem.id);
//     }
//     else {
//         await addStorageItem(mealItem.id);
//     }
// }