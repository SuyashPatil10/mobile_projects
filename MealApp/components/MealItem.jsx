import { useNavigation } from "@react-navigation/native";
import { Image, Platform, Pressable, StyleSheet, Text, View } from "react-native";
import MealDetails from "./MealDetails";
import Button from "./Button";

function MealItem({ id, title, imageUrl, duration, complexity, affordability, onPress, isFavouriteList, buttonPressHandler }) {
    const navigation = useNavigation();

    function onPressHandler() {
        navigation.navigate("MealsDetails", {
            mealId : id,
        });
    }

    return (
        <View style={styles.mealItem}>
            <Pressable android_ripple={{ color: "#ccc" }}
            onPress={onPressHandler} 
            style={({ pressed }) => {return pressed ? styles.buttonPressed : null}}>
                <View style={ styles.innerContainer }>
                <View>
                    <Image source={{ uri: imageUrl }} style={styles.image} />
                    <Text style={styles.title}>{ title }</Text>
                </View>
                
                <MealDetails duration={duration} complexity={complexity} affordability={affordability} />
                </View>
            </Pressable>
            { isFavouriteList &&  <Button onPress={() => buttonPressHandler(id)}>remove</Button>}
        </View>
    )
}

const styles = StyleSheet.create({
    mealItem: {
        margin: 16,
        borderRadius: 8,
        overflow: "hidden",
        backgroundColor: "white",
        elevation: 4,
        shadowColor: "black",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
        overflow: Platform.OS === "android" ? "hidden" : "visible",
    },

    innerContainer: {
        borderRadius: 8,
        overflow: "hidden",
    },

    buttonPressed : {
        opacity: 0.5,
    },

    image : {
        width: "100%",
        height: 200,
    },

    title: {
        fontWeight: "bold",
        fontSize: 24,
        textAlign: "center",
        margin: 8,
    },
});

export default MealItem;
