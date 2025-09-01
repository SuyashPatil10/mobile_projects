import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text } from "react-native";
import { Colors } from "../../utils/colors";

function OutlinedButton({ icon, children, onPress }) {
    return (
        <Pressable style={({pressed}) => [styles.button, pressed && styles.pressed]} onPress={onPress}>
            <Ionicons style={styles.icon} name={icon} size={18} color={Colors.primary500} />
            <Text style={styles.text}>{ children }</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        borderWidth: 1,
        borderColor: Colors.primary500,
        borderRadius: 4,
        paddingVertical: 6,
        paddingHorizontal: 12,
        margin: 4,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },

    pressed: {
        opacity: 0.7,
    },

    icon: {
        marginRight: 6,
    },

    text: {
        color: Colors.primary500,
    },


});

export default OutlinedButton;
