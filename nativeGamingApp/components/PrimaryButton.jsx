import { Pressable, StyleSheet, Text, View } from "react-native";
import colors from "../utils/Colors";

function PrimaryButton({ children, onPress }) {
    
    return (
        <View style={styles.buttonOuterContainer}>
            <Pressable style={({ pressed }) => pressed ? [styles.buttonInnerContainer, styles.pressed] : styles.buttonInnerContainer} 
            onPress={onPress} 
            android_ripple={{ color: colors.primary600 }}>
                <Text style={styles.buttonText}>{ children }</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    buttonOuterContainer : {
        borderRadius: 9999,
        margin: 4,
        overflow: "hidden",
    },

    buttonInnerContainer : {
        backgroundColor: colors.primary500,
        paddingHorizontal: 16,
        paddingVertical: 8,
        elevation: 2,
    },

    buttonText :{
        color: "white",
        textAlign: "center",
    },

    pressed: {
        opacity: 0.75,
    },
});

export default PrimaryButton;
