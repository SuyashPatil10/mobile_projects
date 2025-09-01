import { View, Pressable, Text, StyleSheet } from "react-native";

function TextButton({ children, onPress, style}) {
    return (
        <View style={styles.buttonContainer}>
            <Pressable onPress={ onPress } android_ripple={{ color: "#ccc" }} style={[styles.buttonInnerContainer,]}>
                <Text>{ children }</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        position: "absolute",
        // borderWidth: 1,
        // borderColor: "#121212",
        borderRadius: 6,
        // backgroundColor: "#121212",
        alignSelf: "flex-end",
        paddingHorizontal: 12,
        paddingVertical: 8,
        margin: 8,
    },

    buttonText: {
        color: "#121212",
        // color: "#EEEFFF",
        fontWeight: "bold",
        fontSize: 14,
    },

    buttonInnerContainer: {
        alignItems: "center",
        backgroundColor: "transparent"
    },



});

export default TextButton;
