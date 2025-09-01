import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet } from "react-native";

function IconButton({ icon, color, onPress }) {
    return (
        <Pressable onPress={onPress} style={({ pressed }) => pressed ? styles.pressed : null }>
            <Ionicons name={icon} size={24} color={color} />
        </Pressable>
    )
}

const styles = StyleSheet.create({
    pressed : {
        opacity: 0.7,
    },
});

export default IconButton;
