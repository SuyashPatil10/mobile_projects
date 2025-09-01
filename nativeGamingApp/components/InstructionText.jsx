import { StyleSheet, Text } from "react-native"
import colors from "../utils/Colors";

function InstructionText({ children, style }) {
    return (
        <Text style={ [styles.instructionText, style] }>
            { children }
        </Text>
    )
}

const styles = StyleSheet.create({
    instructionText : {
        fontSize: 24,
        fontFamily: "open-sans",
        color: colors.accent500,
    },
});

export default InstructionText
