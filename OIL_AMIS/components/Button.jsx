import { Pressable, StyleSheet, Text, View } from "react-native";

function Button({ children, onPress, containerStyle, innerContainerStyle, textStyle }) {
    return (
        <View style={[styles.container, containerStyle]}>
            <Pressable onPress={onPress} 
            android_ripple={{ color: "#c7d2fe" }}
            style={({ pressed }) => {return [styles.innerContainer, pressed ? styles.pressed : undefined, innerContainerStyle]}}>
                <View>
                    <Text style={[styles.buttonText, textStyle]}>{ children }</Text>
                </View>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
          
    },

    innerContainer: {
        // borderWidth: 1,
        // borderColor: "#ca8a04",
        borderRadius: 8,
        paddingVertical: 12,
        marginVertical: 8,
        // backgroundColor: "#eab308",
        backgroundColor: "#4f46e5",
        overflow: "hidden",
    },

    buttonText: {
        color: "#FFF",
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
    },

    pressed: {
        // backgroundColor: "#facc15"
        backgroundColor: "#818cf8",
    },
});

export default Button;
