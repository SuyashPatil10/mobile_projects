import { Platform, StyleSheet, Text, View } from "react-native";

function Title({ children }) {
    return (
        <View style={styles.titleContainer}>
            <Text style={styles.title}>
                { children }
            </Text>
            
        </View>
    )
}

const styles = StyleSheet.create({
    titleContainer: {
        // borderWidth: Platform.OS === "android" ? 2 : 0,
        // borderWidth: Platform.select({ "ios" : 0, "android" : 2 }),
        padding: 12,
        borderRadius: 24,
        maxWidth: "80%",
        width: 300,
    },
    title : {
        fontFamily: "open-sans-bold",
        fontSize: 18,
        color: "white",
        textAlign: "center",
    },
});

export default Title;
