import { View, Pressable, Text, StyleSheet } from "react-native";

function Button({ children, onPress, title, style }) {
    return (
        <View style={styles.buttonContainer}>
            <Pressable onPress={ onPress } android_ripple={{ color: "#ccc" }} style={[styles.buttonInnerContainer, style]}>
                <Text style={styles.buttonText}>{ children }</Text>
                <Text style={styles.buttonText}>{ title }</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        borderRadius: 4,
    },

    buttonText: {
        color: "white",
        fontWeight: "semibold",
        fontSize: 14,
    },

    buttonInnerContainer: {
        alignItems: "center",
    },

});

export default Button;
