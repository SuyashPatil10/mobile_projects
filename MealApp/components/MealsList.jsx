import { FlatList, StyleSheet, View } from "react-native";
import MealItem from "./MealItem";

function MealsList({ items, isFavouriteList, buttonPressHandler }) {
    function renderMealItem(itemData) {
        const item = itemData.item;

        // function onPressHandler() {
        //     navigation.navigate("MealsDetails", {
        //         item,
        //     });
        // }

        const mealItemProps = {
            id: item.id,
            title: item.title,
            imageUrl: item.imageUrl,
            duration: item.duration,
            complexity: item.complexity,
            affordability: item.affordability,
            // onPress: onPressHandler,
            isFavouriteList,
            buttonPressHandler,
        };
        return <MealItem { ...mealItemProps }/>;
    }

    return (
        <View style={styles.container}>
            <FlatList
            data={items}
            keyExtractor={(item) => item.id}
            renderItem={renderMealItem} />
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        flex: 1,
        // padding: 16,
        // marginBottom: 80,
    },
});

export default MealsList;
