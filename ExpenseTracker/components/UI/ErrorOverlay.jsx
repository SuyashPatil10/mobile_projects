import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../utils/styles";
import Button from "./Button";

function ErrorOverlay({ message }) {
    return (
        <View style={styles.container}>
            <Text style={[styles.text, styles.title]}>An Error occured!</Text>
            <Text style={styles.text}>{message}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 24,
        backgroundColor: GlobalStyles.Colors.primary700,
    },

    text: {
        color: "white",
        textAlign: "center",
        marginBottom: 8,
    },

    title: {
        fontSize: 20,
        fontWeight: "bold",
    },

    message: {

    },
});

export default ErrorOverlay;
