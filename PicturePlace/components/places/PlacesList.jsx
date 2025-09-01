import { FlatList, StyleSheet, Text, View } from "react-native";
import PlaceItem from "./PlaceItem";
import { Colors } from "../../utils/colors";
import OutlinedButton from "../UI/OutlinedButton";
import { useNavigation } from "@react-navigation/native";

function PlacesList({ places }) {
    const navigation = useNavigation();

    function onNavigateAddPlace() {
        navigation.navigate("AddPlace");
    }

    if(!places || places.length === 0) {
        return (
            <View style={styles.fallbackContainer}>
                <Text style={styles.fallbackMessage}>No places added yet - start adding some!</Text>
                <OutlinedButton icon={"image"} onPress={onNavigateAddPlace}>add places!</OutlinedButton>
            </View>
        )
    }

    return (
        <FlatList
        data={places}
        keyExtractor={(item) => item.id}
        renderItem={(itemData) => <PlaceItem place={itemData.item} />} 
        />
    )
}

const styles = StyleSheet.create({
    fallbackContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    fallbackMessage: {
        color: Colors.primary200,
    },
});

export default PlacesList;
