import { StyleSheet, Text, View } from "react-native";

function MealDetails({ duration, complexity, affordability, style, textStyle }) {
    return (
        <View style={[styles.details, style]}>
            <Text style={[styles.detailsItem, textStyle]}>{ duration }m</Text>
            <Text style={[styles.detailsItem, textStyle]}>{ complexity.toUpperCase() }</Text>
            <Text style={[styles.detailsItem, textStyle]}>{ affordability.toUpperCase() }</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    details: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        padding: 8,
    },

    detailsItem : {
        marginHorizontal: 4,
        fontSize: 12,
    },
});

export default MealDetails;
