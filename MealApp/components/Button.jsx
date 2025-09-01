import { Pressable, StyleSheet, Text, View } from "react-native"

function Button({ children, onPress }) {
    return (
        <View style={styles.buttonContainer}>
            <Pressable onPress={onPress} android_ripple={{ color: "#ccc" }}>
                <Text style={styles.buttonText}>{ children }</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    buttonContainer : {
        backgroundColor: "#f1a457",
        // backgroundColor: "#121212",
        // borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 8,
    },

    buttonText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 20,
        textAlign: "center",
    },
});

export default Button
