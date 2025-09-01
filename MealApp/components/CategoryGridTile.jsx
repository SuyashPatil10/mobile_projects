import { Platform, Pressable, StyleSheet, Text, View } from "react-native";

function CategoryGridTile({ title, color, onPress }) {
    return (
        <View style={[styles.gridItem, { backgroundColor: color }]}>
            <Pressable android_ripple={{ color: "#EEE" }} 
            style={({ pressed }) => [styles.button, pressed ? styles.buttonPressed : null]}
            onPress={onPress}>
                <View style={styles.innerContainer}>
                    <Text style={styles.title}>{title}</Text>
                </View>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    gridItem : {
        flex: 1,
        margin: 16,
        height: 150,
        borderRadius: 8,
        elevation: 4,
        backgroundColor: "white",
        shadowColor: "black",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
        overflow: Platform.OS === "android" ? "hidden" : "visible",
    },

    button : {
        flex: 1,
    },

    buttonPressed : {
        opacity: 0.75,
    },

    innerContainer: {
        flex: 1,
        padding: 16,
        borderRadius: 8,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },

    title: {
        fontWeight: "bold",
        fontSize: 18,
    },
});

export default CategoryGridTile;
